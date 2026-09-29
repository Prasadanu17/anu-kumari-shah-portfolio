import React, { createContext, useContext, useEffect } from 'react';
import { useMotionValue, useSpring } from 'framer-motion';

const MouseContext = createContext(null);

export const MouseProvider = ({ children }) => {
  const rawX = useMotionValue(-9999);
  const rawY = useMotionValue(-9999);

  const mouseX = useSpring(rawX, { stiffness: 120, damping: 18, mass: 0.4 });
  const mouseY = useSpring(rawY, { stiffness: 120, damping: 18, mass: 0.4 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
    };

    const handleMouseLeave = () => {
      rawX.set(-9999);
      rawY.set(-9999);
    };

    const handleTouchMove = (e) => {
      if (e.touches && e.touches[0]) {
        rawX.set(e.touches[0].clientX);
        rawY.set(e.touches[0].clientY);
      }
    };

    const handleTouchEnd = () => {
      rawX.set(-9999);
      rawY.set(-9999);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [rawX, rawY]);

  return (
    <MouseContext.Provider value={{ mouseX, mouseY }}>
      {children}
    </MouseContext.Provider>
  );
};

export const useGlobalMouse = () => {
  const context = useContext(MouseContext);
  if (!context) {
    throw new Error('useGlobalMouse must be used within a MouseProvider');
  }
  return context;
};
