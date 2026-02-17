'use client';

import React, { Suspense, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Preload, useTexture } from '@react-three/drei';
import * as THREE from 'three';

function Plaque() {
  const group = useRef<THREE.Group>(null!);

  // Textura del logo (desde /public/logo-coforma.png)
  const tex = useTexture('/logo-coforma.png');

  useMemo(() => {
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 8;
    tex.wrapS = tex.wrapT = THREE.ClampToEdgeWrapping;
    tex.needsUpdate = true;
  }, [tex]);

  const { front, back, edge } = useMemo(() => {
    const frontMat = new THREE.MeshStandardMaterial({
      map: tex,
      roughness: 0.35,
      metalness: 0.08,
      transparent: true,
    });

    const backMat = new THREE.MeshStandardMaterial({
      map: tex,
      roughness: 0.45,
      metalness: 0.05,
      transparent: true,
    });

    const edgeMat = new THREE.MeshStandardMaterial({
      color: '#ffffff',
      roughness: 0.35,
      metalness: 0.05,
    });

    return { front: frontMat, back: backMat, edge: edgeMat };
  }, [tex]);

  const {
    frontGeo,
    backGeo,
    sideGeoL,
    sideGeoR,
    sideGeoT,
    sideGeoB,
    w,
    h,
    t,
  } = useMemo(() => {
    const w = 3.2;
    const h = 2.0;
    const t = 0.18;
    const r = 0.18;

    const shape = new THREE.Shape();
    shape.moveTo(-w / 2 + r, -h / 2);
    shape.lineTo(w / 2 - r, -h / 2);
    shape.quadraticCurveTo(w / 2, -h / 2, w / 2, -h / 2 + r);
    shape.lineTo(w / 2, h / 2 - r);
    shape.quadraticCurveTo(w / 2, h / 2, w / 2 - r, h / 2);
    shape.lineTo(-w / 2 + r, h / 2);
    shape.quadraticCurveTo(-w / 2, h / 2, -w / 2, h / 2 - r);
    shape.lineTo(-w / 2, -h / 2 + r);
    shape.quadraticCurveTo(-w / 2, -h / 2, -w / 2 + r, -h / 2);

    const frontGeo = new THREE.ShapeGeometry(shape, 32);
    const backGeo = new THREE.ShapeGeometry(shape, 32);

    const sideGeoL = new THREE.BoxGeometry(t, h - 2 * r, t);
    const sideGeoR = new THREE.BoxGeometry(t, h - 2 * r, t);
    const sideGeoT = new THREE.BoxGeometry(w - 2 * r, t, t);
    const sideGeoB = new THREE.BoxGeometry(w - 2 * r, t, t);

    const applyUV = (geo: THREE.BufferGeometry) => {
      geo.computeBoundingBox();
      const bb = geo.boundingBox!;
      const size = new THREE.Vector3();
      bb.getSize(size);

      const pos = geo.getAttribute('position') as THREE.BufferAttribute;
      const uv = new Float32Array(pos.count * 2);

      for (let i = 0; i < pos.count; i++) {
        const x = pos.getX(i);
        const y = pos.getY(i);
        const u = (x - bb.min.x) / size.x;
        const v = (y - bb.min.y) / size.y;
        uv[i * 2 + 0] = u;
        uv[i * 2 + 1] = v;
      }

      geo.setAttribute('uv', new THREE.BufferAttribute(uv, 2));
      geo.attributes.uv.needsUpdate = true;
    };

    applyUV(frontGeo);
    applyUV(backGeo);

    return { frontGeo, backGeo, sideGeoL, sideGeoR, sideGeoT, sideGeoB, w, h, t };
  }, []);

  useFrame((state) => {
    const g = group.current;
    const tt = state.clock.getElapsedTime();
    g.rotation.y = tt * 0.55;
    g.rotation.x = Math.sin(tt * 0.7) * 0.08;
  });

  return (
    <group ref={group}>
      <mesh geometry={frontGeo} material={front} position={[0, 0, t / 2]} />
      <mesh
        geometry={backGeo}
        material={back}
        position={[0, 0, -t / 2]}
        rotation={[Math.PI, 0, 0]}
      />

      <mesh geometry={sideGeoL} material={edge} position={[-w / 2 + t / 2, 0, 0]} />
      <mesh geometry={sideGeoR} material={edge} position={[w / 2 - t / 2, 0, 0]} />
      <mesh geometry={sideGeoT} material={edge} position={[0, h / 2 - t / 2, 0]} />
      <mesh geometry={sideGeoB} material={edge} position={[0, -h / 2 + t / 2, 0]} />
    </group>
  );
}

export default function HeroCube() {
  return (
    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[24px] bg-white">
      {/* Halo suave */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(520px_260px_at_50%_45%,rgba(16,185,129,0.14),transparent_65%)]" />

      <Canvas
        className="absolute inset-0"
        camera={{ position: [0, 0, 4.2], fov: 45 }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={0.75} />
        <directionalLight position={[3, 2, 4]} intensity={1.2} />
        <directionalLight position={[-4, -2, 3]} intensity={0.55} />

        <Suspense fallback={null}>
          <Environment preset="studio" />
          <Plaque />
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
}
