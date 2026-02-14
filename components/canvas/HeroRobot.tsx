'use client';

import { motion, useMotionValue, useTransform, useSpring, useAnimationFrame } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

function Eye({ side, mouseX, mouseY }: { side: 'left' | 'right'; mouseX: number; mouseY: number }) {
  const offsetX = side === 'left' ? -24 : 24;
  const pupilX = useSpring(0, { stiffness: 150, damping: 20 });
  const pupilY = useSpring(0, { stiffness: 150, damping: 20 });

  useEffect(() => {
    pupilX.set(mouseX * 4);
    pupilY.set(mouseY * 4);
  }, [mouseX, mouseY, pupilX, pupilY]);

  return (
    <g transform={`translate(${offsetX}, -10)`}>
      {/* Eye socket glow */}
      <motion.circle
        cx="0" cy="0" r="13"
        fill="none"
        stroke="#7c3aed"
        strokeWidth="1.5"
        initial={{ opacity: 0.3 }}
        animate={{ opacity: [0.3, 0.8, 0.3] }}
        transition={{ duration: 2, repeat: Infinity, delay: side === 'left' ? 0 : 0.3 }}
      />
      {/* Eye background */}
      <circle cx="0" cy="0" r="11" fill="#0a0a1a" />
      {/* Pupil */}
      <motion.circle
        cx="0" cy="0" r="4"
        fill="#2dd4bf"
        style={{ x: pupilX, y: pupilY }}
      />
      {/* Pupil inner */}
      <motion.circle
        cx="0" cy="0" r="2"
        fill="#ffffff"
        style={{ x: pupilX, y: pupilY }}
      />
    </g>
  );
}

function ScanLine() {
  return (
    <motion.line
      x1="-60" y1="0" x2="60" y2="0"
      stroke="#2dd4bf"
      strokeWidth="1"
      opacity="0.15"
      initial={{ y1: -100, y2: -100 }}
      animate={{ y1: 160, y2: 160 }}
      transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
    />
  );
}

function CircuitLines() {
  const paths = [
    'M -40 30 L -60 30 L -60 50 L -70 50',
    'M 40 30 L 60 30 L 60 50 L 70 50',
    'M -30 45 L -30 65 L -50 65',
    'M 30 45 L 30 65 L 50 65',
    'M 0 50 L 0 75',
    'M -20 -45 L -20 -60 L -40 -60',
    'M 20 -45 L 20 -60 L 40 -60',
  ];

  return (
    <g>
      {paths.map((d, i) => (
        <g key={i}>
          <path d={d} fill="none" stroke="#7c3aed" strokeWidth="1" opacity="0.15" />
          <motion.path
            d={d}
            fill="none"
            stroke="#7c3aed"
            strokeWidth="1.5"
            strokeDasharray="8 60"
            strokeDashoffset={0}
            animate={{ strokeDashoffset: -68 }}
            transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: 'linear' }}
            opacity="0.6"
          />
          {/* Node dots at endpoints */}
          <motion.circle
            cx={0} cy={0}
            r="2"
            fill="#7c3aed"
            opacity={0.4}
            animate={{ opacity: [0.2, 0.8, 0.2] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
            transform={`translate(${d.split(' ').slice(-2).join(',')})`}
          />
        </g>
      ))}
    </g>
  );
}

function StatusIndicators() {
  return (
    <g transform="translate(0, 160)">
      {[-20, -10, 0, 10, 20].map((x, i) => (
        <motion.rect
          key={i}
          x={x - 2} y="0"
          width="4" height="4"
          rx="1"
          fill={i === 2 ? '#2dd4bf' : '#7c3aed'}
          animate={{ opacity: [0.2, 1, 0.2] }}
          transition={{ duration: 1, repeat: Infinity, delay: i * 0.15 }}
        />
      ))}
    </g>
  );
}

function FloatingParticle({ delay, x, y }: { delay: number; x: number; y: number }) {
  return (
    <motion.circle
      cx={x} cy={y} r="1.5"
      fill="#7c3aed"
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: [0, 0.6, 0],
        scale: [0, 1, 0],
        y: [y, y - 30],
      }}
      transition={{ duration: 3, repeat: Infinity, delay, ease: 'easeOut' }}
    />
  );
}

