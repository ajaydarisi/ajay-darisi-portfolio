'use client';

import { useRef, useMemo, useState, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Float, MeshDistortMaterial, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

function Particles({ count = 100 }) {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const { mouse, viewport } = useThree();
  
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const t = Math.random() * 100;
      const factor = 20 + Math.random() * 100;
      const speed = 0.01 + Math.random() / 200;
      const xFactor = -50 + Math.random() * 100;
      const yFactor = -50 + Math.random() * 100;
      const zFactor = -50 + Math.random() * 100;
      temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0 });
    }
    return temp;
  }, [count]);

  useFrame((state) => {
    if (!mesh.current) return;
    particles.forEach((particle, i) => {
      let { t, factor, speed, xFactor, yFactor, zFactor } = particle;
      t = particle.t += speed / 2;
      const a = Math.cos(t) + Math.sin(t * 1) / 10;
      const b = Math.sin(t) + Math.cos(t * 2) / 10;
      const s = Math.cos(t);
      particle.mx += (state.mouse.x * viewport.width - particle.mx) * 0.01;
      particle.my += (state.mouse.y * viewport.height - particle.my) * 0.01;
      dummy.position.set(
        (particle.mx / 10) * a + xFactor + Math.cos((t / 10) * factor) + (viewport.width / 2) * a,
        (particle.my / 10) * b + yFactor + Math.sin((t / 10) * factor) + (viewport.height / 2) * b,
        (particle.my / 10) * b + zFactor + Math.cos((t / 10) * factor)
      );
      dummy.scale.set(s, s, s);
      dummy.rotation.set(s * 5, s * 5, s * 5);
      dummy.updateMatrix();
      mesh.current!.setMatrixAt(i, dummy.matrix);
    });
    mesh.current!.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <dodecahedronGeometry args={[0.1, 0]} />
      <meshStandardMaterial color="#7c3aed" emissive="#7c3aed" emissiveIntensity={2} />
    </instancedMesh>
  );
}

export function HeroScene({ isMobile }: { isMobile: boolean }) {
  const group = useRef<THREE.Group>(null);
  const { viewport } = useThree();

  useFrame((state) => {
    if (!group.current) return;
    const { x, y } = state.mouse;
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, x * 0.5, 0.1);
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -y * 0.5, 0.1);
  });

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={75} />
      <group ref={group}>
        <Float speed={4} rotationIntensity={2} floatIntensity={2}>
          <mesh scale={isMobile ? 1.5 : 2.5}>
            <torusKnotGeometry args={[1, 0.3, 128, 32]} />
            <MeshDistortMaterial
              color="#7c3aed"
              speed={5}
              distort={0.5}
              radius={1}
              metalness={1}
              roughness={0}
              emissive="#2dd4bf"
              emissiveIntensity={0.2}
            />
          </mesh>
        </Float>
        
        {!isMobile && <Particles count={40} />}
      </group>

      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1.5} color="#7c3aed" />
      <pointLight position={[-10, -10, -10]} intensity={1.5} color="#2dd4bf" />
      <spotLight position={[0, 5, 0]} intensity={2} penumbra={1} color="#ffffff" />
    </>
  );
}
