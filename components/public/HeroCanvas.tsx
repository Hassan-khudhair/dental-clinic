'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function HeroCanvas() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current!;
    const w = mount.clientWidth;
    const h = mount.clientHeight;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, w / h, 0.1, 100);
    camera.position.z = 8;

    scene.add(new THREE.AmbientLight(0xffffff, 0.3));
    const tealLight = new THREE.PointLight(0x00BCD4, 3, 25);
    tealLight.position.set(4, 3, 4);
    scene.add(tealLight);
    const goldLight = new THREE.PointLight(0xD4A853, 2, 20);
    goldLight.position.set(-4, -2, 3);
    scene.add(goldLight);

    const count = 350;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * 35;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 25;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 18;
      sizes[i] = Math.random() * 0.08 + 0.02;
      const isTeal = Math.random() > 0.35;
      if (isTeal) {
        colors[i * 3] = 0; colors[i * 3 + 1] = 0.73; colors[i * 3 + 2] = 0.83;
      } else {
        colors[i * 3] = 0.83; colors[i * 3 + 1] = 0.66; colors[i * 3 + 2] = 0.33;
      }
    }

    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    pGeo.setAttribute('color',    new THREE.BufferAttribute(colors, 3));
    pGeo.setAttribute('size',     new THREE.BufferAttribute(sizes, 1));
    const pMat = new THREE.PointsMaterial({ size: 0.07, vertexColors: true, transparent: true, opacity: 0.75, sizeAttenuation: true });
    const particles = new THREE.Points(pGeo, pMat);
    scene.add(particles);

    const ringData = [
      { pos: [3.5, 1.5, -3] as [number,number,number],  color: 0x00BCD4, r: 1.8, tube: 0.04, opacity: 0.45 },
      { pos: [-4, -1, -4] as [number,number,number],     color: 0xD4A853, r: 1.3, tube: 0.035, opacity: 0.4 },
      { pos: [0.5, 3, -5] as [number,number,number],     color: 0x006E7A, r: 2.4, tube: 0.05, opacity: 0.3 },
      { pos: [-2, 2.5, -2] as [number,number,number],    color: 0x00E5FF, r: 0.9, tube: 0.03, opacity: 0.35 },
    ];

    const rings = ringData.map((d) => {
      const geo = new THREE.TorusGeometry(d.r, d.tube, 20, 120);
      const mat = new THREE.MeshStandardMaterial({ color: d.color, transparent: true, opacity: d.opacity, metalness: 0.8, roughness: 0.2, emissive: d.color, emissiveIntensity: 0.3 });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(...d.pos);
      scene.add(mesh);
      return mesh;
    });

    const gemData = [
      { pos: [2, -2, -2] as [number,number,number],  color: 0x00E5FF, s: 0.25 },
      { pos: [-3, 1, -1] as [number,number,number],  color: 0xD4A853, s: 0.18 },
    ];
    const gems = gemData.map((d) => {
      const geo = new THREE.IcosahedronGeometry(d.s, 0);
      const mat = new THREE.MeshStandardMaterial({ color: d.color, transparent: true, opacity: 0.6, metalness: 1, roughness: 0, emissive: d.color, emissiveIntensity: 0.5 });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(...d.pos);
      scene.add(mesh);
      return mesh;
    });

    let targetX = 0, targetY = 0, currentX = 0, currentY = 0;
    const onMouseMove = (e: MouseEvent) => {
      targetX = (e.clientX / window.innerWidth - 0.5) * 1.2;
      targetY = (e.clientY / window.innerHeight - 0.5) * 1.2;
    };
    window.addEventListener('mousemove', onMouseMove);

    const onResize = () => {
      const nw = mount.clientWidth, nh = mount.clientHeight;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    };
    window.addEventListener('resize', onResize);

    const clock = new THREE.Clock();
    let animId: number;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();
      particles.rotation.y = t * 0.04;
      particles.rotation.x = t * 0.015;
      rings.forEach((ring, i) => {
        ring.rotation.x = t * (0.2 + i * 0.07);
        ring.rotation.y = t * (0.15 + i * 0.04);
        ring.position.y = ringData[i].pos[1] + Math.sin(t * 0.5 + i) * 0.3;
      });
      gems.forEach((gem, i) => {
        gem.rotation.x = t * 0.8;
        gem.rotation.z = t * 0.5;
        gem.position.y = gemData[i].pos[1] + Math.sin(t * 0.7 + i * 2) * 0.25;
      });
      currentX += (targetX - currentX) * 0.025;
      currentY += (-targetY - currentY) * 0.025;
      camera.position.x = currentX;
      camera.position.y = currentY;
      camera.lookAt(scene.position);
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0" />;
}
