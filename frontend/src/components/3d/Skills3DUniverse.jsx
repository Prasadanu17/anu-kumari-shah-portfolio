import React, { useRef, useEffect, useState, useMemo } from 'react';
import { SKILLS_UNIVERSE, SKILL_CATEGORIES } from '../../data/skillsUniverseData';
import { usePortfolio } from '../../context/PortfolioContext';
import { X, Sparkles, ExternalLink } from 'lucide-react';

/* ==========================================================================
   INTERACTIVE 3D SKILL UNIVERSE — CREATIVE, DYNAMIC & RESPONSIVE CHOREOGRAPHY
   1. Respective Category Coordinates:
      - AI/ML logos float above Category 01 on the left.
      - Full-Stack logos float right above Category 02 in the center.
      - Databases & Tools logos float above Category 03 on the right.
   2. Intelligent Category Spotlight:
      - Hovering on any Category card highlights its 3D constellation with
        expanded orbital radius, enhanced glow, and gentle forward tilt.
   3. Interactive Holographic Inspection:
      - Clicking any 3D logo opens a sleek holographic glass modal with skill
        details, category info, and deep-link actions.
   4. Slow, Cinematic Zero-Gravity Physics:
      - Silky-smooth lerping (factor 0.038) allows logos to drift peacefully
        into place with continuous subtle orbital levitation.
   ========================================================================== */

