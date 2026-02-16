'use client';

import { useEffect, useState } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useMotionTemplate,
} from 'framer-motion';

const INTERACTIVE_SELECTORS =
  'a, button, [role="button"], input, textarea, select, [data-cursor-hover]';

export function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const x = useSpring(cursorX, springConfig);
  const y = useSpring(cursorY, springConfig);

  const transform = useMotionTemplate`translate(${x}px, ${y}px)`;

  const glowFilter =
    'drop-shadow(0 0 6px hsl(260 100% 60% / 0.7)) drop-shadow(0 0 12px hsl(180 100% 50% / 0.4))';

  // Mouse tracking
  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setMousePos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    const handleElementEnter = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.matches(INTERACTIVE_SELECTORS) || target.closest(INTERACTIVE_SELECTORS)) {
        setIsHovering(true);
      }
    };

    const handleElementLeave = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.matches(INTERACTIVE_SELECTORS) || target.closest(INTERACTIVE_SELECTORS)) {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseover', handleElementEnter);
    document.addEventListener('mouseout', handleElementLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseover', handleElementEnter);
      document.removeEventListener('mouseout', handleElementLeave);
    };
  }, [cursorX, cursorY, isVisible]);

  // Don't render on touch devices (SSR-safe)
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  useEffect(() => {
    setIsTouchDevice(window.matchMedia('(pointer: coarse)').matches);
  }, []);

  if (isTouchDevice) return null;

  const hoverScale = isHovering ? 1.4 : 1;

  return (
    <motion.div
      aria-hidden="true"
      className="fixed top-0 left-0 pointer-events-none"
      style={{
        transform,
        zIndex: 9999,
        willChange: 'transform',
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 0.2s ease',
      }}
    >
      <div style={{ marginLeft: -20, marginTop: -20, width: 40, height: 40, position: 'relative' }}>
        {/* HUD crosshair with corner brackets */}
        <motion.svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          animate={{ scale: hoverScale }}
          transition={{ duration: 0.2 }}
          style={{ filter: glowFilter }}
        >
          {/* Crosshair lines */}
          <g stroke="hsl(180 100% 50%)" strokeWidth="1" strokeLinecap="round" opacity="0.8">
            <line x1="20" y1="14" x2="20" y2="18" />
            <line x1="20" y1="22" x2="20" y2="26" />
            <line x1="14" y1="20" x2="18" y2="20" />
            <line x1="22" y1="20" x2="26" y2="20" />
          </g>
          {/* Center dot */}
          <circle cx="20" cy="20" r="1.5" fill="hsl(180 100% 50%)" opacity="0.9" />
          {/* Corner brackets */}
          <g stroke="hsl(260 100% 60%)" strokeWidth="1" fill="none" opacity="0.6">
            <path d="M8 14 L8 8 L14 8" />
            <path d="M26 8 L32 8 L32 14" />
            <path d="M32 26 L32 32 L26 32" />
            <path d="M14 32 L8 32 L8 26" />
          </g>
        </motion.svg>
        {/* HUD Data readout */}
        <motion.div
          animate={{ opacity: isVisible ? 1 : 0 }}
          style={{
            position: 'absolute',
            top: isHovering ? 40 : 34,
            left: isHovering ? 35 : 26,
            fontFamily: "'Orbitron', monospace",
            fontSize: '10px',
            color: 'hsl(180 100% 50%)',
            whiteSpace: 'nowrap',
            letterSpacing: '0.75px',
            textShadow: '0 0 6px hsl(180 100% 50% / 0.7)',
            pointerEvents: 'none',
          }}
        >
          {isHovering ? (
            <span style={{ color: 'hsl(260 100% 70%)' }}>[TARGET_LOCKED]</span>
          ) : (
            <>
              X:{mousePos.x.toString().padStart(4, '0')} Y:
              {mousePos.y.toString().padStart(4, '0')}
            </>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}
