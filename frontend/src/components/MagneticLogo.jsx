import React, { useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useGlobalMouse } from '../context/MouseContext';

const MagneticLogo = ({
  icon,
  color = '#F4F5F4',
  label = '',
  radius = 300,
  strength = 0.06,
  maxDrift = 18,
  liftZ = 40,
  className = '',
  showLabel = false,
  children,
}) => {
  const ref = useRef(null);
  const { mouseX, mouseY } = useGlobalMouse();

  const targetX = useMotionValue(0);
  const targetY = useMotionValue(0);
  const targetZ = useMotionValue(0);
  const targetScale = useMotionValue(1);

  const x = useSpring(targetX, { stiffness: 120, damping: 18, mass: 0.5 });
  const y = useSpring(targetY, { stiffness: 120, damping: 18, mass: 0.5 });
  const z = useSpring(targetZ, { stiffness: 120, damping: 18, mass: 0.5 });
  const scale = useSpring(targetScale, { stiffness: 120, damping: 18, mass: 0.5 });

  useEffect(() => {
    const update = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;

      const mx = mouseX.get();
      const my = mouseY.get();

      if (mx < -1000 || my < -1000) {
        targetX.set(0);
        targetY.set(0);
        targetZ.set(0);
        targetScale.set(1);
        return;
      }

      const dx = mx - cx;
      const dy = my - cy;
      const dist = Math.hypot(dx, dy);

      const t = Math.max(0, 1 - dist / radius);
      const falloff = t * t * (3 - 2 * t);

      const clamp = (val, min, max) => Math.min(Math.max(val, min), max);
      const pullX = clamp(dx * strength * falloff, -maxDrift, maxDrift);
      const pullY = clamp(dy * strength * falloff, -maxDrift, maxDrift);

      targetX.set(pullX);
      targetY.set(pullY);
      targetZ.set(falloff * liftZ);
      targetScale.set(1 + falloff * 0.15);
    };

    const unsubX = mouseX.on('change', update);
    const unsubY = mouseY.on('change', update);

    return () => {
      unsubX();
      unsubY();
    };
  }, [mouseX, mouseY, radius, strength, maxDrift, liftZ, targetX, targetY, targetZ, targetScale]);

  return (
    <motion.div
      ref={ref}
      title={label}
      whileHover={{ scale: 1.25 }}
      transition={{ type: 'spring', stiffness: 400, damping: 15 }}
      style={{
        x,
        y,
        translateZ: z,
        scale,
        transformStyle: 'preserve-3d',
        willChange: 'transform',
        color,
      }}
      className={`relative flex items-center justify-center p-2 sm:p-2.5 rounded-lg bg-white/[0.05] border border-white/10 cursor-pointer will-change-transform group ${className}`}
    >
      <div
        className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          boxShadow: `0 0 20px 3px ${color}80, inset 0 0 12px ${color}40`,
        }}
      />
      {icon && (
        <span className="relative z-10 flex items-center justify-center text-sm sm:text-xl" style={{ color }}>
          {icon}
        </span>
      )}
      {showLabel && label && (
        <span className="relative z-10 text-[10px] sm:text-xs font-mono font-medium ml-1.5 whitespace-nowrap text-[#F4F5F4]">
          {label}
        </span>
      )}
      {children}
    </motion.div>
  );
};

export default MagneticLogo;