export function HeroRobot() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const isMobile = useIsMobile();
  const breathe = useMotionValue(0);

  useAnimationFrame((t) => {
    breathe.set(Math.sin(t / 1000) * 2);
  });

  const breatheY = useTransform(breathe, (v) => v);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      setMousePos({ x: Math.max(-1, Math.min(1, x)), y: Math.max(-1, Math.min(1, y)) });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full flex items-center justify-center relative">
      {/* Ambient background glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-64 h-64 md:w-96 md:h-96 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <motion.svg
        viewBox="-120 -110 240 280"
        className="w-full h-full max-w-[500px] max-h-[600px] drop-shadow-2xl"
        style={{ y: breatheY }}
      >
        <defs>
          <filter id="eyeGlow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="neonGlow">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="bodyGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1a1a2e" />
            <stop offset="100%" stopColor="#0a0a1a" />
          </linearGradient>
          <linearGradient id="headGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1e1e3a" />
            <stop offset="100%" stopColor="#12122a" />
          </linearGradient>
        </defs>

        {/* Circuit background lines */}
        <CircuitLines />

        {/* Scan line effect */}
        <ScanLine />

        {/* Floating particles */}
        {[
          { x: -70, y: -40, delay: 0 },
          { x: 65, y: -30, delay: 0.8 },
          { x: -55, y: 20, delay: 1.5 },
          { x: 80, y: 10, delay: 2.2 },
          { x: -80, y: -10, delay: 0.4 },
          { x: 75, y: -60, delay: 1.8 },
        ].map((p, i) => (
          <FloatingParticle key={i} {...p} />
        ))}

        {/* Antenna */}
        <g transform="translate(0, -48)">
          <line x1="0" y1="0" x2="0" y2="-20" stroke="#7c3aed" strokeWidth="2" opacity="0.6" />
          <motion.circle
            cx="0" cy="-22" r="4"
            fill="#7c3aed"
            filter="url(#neonGlow)"
            animate={{ opacity: [0.4, 1, 0.4], scale: [0.8, 1.2, 0.8] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          {/* Antenna signal waves */}
          {[1, 2, 3].map((ring) => (
            <motion.circle
              key={ring}
              cx="0" cy="-22"
              r={ring * 6}
              fill="none"
              stroke="#7c3aed"
              strokeWidth="0.5"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: [0.4, 0], scale: [0.5, 1.5] }}
              transition={{ duration: 2, repeat: Infinity, delay: ring * 0.4 }}
            />
          ))}
        </g>

        {/* Head */}
        <motion.rect
          x="-48" y="-50" width="96" height="68" rx="14"
          fill="url(#headGrad)"
          stroke="#7c3aed"
          strokeWidth="1.5"
          animate={{ strokeOpacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 3, repeat: Infinity }}
        />

        {/* Head highlight line */}
        <rect x="-43" y="-46" width="86" height="1" fill="#7c3aed" opacity="0.15" rx="0.5" />

        {/* Eyes */}
        <Eye side="left" mouseX={mousePos.x} mouseY={mousePos.y} />
        <Eye side="right" mouseX={mousePos.x} mouseY={mousePos.y} />

        {/* Ear panels */}
        {[-1, 1].map((side) => (
          <g key={side} transform={`translate(${side * 55}, -22)`}>
            <rect x="-6" y="-12" width="12" height="24" rx="3" fill="#1a1a2e" stroke="#7c3aed" strokeWidth="1" opacity="0.5" />
            <motion.rect
              x="-3" y="-8" width="6" height="4" rx="1"
              fill="#7c3aed"
              animate={{ opacity: [0.2, 0.7, 0.2] }}
              transition={{ duration: 1.2, repeat: Infinity, delay: side === -1 ? 0 : 0.6 }}
            />
            <motion.rect
              x="-3" y="0" width="6" height="4" rx="1"
              fill="#2dd4bf"
              animate={{ opacity: [0.2, 0.7, 0.2] }}
              transition={{ duration: 1.2, repeat: Infinity, delay: side === -1 ? 0.3 : 0.9 }}
            />
          </g>
        ))}

        {/* Neck */}
        <rect x="-12" y="18" width="24" height="16" rx="2" fill="#1a1a2e" stroke="#7c3aed" strokeWidth="0.5" opacity="0.4" />

        {/* Body / torso */}
        <motion.rect
          x="-50" y="34" width="100" height="65" rx="8"
          fill="url(#bodyGrad)"
          stroke="#7c3aed"
          strokeWidth="1.5"
          animate={{ strokeOpacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 4, repeat: Infinity }}
        />

        {/* Chest core / arc reactor */}
        <g transform="translate(0, 58)">
          <motion.circle
            cx="0" cy="0" r="12"
            fill="none"
            stroke="#2dd4bf"
            strokeWidth="1.5"
            animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.circle
            cx="0" cy="0" r="8"
            fill="#2dd4bf"
            opacity="0.15"
            animate={{ opacity: [0.1, 0.25, 0.1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.circle
            cx="0" cy="0" r="4"
            fill="#2dd4bf"
            filter="url(#neonGlow)"
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          {/* Core ring segments */}
          {[
            { angle: 0,   x1: 9,    y1: 0,     x2: 12,   y2: 0 },
            { angle: 60,  x1: 4.5,  y1: 7.79,  x2: 6,    y2: 10.39 },
            { angle: 120, x1: -4.5, y1: 7.79,  x2: -6,   y2: 10.39 },
            { angle: 180, x1: -9,   y1: 0,     x2: -12,  y2: 0 },
            { angle: 240, x1: -4.5, y1: -7.79, x2: -6,   y2: -10.39 },
            { angle: 300, x1: 4.5,  y1: -7.79, x2: 6,    y2: -10.39 },
          ].map(({ angle, x1, y1, x2, y2 }) => (
            <motion.line
              key={angle}
              x1={x1} y1={y1} x2={x2} y2={y2}
              stroke="#2dd4bf"
              strokeWidth="1.5"
              animate={{ opacity: [0.3, 0.9, 0.3] }}
              transition={{ duration: 1, repeat: Infinity, delay: angle / 360 }}
            />
          ))}
        </g>

        {/* Arms */}
        {[-1, 1].map((side) => (
          <g key={`arm-${side}`} transform={`translate(${side * 58}, 43)`}>
            <motion.g
              animate={{ y: [0, 2, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: side === -1 ? 0 : 0.5 }}
            >
              <rect
                x="-8" y="0" width="16" height="45" rx="6"
                fill="#1a1a2e"
                stroke="#7c3aed"
                strokeWidth="1"
                opacity="0.6"
              />
              {/* Arm joint */}
              <circle cx="0" cy="0" r="4" fill="#1a1a2e" stroke="#7c3aed" strokeWidth="1" opacity="0.4" />
            </motion.g>
          </g>
        ))}

        {/* Legs (hidden on mobile) */}
        {!isMobile && [-1, 1].map((side) => (
          <g key={`leg-${side}`} transform={`translate(${side * 18}, 99)`}>
            <rect x="-10" y="0" width="20" height="12" rx="3" fill="#1a1a2e" stroke="#7c3aed" strokeWidth="0.5" opacity="0.4" />
            <motion.g
              animate={{ y: [0, 1, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: side === -1 ? 0.2 : 0.7 }}
            >
              <rect
                x="-9" y="12" width="18" height="30" rx="5"
                fill="#1a1a2e"
                stroke="#7c3aed"
                strokeWidth="1"
                opacity="0.6"
              />
              {/* Foot */}
              <rect x="-12" y="42" width="24" height="8" rx="4" fill="#1a1a2e" stroke="#7c3aed" strokeWidth="1" opacity="0.5" />
            </motion.g>
          </g>
        ))}

        {/* Status indicators at bottom (hidden on mobile) */}
        {!isMobile && <StatusIndicators />}

        <motion.text
          x="30" y="-90"
          fill="#2dd4bf" fontSize="6" fontFamily="monospace"
          animate={{ opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          AI_CORE: ONLINE
        </motion.text>
      </motion.svg>
    </div>
  );
}
