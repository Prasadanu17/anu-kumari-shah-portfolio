// src/components/common/CustomCursor.jsx
import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const outerRef = useRef(null);
  const innerRef = useRef(null);

  useEffect(() => {
    const outer = outerRef.current;
    const inner = innerRef.current;
    if (!outer || !inner) return;

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let dotX = 0;
    let dotY = 0;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const animate = () => {
      // Outer ring - slower follow (laggy/smooth feel)
      cursorX += (mouseX - cursorX) * 0.1;
      cursorY += (mouseY - cursorY) * 0.1;

      // Inner dot - faster follow
      dotX += (mouseX - dotX) * 0.5;
      dotY += (mouseY - dotY) * 0.5;

      outer.style.left = `${cursorX}px`;
      outer.style.top = `${cursorY}px`;

      inner.style.left = `${dotX}px`;
      inner.style.top = `${dotY}px`;

      requestAnimationFrame(animate);
    };

    animate();

    // Hover effect on interactive elements
    const interactive = document.querySelectorAll('a, button, input, textarea, .project-card, .filter-btn');

    const onEnter = () => {
      outer.style.transform = 'translate(-50%, -50%) scale(1.5)';
      outer.style.borderColor = '#14b8a6'; // teal / secondary-500
      inner.style.transform = 'translate(-50%, -50%) scale(0.5)';
    };

    const onLeave = () => {
      outer.style.transform = 'translate(-50%, -50%) scale(1)';
      outer.style.borderColor = '#6366f1'; // indigo / primary-500
      inner.style.transform = 'translate(-50%, -50%) scale(1)';
    };

    interactive.forEach(el => {
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
    });

    window.addEventListener('mousemove', onMouseMove);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      interactive.forEach(el => {
        el.removeEventListener('mouseenter', onEnter);
        el.removeEventListener('mouseleave', onLeave);
      });
    };
  }, []);

  return (
    <>
      <div
        ref={outerRef}
        id="cursor"
        className="
          hidden md:block fixed w-6 h-6 
          border-2 border-primary-500 rounded-full 
          pointer-events-none z-[9999] 
          mix-blend-difference transition-transform duration-150
        "
        style={{ transform: 'translate(-50%, -50%)', willChange: 'left, top, transform' }}
      />

      <div
        ref={innerRef}
        id="cursor-dot"
        className="
          hidden md:block fixed w-2 h-2 
          bg-primary-500 rounded-full 
          pointer-events-none z-[10000] 
          mix-blend-difference transition-transform duration-100
        "
        style={{ transform: 'translate(-50%, -50%)', willChange: 'left, top' }}
      />
    </>
  );
}