export default function Skills3DUniverse({ currentChapterId = 'home', direction = 1, isMobile = false }) {
  const containerRef = useRef(null);
  const tokenRefs = useRef({});
  const physicsState = useRef([]);
  const groupPos = useRef({ x: 0, y: 0 });
  const mouseRef = useRef({
    x: 0,
    y: 0,
    targetX: 0,
    targetY: 0,
    clientX: typeof window !== 'undefined' ? window.innerWidth * 0.5 : 600,
    clientY: typeof window !== 'undefined' ? window.innerHeight * 0.5 : 400,
    hasMoved: false,
    vx: 0,
    vy: 0,
  });
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [hoveredSkillId, setHoveredSkillId] = useState(null);

  const isSkillsSection = currentChapterId === 'skills';

  // Consume portfolio context for cross-component interactivity
  const { hoveredCategory, selectedSkill, setSelectedSkill, setActiveSection } = usePortfolio();

  // Transition tracking for slow, graceful section travel
  const prevChapterRef = useRef(currentChapterId);
  const transitionRef = useRef({ active: false, startTime: 0, direction: 1 });

  // Filter skills for mobile vs desktop for optimal 60fps performance
  const activeSkills = useMemo(() => {
    if (isMobile) {
      return SKILLS_UNIVERSE.filter((skill, idx) => {
        if (skill.category === SKILL_CATEGORIES.AIML) return idx % 2 === 0;
        if (skill.category === SKILL_CATEGORIES.FULLSTACK) return idx % 2 === 0;
        return true;
      });
    }
    return SKILLS_UNIVERSE;
  }, [isMobile]);

  // Group active skills by category and map intra-category metadata
  const categorizedSkills = useMemo(() => {
    const catMap = {
      [SKILL_CATEGORIES.AIML]: [],
      [SKILL_CATEGORIES.FULLSTACK]: [],
      [SKILL_CATEGORIES.DBTOOLS]: [],
    };

    activeSkills.forEach((skill) => {
      const cat = skill.category || SKILL_CATEGORIES.AIML;
      if (!catMap[cat]) catMap[cat] = [];
      catMap[cat].push(skill);
    });

    const meta = {};
    Object.entries(catMap).forEach(([catKey, skills]) => {
      let catIndex = 1;
      if (catKey === SKILL_CATEGORIES.AIML) catIndex = 0;
      else if (catKey === SKILL_CATEGORIES.FULLSTACK) catIndex = 1;
      else if (catKey === SKILL_CATEGORIES.DBTOOLS) catIndex = 2;

      skills.forEach((skill, itemIndex) => {
        meta[skill.id] = {
          catIndex,
          catName: catKey,
          itemIndexInCat: itemIndex,
          totalInCat: skills.length,
        };
      });
    });

    return meta;
  }, [activeSkills]);

  // Reduced motion preference listener
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mq.matches);
    const handler = (e) => setPrefersReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Detect section chapter changes and trigger slow transition flight
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

  // Global mouse / touch movement listener with velocity tracking
  useEffect(() => {
    let lastX = typeof window !== 'undefined' ? window.innerWidth * 0.5 : 600;
    let lastY = typeof window !== 'undefined' ? window.innerHeight * 0.5 : 400;
    let lastTime = performance.now();

    const handlePointerMove = (e) => {
      const clientX = e.clientX ?? (e.touches && e.touches[0]?.clientX);
      const clientY = e.clientY ?? (e.touches && e.touches[0]?.clientY);
      if (clientX === undefined || clientY === undefined) return;

      const now = performance.now();
      const dt = Math.max(1, now - lastTime);
      const instantVx = (clientX - lastX) / dt;
      const instantVy = (clientY - lastY) / dt;
      mouseRef.current.vx = mouseRef.current.vx * 0.65 + instantVx * 0.35;
      mouseRef.current.vy = mouseRef.current.vy * 0.65 + instantVy * 0.35;
      lastX = clientX;
      lastY = clientY;
      lastTime = now;

      mouseRef.current.clientX = clientX;
      mouseRef.current.clientY = clientY;
      mouseRef.current.hasMoved = true;

      const w = window.innerWidth || 1;
      const h = window.innerHeight || 1;
      mouseRef.current.targetX = (clientX / w - 0.5) * 2;
      mouseRef.current.targetY = (clientY / h - 0.5) * 2;
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    window.addEventListener('touchmove', handlePointerMove, { passive: true });

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('touchmove', handlePointerMove);
    };
  }, []);

  // 60fps Physics & Spatial Animation Loop
  useEffect(() => {
    if (prefersReducedMotion) return;

    let animId;
    let startTime = performance.now();

    // Helper to calculate target destination for a skill based on section
    const computeSkillTarget = (skill, skillIndex, totalSkills, w, h, time) => {
      const meta = categorizedSkills[skill.id] || { catIndex: 1, catName: '', itemIndexInCat: 0, totalInCat: 1 };
      const isThisCategoryHovered = hoveredCategory && hoveredCategory === meta.catName;
      const isOtherCategoryHovered = hoveredCategory && hoveredCategory !== meta.catName;
      const isThisSkillSelected = selectedSkill && (selectedSkill.id === skill.id || selectedSkill === skill.name || selectedSkill.name === skill.name);

      // ── Chapter 04: SKILLS — Respective Category Badges in the Cards ──
      if (currentChapterId === 'skills') {
        const { catIndex, itemIndexInCat, totalInCat } = meta;

        // Query the exact DOM badge element for this skill inside the category cards
        let targetEl = document.querySelector(`[data-skill-name="${skill.name}"]`);
        if (!targetEl && skill.aliases) {
          for (const alias of skill.aliases) {
            targetEl = document.querySelector(`[data-skill-name="${alias}"]`);
            if (targetEl) break;
          }
        }
        if (!targetEl) {
          targetEl = document.querySelector(`[data-skill-name="${skill.id}"]`);
        }

        // If the badge is found in the DOM, glide directly onto its respective badge slot!
        if (targetEl) {
          const rect = targetEl.getBoundingClientRect();
          const targetX = rect.left + (isMobile ? 14 : 18);
          const targetY = rect.top + rect.height / 2;
          const targetZ = isThisSkillSelected ? 45 : (isThisCategoryHovered ? 18 : 8);
          const targetScale = isThisSkillSelected ? 1.05 : (isThisCategoryHovered ? 0.76 : (isMobile ? 0.58 : 0.66));
          const targetOpacity = isOtherCategoryHovered ? 0.40 : 1.0;

          return {
            x: targetX,
            y: targetY,
            z: targetZ,
            scale: targetScale,
            opacity: targetOpacity,
            isDocked: true,
          };
        }

        if (isMobile) {
          // Mobile fallback: graceful canopy arch across the top
          const colCenterX = w * 0.5;
          const colCenterY = h * 0.12;
          const angle = (skillIndex / Math.max(1, totalSkills)) * Math.PI * 2;
          return {
            x: colCenterX + Math.cos(angle) * 38,
            y: colCenterY + Math.sin(angle) * 20,
            z: Math.sin(skillIndex * 1.5) * 20,
            scale: 0.82,
            opacity: 0.88,
          };
        }

        // Desktop fallback: Align precisely with 3-column category grid
        const maxContainer = 1280;
        const padding = w >= 1024 ? 48 : (w >= 640 ? 24 : 16);
        const containerW = Math.min(w, maxContainer) - padding * 2;
        const leftOffset = (w - Math.min(w, maxContainer)) / 2 + padding;
        const colW = containerW / 3;
        const colCenterX = leftOffset + colW * (catIndex + 0.5);

        const baseCenterY = catIndex === 1 ? h * 0.345 : h * 0.22;
        const colCenterY = isThisCategoryHovered ? baseCenterY + 12 : baseCenterY;

        const orbitSpeed = 0.12;
        const angle = (itemIndexInCat / Math.max(1, totalInCat)) * Math.PI * 2 + (catIndex * 0.8) + (time * orbitSpeed);
        const radiusX = isThisCategoryHovered ? 74 : (catIndex === 1 ? 62 : 60);
        const radiusY = isThisCategoryHovered ? 26 : (catIndex === 1 ? 16 : 24);
        const offX = Math.cos(angle) * radiusX;
        const offY = Math.sin(angle) * radiusY;
        const offZ = Math.sin(itemIndexInCat * 1.8 + time * 0.3) * (isThisCategoryHovered ? 40 : 26);

        let scale = 0.88;
        let opacity = 0.95;

        if (isThisSkillSelected) {
          scale = 1.25;
          opacity = 1.0;
        } else if (isThisCategoryHovered) {
          scale = 1.05;
          opacity = 1.0;
        } else if (isOtherCategoryHovered) {
          scale = 0.75;
          opacity = 0.35;
        }

        return {
          x: colCenterX + offX,
          y: colCenterY + offY,
          z: isThisSkillSelected ? offZ + 60 : offZ,
          scale,
          opacity,
          isDocked: false,
        };
      }

      // ── Every Other Section (Home, About, Journey, Projects, Experience, Certifications, Contact, etc.) ──
      // Dynamic 3D constellation that follows directly wherever the cursor goes!
      const total = totalSkills;
      const goldenAngle = 2.39996;
      // Fluid, compact satellite constellation around the cursor pointer
      const clusterRadius = isMobile ? 65 : 98;
      const norm = skillIndex / Math.max(1, total - 1);
      const innerClearance = isMobile ? 24 : 34; // Keeps immediate cursor arrow clear
      const r = innerClearance + Math.sqrt(norm) * (clusterRadius - innerClearance);
      const orbitSpeed = 0.42;
      const theta = skillIndex * goldenAngle + (time * orbitSpeed);

      // Orbital position relative to cursor center
      const relX = Math.cos(theta) * r * 1.15;
      const relY = Math.sin(theta) * r * 0.88;
      const relZ = Math.sin(skillIndex * 1.7 + time * 0.7) * (isMobile ? 22 : 38);

      // Directional kinetic lag / comet trail behind cursor motion vector
      const lagRatio = (skillIndex / Math.max(1, total - 1));
      const vx = mouseRef.current.vx || 0;
      const vy = mouseRef.current.vy || 0;
      const vxClamped = Math.max(-55, Math.min(55, vx * 18));
      const vyClamped = Math.max(-55, Math.min(55, vy * 18));
      const trailX = -vxClamped * lagRatio;
      const trailY = -vyClamped * lagRatio;

      // Dynamic 3D banking and tilt towards cursor movement direction
      const tiltX = -Math.max(-35, Math.min(35, vy * 24)) - (relY / clusterRadius) * 16;
      const tiltY = Math.max(-35, Math.min(35, vx * 24)) + (relX / clusterRadius) * 16;
      const tiltZ = Math.max(-28, Math.min(28, vx * 14));

      return {
        x: groupPos.current.x + relX + trailX,
        y: groupPos.current.y + relY + trailY,
        z: relZ,
        scale: isMobile ? 0.76 : 0.90,
        opacity: 0.94,
        isDocked: false,
        tiltX,
        tiltY,
        tiltZ,
      };
    };

    // Initialize state if empty or changed
    if (!physicsState.current || physicsState.current.length !== activeSkills.length) {
      const w = window.innerWidth || 1200;
      const h = window.innerHeight || 800;
      const total = activeSkills.length;

      // Initialize group position centered
      groupPos.current = { x: w * 0.5, y: h * 0.5 };

      physicsState.current = activeSkills.map((skill, index) => {
        // Start near center on first mount to let them smoothly glide out
        const initX = w * 0.5 + (Math.random() - 0.5) * 60;
        const initY = h * 0.35 + (Math.random() - 0.5) * 60;

        return {
          id: skill.id,
          currentX: initX,
          currentY: initY,
          currentZ: 0,
          currentRotX: 0,
          currentRotY: 0,
          currentRotZ: 0,
          currentScale: 0.6,
          currentOpacity: 0,
          floatSpeed: 0.45 + (index % 4) * 0.15,
          floatAmp: 4 + (index % 3) * 2.5,
          phase: (index * 0.7) % (Math.PI * 2),
        };
      });
    }

    const updatePhysics = (timestamp) => {
      const time = (timestamp - startTime) * 0.001; // seconds
      const w = window.innerWidth || 1200;
      const h = window.innerHeight || 800;
      const totalSkills = activeSkills.length;
      const isHero = currentChapterId === 'home';

      // Fast, responsive mouse tracking
      const mouse = mouseRef.current;
      mouse.x += (mouse.targetX - mouse.x) * 0.18;
      mouse.y += (mouse.targetY - mouse.y) * 0.18;

      // Subtle breathing pulse on section transition
      let transitionPulseY = 0;
      if (transitionRef.current.active) {
        const elapsed = timestamp - transitionRef.current.startTime;
        const dur = 1400; // ms: slow, gentle chapter transition flight
        if (elapsed < dur) {
          const progress = elapsed / dur;
          transitionPulseY = Math.sin(progress * Math.PI) * transitionRef.current.direction * 30;
        } else {
          transitionRef.current.active = false;
        }
      }

      // ── Cursor-Following Group Positioning in Every Section Apart From Skills ──
      let targetGroupX = w * 0.5;
      let targetGroupY = h * 0.5;

      if (!isSkillsSection) {
        // WHEREVER CURSOR GOES, LOGOS GO THERE DIRECTLY
        const curCursorX = mouse.hasMoved ? mouse.clientX : w * 0.5;
        const curCursorY = mouse.hasMoved ? mouse.clientY : (isHero ? h * 0.46 : h * 0.5);

        targetGroupX = curCursorX;
        targetGroupY = curCursorY;

        // Group spring follow with fluid, immediate responsiveness
        const groupSpring = 0.22;
        groupPos.current.x += (targetGroupX - groupPos.current.x) * groupSpring;
        groupPos.current.y += (targetGroupY - groupPos.current.y) * groupSpring;
      }

      // Update each skill logo position
      physicsState.current.forEach((item, index) => {
        const skill = activeSkills[index];
        if (!skill) return;
        const node = tokenRefs.current[skill.id];
        if (!node) return;

        // Destination for this skill in the current section
        const target = computeSkillTarget(skill, index, totalSkills, w, h, time);

        // Gentle levitation (subtler when docked to badge slot)
        const ampMult = target.isDocked ? 0.25 : 1.0;
        const floatX = Math.cos(time * item.floatSpeed + item.phase) * (item.floatAmp * 0.4 * ampMult);
        const floatY = (Math.sin(time * item.floatSpeed + item.phase) * item.floatAmp + transitionPulseY) * ampMult;

        const destX = target.x + floatX;
        const destY = target.y + floatY;
        const destZ = target.z;

        // ── Interpolation: slow in skills section, swift following cursor in other sections ──
        const lerpFactor = isSkillsSection ? 0.038 : (0.13 + ((index * 7) % 9) * 0.012);
        item.currentX += (destX - item.currentX) * lerpFactor;
        item.currentY += (destY - item.currentY) * lerpFactor;
        item.currentZ += (destZ - item.currentZ) * lerpFactor;

        const scaleLerp = isSkillsSection ? 0.04 : 0.12;
        item.currentScale += (target.scale - item.currentScale) * scaleLerp;
        item.currentOpacity += (target.opacity - item.currentOpacity) * scaleLerp;

        // Dynamic 3D banking tilt into cursor movement direction
        const tiltX = target.tiltX ?? 0;
        const tiltY = target.tiltY ?? 0;
        const tiltZ = target.tiltZ ?? (!isSkillsSection ? (targetGroupX - groupPos.current.x) * 0.08 : ((destX - item.currentX) * 0.02));

        item.currentRotX += (tiltX - item.currentRotX) * 0.12;
        item.currentRotY += (tiltY - item.currentRotY) * 0.12;
        item.currentRotZ += (tiltZ - item.currentRotZ) * 0.12;

        // GPU accelerated 3D transform
        node.style.transform = `translate3d(${item.currentX.toFixed(1)}px, ${item.currentY.toFixed(1)}px, ${item.currentZ.toFixed(1)}px) rotateX(${item.currentRotX.toFixed(1)}deg) rotateY(${item.currentRotY.toFixed(1)}deg) rotateZ(${item.currentRotZ.toFixed(1)}deg) scale(${item.currentScale.toFixed(2)})`;
        node.style.opacity = item.currentOpacity.toFixed(2);
      });

      animId = requestAnimationFrame(updatePhysics);
    };

    animId = requestAnimationFrame(updatePhysics);
    return () => cancelAnimationFrame(animId);
  }, [currentChapterId, activeSkills, categorizedSkills, hoveredCategory, selectedSkill, prefersReducedMotion, isMobile]);

  // Find active inspected skill data
  const inspectedSkillData = useMemo(() => {
    if (!selectedSkill) return null;
    return SKILLS_UNIVERSE.find(
      (s) => s.id === selectedSkill.id || s.name === selectedSkill || s.name === selectedSkill?.name
    ) || null;
  }, [selectedSkill]);

  return (
    <>
      <div
        ref={containerRef}
        className="fixed inset-0 pointer-events-none z-10 overflow-hidden opacity-100 transition-opacity duration-500"
        style={{ perspective: 1200, transformStyle: 'preserve-3d' }}
        aria-hidden="true"
      >
        {activeSkills.map((skill) => {
          const { Icon } = skill;
          const isSelected = selectedSkill && (selectedSkill.id === skill.id || selectedSkill === skill.name || selectedSkill.name === skill.name);
          const isHovered = hoveredSkillId === skill.id;

          return (
            <div
              key={skill.id}
              ref={(el) => {
                tokenRefs.current[skill.id] = el;
              }}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedSkill(isSelected ? null : skill);
              }}
              onMouseEnter={() => setHoveredSkillId(skill.id)}
              onMouseLeave={() => setHoveredSkillId(null)}
              className={`absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 will-change-transform select-none ${
                isSkillsSection
                  ? 'pointer-events-auto cursor-pointer group'
                  : 'pointer-events-none'
              }`}
              style={{
                transform: `translate3d(50vw, 50vh, 0px)`,
                opacity: 0,
              }}
            >
              {/* Pure 3D Glassmorphic Skill Medallion */}
              <div
                className={`relative w-9 h-9 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl backdrop-blur-md shadow-2xl transition-all duration-300 flex items-center justify-center cursor-pointer ${
                  isSelected
                    ? 'bg-[#252525] border-[#EAD9B8] scale-125'
                    : 'bg-[#171717]/90 border-[#8E8170]/40 group-hover:border-[#EAD9B8] group-hover:scale-125 group-hover:bg-[#222222]'
                }`}
                style={{
                  boxShadow: isSelected
                    ? `0 12px 32px rgba(0, 0, 0, 0.9), 0 0 24px ${skill.glowColor}`
                    : `0 8px 24px rgba(0, 0, 0, 0.75), 0 0 16px ${skill.glowColor}`,
                }}
              >
                {/* Inner soft glow ring */}
                <div
                  className={`absolute inset-0 rounded-xl sm:rounded-2xl transition-opacity duration-300 pointer-events-none ${
                    isSelected ? 'opacity-80' : 'opacity-20 group-hover:opacity-70'
                  }`}
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

                {/* Micro floating name badge on hover */}
                <div
                  className={`absolute -top-7 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded bg-[#171717]/95 border border-[#8E8170]/50 text-[9px] font-mono text-[#EAD9B8] whitespace-nowrap shadow-lg transition-all duration-200 pointer-events-none ${
                    isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
                  }`}
                >
                  {skill.name}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* =========================================================================
          INTERACTIVE HOLOGRAPHIC SKILL INSPECTOR MODAL
          ========================================================================= */}
      {inspectedSkillData && (
        <div
          onClick={() => setSelectedSkill(null)}
          className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/50 backdrop-blur-sm pointer-events-auto transition-opacity"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-sm rounded-2xl bg-[#1a1a1a]/95 border border-[#EAD9B8]/40 p-5 shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(234,217,184,0.15)] backdrop-blur-xl animate-in fade-in zoom-in-95 duration-200"
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedSkill(null)}
              className="absolute top-4 right-4 p-1.5 rounded-lg border border-[#8E8170]/30 hover:border-[#EAD9B8] hover:text-[#EAD9B8] text-[#C8B99F] transition-colors"
              aria-label="Close Inspector"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Header with Icon and Title */}
            <div className="flex items-center gap-3.5 mb-3">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center bg-[#242424] border border-[#8E8170]/40 shadow-inner"
                style={{ color: inspectedSkillData.brandColor, boxShadow: `0 0 16px ${inspectedSkillData.glowColor}` }}
              >
                <inspectedSkillData.Icon className="text-2xl" />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase text-[#C8B99F] tracking-wider font-semibold">
                  {inspectedSkillData.category}
                </span>
                <h4 className="text-lg font-display font-extrabold text-[#EAD9B8] tracking-tight">
                  {inspectedSkillData.name}
                </h4>
              </div>
            </div>

            {/* Skill Description */}
            <p className="text-xs text-[#F5EBDD] font-light leading-relaxed mb-4 bg-white/[0.02] p-3 rounded-lg border border-white/5">
              {inspectedSkillData.description}
            </p>

            {/* Quick Actions */}
            <div className="flex items-center justify-between pt-1">
              <span className="flex items-center gap-1.5 text-[10px] font-mono text-[#10b981]">
                <Sparkles className="w-3 h-3" /> Production Ready
              </span>
              <button
                onClick={() => {
                  setSelectedSkill(null);
                  setActiveSection('projects');
                  window.history.replaceState(null, '', '#projects');
                }}
                className="flex items-center gap-1.5 text-[10px] font-mono text-[#EAD9B8] hover:text-white px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 border border-[#8E8170]/40 transition-colors"
              >
                View in Projects <ExternalLink className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
