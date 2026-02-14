'use client';

import { Canvas } from '@react-three/fiber';
import { Preload } from '@react-three/drei';
import { Suspense } from 'react';

interface SceneProps {
  children: React.ReactNode;
  className?: string;
}

export default function Scene({ children, className }: SceneProps) {
  return (
    <div className={`fixed inset-0 -z-10 ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          {children}
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
}
