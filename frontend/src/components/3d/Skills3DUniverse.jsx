import React, { useRef, useEffect, useState, useMemo } from 'react';
import { SKILLS_UNIVERSE } from '../../data/skillsUniverseData';

/* ==========================================================================
   INTERACTIVE 3D SKILL UNIVERSE — DYNAMIC TRANSITION & SECTION POSITIONING
   1. Section Transitions: When advancing to the next section, logos FIRST disperse
      and stream forward dynamically in 3D, and THEN converge & come together
      into their tight, cohesive cluster at the new section's position.
   2. Modern Professional Positioning:
      - In Home: Central 3D wireframe corridor.
      - In About, Journey, Skills, Projects, Contact: Positioned ABOVE the section
        content in the open upper canopy, so cards and text remain 100% visible.
   3. Fast, snappy cursor follow in the direction of the mouse.
   4. Pure brand logos only (no text labels or pills).
   ========================================================================== */

export default function Skills3DUniverse({ currentChapterId = 'home', direction = 1, isMobile = false }) {
  const containerRef = useRef(null);
  const tokenRefs = useRef({});
  const physicsState = useRef([]);
  const groupPos = useRef({ x: 0, y: 0 });
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0, clientX: 0, clientY: 0, vx: 0, vy: 0 });
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Transition tracking: "first it should (disperse in 3D), then come together"
  const prevChapterRef = useRef(currentChapterId);
  const transitionRef = useRef({ active: false, startTime: 0, direction: 1 });

  // Filter skills for mobile vs desktop for optimal 60fps performance
  const activeSkills = useMemo(() => {
    if (isMobile) {
      return SKILLS_UNIVERSE.filter((_, idx) => idx % 2 === 0);
    }
    return SKILLS_UNIVERSE;
  }, [isMobile]);

  // Reduced motion preference listener
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mq.matches);
    const handler = (e) => setPrefersReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Detect section chapter changes and trigger transition burst
  useEffect(() => {
    if (prevChapterRef.current !== currentChapterId) {
      transitionRef.current = {
        active: true,
        startTime: performance.now(),
        direction: direction || 1,
      };
      prevChapterRef.current = currentChapterId;
    }
  }, [currentChapterId, direction]);

  // Initialize group layout and relative offsets for each logo in the group
  useEffect(() => {
    const w = window.innerWidth || 1200;
    const h = window.innerHeight || 800;

    const baseX = isMobile ? w * 0.5 : w * 0.52;
    const baseY = currentChapterId === 'home' ? h * 0.46 : h * 0.15;
    groupPos.current = { x: baseX, y: baseY };

    const total = activeSkills.length;
    const goldenAngle = 2.39996; // ~137.5 degrees
    const clusterRadius = isMobile ? 95 : 140; // Compact group radius in px

    physicsState.current = activeSkills.map((skill, index) => {
      // Golden spiral distribution creates a natural, compact 3D orb/cluster
      const norm = index / Math.max(1, total - 1);
      const r = index === 0 ? 0 : (isMobile ? 26 : 34) + Math.sqrt(norm) * (clusterRadius - (isMobile ? 26 : 34));
      const theta = index * goldenAngle;

      const relX = Math.cos(theta) * r * 1.15;
      const relY = Math.sin(theta) * r * 0.9;
      const relZ = Math.sin(index * 1.7) * (isMobile ? 25 : 40);

      const initX = baseX + relX;
      const initY = baseY + relY;

      return {
        id: skill.id,
        relX,
        relY,
        relZ,
        currentX: initX,
        currentY: initY,
        currentZ: relZ,
        currentRotX: 0,
        currentRotY: 0,
        currentRotZ: 0,
        currentScale: 1,
        currentOpacity: 0.95,
        targetScale: 1,
        targetOpacity: 0.95,
        floatSpeed: 0.7 + (index % 4) * 0.25,
        floatAmp: 4 + (index % 3) * 3,
        phase: (index * 0.6) % (Math.PI * 2),
      };
    });
  }, [activeSkills, isMobile]);

  // Global mouse / touch movement listener with velocity tracking
  useEffect(() => {
    let lastX = 0;
    let lastY = 0;
    let lastTime = performance.now();

    const handlePointerMove = (e) => {
      const clientX = e.clientX ?? (e.touches && e.touches[0]?.clientX) ?? 0;
      const clientY = e.clientY ?? (e.touches && e.touches[0]?.clientY) ?? 0;

      const now = performance.now();
      const dt = Math.max(1, now - lastTime);
      const vx = (clientX - lastX) / dt;
      const vy = (clientY - lastY) / dt;

      mouseRef.current.vx = vx;
      mouseRef.current.vy = vy;

      lastX = clientX;
      lastY = clientY;
      lastTime = now;

      mouseRef.current.clientX = clientX;
      mouseRef.current.clientY = clientY;

      // Normalized coordinates (-1 to 1) from viewport center
      const w = window.innerWidth || 1;
      const h = window.innerHeight || 1;
      mouseRef.current.targetX = (clientX / w - 0.5) * 2;
      mouseRef.current.targetY = (clientY / h - 0.5) * 2;
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('touchmove', handlePointerMove, { passive: true });

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('touchmove', handlePointerMove);
    };
  }, []);

  // 60fps Physics & Spatial Animation Loop
  useEffect(() => {
    if (prefersReducedMotion) return;

    let animId;
    let startTime = performance.now();

    const updatePhysics = (timestamp) => {
      const time = (timestamp - startTime) * 0.001; // seconds
      const w = window.innerWidth || 1200;
      const h = window.innerHeight || 800;

      // Ensure state is populated
      if (!physicsState.current || physicsState.current.length === 0) {
        const baseX = isMobile ? w * 0.5 : w * 0.52;
        const baseY = currentChapterId === 'home' ? h * 0.46 : h * 0.15;
        groupPos.current = { x: baseX, y: baseY };

        const total = activeSkills.length;
        const goldenAngle = 2.39996;
        const clusterRadius = isMobile ? 95 : 140;

        physicsState.current = activeSkills.map((skill, index) => {
          const norm = index / Math.max(1, total - 1);
          const r = index === 0 ? 0 : (isMobile ? 26 : 34) + Math.sqrt(norm) * (clusterRadius - (isMobile ? 26 : 34));
          const theta = index * goldenAngle;
          const relX = Math.cos(theta) * r * 1.15;
          const relY = Math.sin(theta) * r * 0.9;
          const relZ = Math.sin(index * 1.7) * (isMobile ? 25 : 40);

          return {
            id: skill.id,
            relX,
            relY,
            relZ,
            currentX: baseX + relX,
            currentY: baseY + relY,
            currentZ: relZ,
            currentRotX: 0,
            currentRotY: 0,
            currentRotZ: 0,
            currentScale: 1,
            currentOpacity: 0.95,
            targetScale: 1,
            targetOpacity: 0.95,
            floatSpeed: 0.7 + (index % 4) * 0.25,
            floatAmp: 4 + (index % 3) * 3,
            phase: (index * 0.6) % (Math.PI * 2),
          };
        });
      }

      // Fast mouse lerping for responsive cursor tracking
      const mouse = mouseRef.current;
      mouse.x += (mouse.targetX - mouse.x) * 0.25;
      mouse.y += (mouse.targetY - mouse.y) * 0.25;

      // ── 1. Calculate Transition Burst Physics ("First Disperse, Then Come Together") ──
      let spreadFactor = 0;
      let travelBurstY = 0;
      if (transitionRef.current.active) {
        const elapsed = timestamp - transitionRef.current.startTime;
        const dur = 850; // ms
        if (elapsed < dur) {
          const progress = elapsed / dur; // 0 to 1
          // Bell-curve expansion: rapidly bursts outwards, then smoothly converges back to 0
          spreadFactor = Math.sin(progress * Math.PI) * Math.pow(1 - progress, 0.4);
          travelBurstY = Math.sin(progress * Math.PI) * transitionRef.current.direction * 110;
        } else {
          transitionRef.current.active = false;
        }
      }

      // ── 2. Calculate Base Position Per Section (Keep Group ABOVE Section Content) ──
      const isHero = currentChapterId === 'home';
      let baseX = w * 0.52;
      let baseY = h * 0.46;
      let travelRangeX = w * 0.18;
      let travelRangeY = h * 0.16;
      let targetOpacity = 0.95;
      let targetScale = 1.0;

      switch (currentChapterId) {
        case 'home':
          // Featured in central 3D wireframe corridor between heading and photo
          baseX = isMobile ? w * 0.5 : w * 0.52;
          baseY = h * 0.46;
          travelRangeX = isMobile ? w * 0.14 : w * 0.18;
          travelRangeY = isMobile ? h * 0.12 : h * 0.18;
          targetOpacity = isMobile ? 0.85 : 0.95;
          targetScale = 1.0;
          break;

        case 'about':
          // Kept ABOVE the section content (in open upper canopy above education cards)
          baseX = isMobile ? w * 0.5 : w * 0.50;
          baseY = isMobile ? h * 0.14 : h * 0.15;
          travelRangeX = isMobile ? w * 0.15 : w * 0.22;
          travelRangeY = h * 0.06; // Limited vertical range so it stays above cards
          targetOpacity = 0.88;
          targetScale = 0.84;
          break;

        case 'journey':
          // Kept ABOVE the journey roadmap
          baseX = isMobile ? w * 0.5 : w * 0.52;
          baseY = isMobile ? h * 0.14 : h * 0.15;
          travelRangeX = isMobile ? w * 0.15 : w * 0.22;
          travelRangeY = h * 0.06;
          targetOpacity = 0.85;
          targetScale = 0.84;
          break;

        case 'skills':
          // Crowning 3D constellation floating directly ABOVE the 3 category cards
          baseX = isMobile ? w * 0.5 : w * 0.50;
          baseY = isMobile ? h * 0.13 : h * 0.14;
          travelRangeX = isMobile ? w * 0.15 : w * 0.22;
          travelRangeY = h * 0.05;
          targetOpacity = 0.90;
          targetScale = 0.86;
          break;

        case 'projects':
          // Kept ABOVE the project cards
          baseX = isMobile ? w * 0.5 : w * 0.50;
          baseY = isMobile ? h * 0.14 : h * 0.15;
          travelRangeX = isMobile ? w * 0.15 : w * 0.20;
          travelRangeY = h * 0.05;
          targetOpacity = 0.80;
          targetScale = 0.80;
          break;

        case 'contact':
          // Floating in upper orbit above contact form
          baseX = isMobile ? w * 0.5 : w * 0.50;
          baseY = isMobile ? h * 0.14 : h * 0.15;
          travelRangeX = isMobile ? w * 0.15 : w * 0.20;
          travelRangeY = h * 0.05;
          targetOpacity = 0.80;
          targetScale = 0.80;
          break;

        default:
          // Subsequent sections: subtle ambient presence above content
          baseX = w * 0.50;
          baseY = h * 0.15;
          travelRangeX = w * 0.15;
          travelRangeY = h * 0.05;
          targetOpacity = 0.65;
          targetScale = 0.76;
          break;
      }

      // ── 3. Group Follows Cursor Direction Fast & Smoothly ──
      const rawTargetX = baseX + mouse.x * travelRangeX;
      // In Hero, clamp leftward reach so cluster never overlaps heading text
      const targetGroupX = isHero
        ? (isMobile ? rawTargetX : Math.max(w * 0.46, Math.min(w * 0.65, rawTargetX)))
        : rawTargetX;
      const targetGroupY = baseY + mouse.y * travelRangeY;

      // Fast group spring follow (0.18 for instant, snappy tracking)
      const groupSpring = 0.18;
      groupPos.current.x += (targetGroupX - groupPos.current.x) * groupSpring;
      groupPos.current.y += (targetGroupY - groupPos.current.y) * groupSpring;

      // ── 4. Update Each Individual Logo in the Group ──
      physicsState.current.forEach((item) => {
        const node = tokenRefs.current[item.id];
        if (!node) return;

        // Transition Dispersion: "First disperse outwards, then come together"
        const spreadMult = 1 + spreadFactor * 2.2;
        const dispersionX = Math.cos(item.phase) * 60 * spreadFactor;
        const dispersionY = Math.sin(item.phase) * 45 * spreadFactor + travelBurstY;
        const dispersionZ = Math.sin(item.phase * 2) * 75 * spreadFactor;

        const currentRelX = item.relX * spreadMult + dispersionX;
        const currentRelY = item.relY * spreadMult + dispersionY;
        const currentRelZ = item.relZ + dispersionZ;

        // Harmonic ambient levitation within the cluster
        const floatX = Math.cos(time * item.floatSpeed + item.phase) * (item.floatAmp * 0.5);
        const floatY = Math.sin(time * item.floatSpeed + item.phase) * item.floatAmp;

        // 3D Depth Parallax
        const depthFactor = (currentRelZ + 50) / 100;
        const parallaxX = mouse.x * 24 * depthFactor;
        const parallaxY = mouse.y * 20 * depthFactor;

        // Final destination for this logo
        const destX = groupPos.current.x + currentRelX + floatX + parallaxX;
        const destY = groupPos.current.y + currentRelY + floatY + parallaxY;
        const destZ = currentRelZ;

        // Fast spring follow to keep logos tightly grouped while moving (0.20)
        const spring = 0.20;
        item.currentX += (destX - item.currentX) * spring;
        item.currentY += (destY - item.currentY) * spring;
        item.currentZ += (destZ - item.currentZ) * spring;

        item.currentScale += (targetScale - item.currentScale) * 0.12;
        item.currentOpacity += (targetOpacity - item.currentOpacity) * 0.12;

        // 3D Tilt Orientation: fast responsive banking into the motion direction
        const tiltX = -mouse.y * 20 * depthFactor;
        const tiltY = mouse.x * 24 * depthFactor;
        const tiltZ = (targetGroupX - groupPos.current.x) * 0.10;

        item.currentRotX += (tiltX - item.currentRotX) * 0.14;
        item.currentRotY += (tiltY - item.currentRotY) * 0.14;
        item.currentRotZ += (tiltZ - item.currentRotZ) * 0.14;

        // Direct DOM transform injection for 60fps GPU acceleration
        node.style.transform = `translate3d(${item.currentX.toFixed(1)}px, ${item.currentY.toFixed(1)}px, ${item.currentZ.toFixed(1)}px) rotateX(${item.currentRotX.toFixed(1)}deg) rotateY(${item.currentRotY.toFixed(1)}deg) rotateZ(${item.currentRotZ.toFixed(1)}deg) scale(${item.currentScale.toFixed(2)})`;
        node.style.opacity = item.currentOpacity.toFixed(2);
      });

      animId = requestAnimationFrame(updatePhysics);
    };

    animId = requestAnimationFrame(updatePhysics);
    return () => cancelAnimationFrame(animId);
  }, [currentChapterId, activeSkills, prefersReducedMotion, isMobile]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-10 overflow-hidden opacity-100 transition-opacity duration-500"
      style={{ perspective: 1200, transformStyle: 'preserve-3d' }}
      aria-hidden="true"
    >
      {activeSkills.map((skill) => {
        const { Icon } = skill;
        return (
          <div
            key={skill.id}
            ref={(el) => {
              tokenRefs.current[skill.id] = el;
            }}
            className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 will-change-transform pointer-events-auto cursor-pointer group select-none"
            style={{
              transform: `translate3d(50vw, 50vh, 0px)`,
              opacity: 0.9,
            }}
          >
            {/* Pure 3D Glassmorphic Skill Medallion — ONLY LOGO, NO NAME */}
            <div
              className="relative w-9 h-9 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl bg-[#171717]/90 border border-[#8E8170]/40 backdrop-blur-md shadow-2xl transition-all duration-300 group-hover:border-[#EAD9B8] group-hover:scale-130 group-hover:bg-[#222222] flex items-center justify-center cursor-pointer"
              style={{
                boxShadow: `0 8px 24px rgba(0, 0, 0, 0.75), 0 0 16px ${skill.glowColor}`,
              }}
              title={skill.name}
            >
              {/* Inner soft glow ring */}
              <div
                className="absolute inset-0 rounded-xl sm:rounded-2xl opacity-20 group-hover:opacity-70 transition-opacity duration-300 pointer-events-none"
                style={{
                  boxShadow: `inset 0 0 10px ${skill.glowColor}`,
                }}
              />

              {/* Official Brand Logo Icon */}
              <span
                className="text-base sm:text-xl shrink-0 transition-transform duration-300 group-hover:scale-115 drop-shadow-md select-none"
                style={{ color: skill.brandColor }}
              >
                <Icon />
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
