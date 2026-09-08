import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface Tooth3DProps {
  onClick?: () => void;
  size?: number;
}

export const Tooth3D: React.FC<Tooth3DProps> = ({ onClick, size = 50 }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const isHoveredRef = useRef(false);

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    // Scene
    const scene = new THREE.Scene();

    // Camera positioned to let the tooth appear bolder and prominent
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    camera.position.set(0, -0.05, 3.8);

    // Renderer with antialias and alpha
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(size, size);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.4;
    currentMount.appendChild(renderer.domElement);

    // Modern Stylized Crystal-Ceramic 3D Tooth Group
    const toothGroup = new THREE.Group();

    // 1. Ultra-Gloss Dental Enamel / Crystal Ceramic Material
    const enamelMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      emissive: 0x1d4ed8, // Rich royal blue internal luminescence
      emissiveIntensity: 0.18,
      roughness: 0.05,
      metalness: 0.08,
      clearcoat: 1.0,
      clearcoatRoughness: 0.02,
      reflectivity: 1.0,
      transmission: 0.06,
      thickness: 0.5,
      specularIntensity: 2.5,
      specularColor: new THREE.Color(0xa5f3fc), // Sparkling cyan-ice specular glint
      ior: 1.68,
    });

    // Accent Gold / Platinum Restoration band at the cervical neck
    const goldAccentMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xfacc15, // Polished Dental Gold
      emissive: 0xb45309,
      emissiveIntensity: 0.15,
      roughness: 0.15,
      metalness: 0.85,
      clearcoat: 1.0,
    });

    // 2. Main Crown: Sculpted 3D Molar Crown with 2 smooth lateral arches & central fissure
    // Create twin crown lobes (left & right lobes that blend into a modern iconic molar)
    const lobeGeo = new THREE.SphereGeometry(0.55, 32, 32);
    lobeGeo.scale(1.0, 1.25, 0.95);

    const leftLobe = new THREE.Mesh(lobeGeo, enamelMaterial);
    leftLobe.position.set(-0.35, 0.45, 0);
    toothGroup.add(leftLobe);

    const rightLobe = new THREE.Mesh(lobeGeo, enamelMaterial);
    rightLobe.position.set(0.35, 0.45, 0);
    toothGroup.add(rightLobe);

    // Occlusal Central Bridge / Crown Cap
    const capGeo = new THREE.CylinderGeometry(0.68, 0.58, 0.55, 36);
    const capMesh = new THREE.Mesh(capGeo, enamelMaterial);
    capMesh.position.set(0, 0.35, 0);
    toothGroup.add(capMesh);

    // 4 Stylized Smooth Cusps on top
    const cuspPositions = [
      [-0.32, 0.96, 0.22],
      [0.32, 0.96, 0.22],
      [-0.32, 0.94, -0.22],
      [0.32, 0.94, -0.22],
    ];
    cuspPositions.forEach(([cx, cy, cz]) => {
      const cuspGeo = new THREE.SphereGeometry(0.18, 20, 20);
      cuspGeo.scale(1.1, 0.85, 1.1);
      const cusp = new THREE.Mesh(cuspGeo, enamelMaterial);
      cusp.position.set(cx, cy, cz);
      toothGroup.add(cusp);
    });

    // 3. Cervical Collar / Golden Smile Ring (Modern Dental Clinic Crest)
    const ringGeo = new THREE.TorusGeometry(0.54, 0.055, 20, 36);
    ringGeo.scale(1.0, 0.7, 1.0);
    const collarRing = new THREE.Mesh(ringGeo, goldAccentMaterial);
    collarRing.rotation.x = Math.PI / 2;
    collarRing.position.set(0, 0.02, 0);
    toothGroup.add(collarRing);

    // 4. Smooth Stylized Dual Roots (Tapered graceful cones)
    const createStylizedRoot = (xPos: number, angleZ: number) => {
      const rootGeo = new THREE.ConeGeometry(0.32, 1.35, 32);
      rootGeo.rotateZ(Math.PI); // Point down
      const rMesh = new THREE.Mesh(rootGeo, enamelMaterial);
      rMesh.position.set(xPos, -0.68, 0);
      rMesh.rotation.z = angleZ;
      return rMesh;
    };

    const rootLeft = createStylizedRoot(-0.25, 0.12);
    const rootRight = createStylizedRoot(0.25, -0.12);
    toothGroup.add(rootLeft);
    toothGroup.add(rootRight);

    // Rounded root apex tips
    const tipGeo = new THREE.SphereGeometry(0.08, 16, 16);
    const tipLeft = new THREE.Mesh(tipGeo, enamelMaterial);
    tipLeft.position.set(-0.33, -1.36, 0);
    const tipRight = new THREE.Mesh(tipGeo, enamelMaterial);
    tipRight.position.set(0.33, -1.36, 0);
    toothGroup.add(tipLeft);
    toothGroup.add(tipRight);

    // Tooth Centering & Overall Scale (prominent & well-proportioned)
    toothGroup.position.set(0, 0.28, 0);
    toothGroup.scale.set(1.05, 1.05, 1.05);
    scene.add(toothGroup);

    // 5. 3D Royal Blue Floor Under-Shadow Disc
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 256;
    shadowCanvas.height = 256;
    const ctx = shadowCanvas.getContext('2d');
    if (ctx) {
      const grad = ctx.createRadialGradient(128, 128, 4, 128, 128, 120);
      grad.addColorStop(0, 'rgba(29, 78, 216, 0.95)');   // Deep royal blue #1d4ed8
      grad.addColorStop(0.35, 'rgba(37, 99, 235, 0.65)'); // Royal blue #2563eb
      grad.addColorStop(0.7, 'rgba(59, 130, 246, 0.25)');  // Vibrant sky blue
      grad.addColorStop(1, 'rgba(29, 78, 216, 0.0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 256, 256);
    }
    const shadowTexture = new THREE.CanvasTexture(shadowCanvas);
    const shadowGeo = new THREE.PlaneGeometry(2.5, 2.5);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTexture,
      transparent: true,
      depthWrite: false,
      opacity: 0.88,
    });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.set(0, -1.65, 0);
    scene.add(shadowMesh);

    // 6. Lighting for High-End Studio Jewelry & Clinical Clean Look
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.6);
    scene.add(ambientLight);

    // Primary Royal Blue Key Light
    const royalBlueKeyLight = new THREE.DirectionalLight(0x2563eb, 4.8);
    royalBlueKeyLight.position.set(3.5, 4.5, 3.5);
    scene.add(royalBlueKeyLight);

    // Pure White Rim Light from rear-left
    const studioRimLight = new THREE.DirectionalLight(0xffffff, 5.2);
    studioRimLight.position.set(-4.0, 3.5, -3.0);
    scene.add(studioRimLight);

    // Accent Under-Glow Light (Royal Blue bounce from floor)
    const underGlowLight = new THREE.PointLight(0x1d4ed8, 3.2, 8);
    underGlowLight.position.set(0, -1.4, 1.2);
    scene.add(underGlowLight);

    // Top Ice-Blue Specular Sparkle
    const topGlint = new THREE.PointLight(0x67e8f9, 2.2, 6);
    topGlint.position.set(0, 2.2, 1.8);
    scene.add(topGlint);

    // Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth floating bob
      const bobOffset = Math.sin(elapsedTime * 2.2) * 0.06;
      toothGroup.position.y = 0.28 + bobOffset;

      // Royal blue under-shadow reactive pulse
      const shadowScale = 1.0 - bobOffset * 0.9;
      shadowMesh.scale.set(shadowScale, shadowScale, shadowScale);
      shadowMesh.rotation.z = -toothGroup.rotation.y * 0.5;

      // Tooth Orbit & Tilt
      if (isHoveredRef.current) {
        toothGroup.rotation.y += 0.042;
        toothGroup.rotation.x = Math.sin(elapsedTime * 3.5) * 0.12;
        shadowMat.opacity = 0.95;
      } else {
        toothGroup.rotation.y += 0.016;
        toothGroup.rotation.x = 0.1 + Math.sin(elapsedTime * 1.5) * 0.05;
        shadowMat.opacity = 0.8 + Math.sin(elapsedTime * 2.2) * 0.12;
      }

      renderer.render(scene, camera);
    };

    animate();

    const handleMouseEnter = () => {
      isHoveredRef.current = true;
    };
    const handleMouseLeave = () => {
      isHoveredRef.current = false;
    };

    currentMount.addEventListener('mouseenter', handleMouseEnter);
    currentMount.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationFrameId);
      currentMount.removeEventListener('mouseenter', handleMouseEnter);
      currentMount.removeEventListener('mouseleave', handleMouseLeave);
      if (currentMount.contains(renderer.domElement)) {
        currentMount.removeChild(renderer.domElement);
      }
      renderer.dispose();
      lobeGeo.dispose();
      capGeo.dispose();
      ringGeo.dispose();
      tipGeo.dispose();
      shadowGeo.dispose();
      shadowTexture.dispose();
      shadowMat.dispose();
      enamelMaterial.dispose();
      goldAccentMaterial.dispose();
    };
  }, [size]);

  return (
    <div
      ref={mountRef}
      onClick={onClick}
      className="relative flex items-center justify-center cursor-pointer transition-transform duration-300 hover:scale-110 active:scale-95 group"
      title="Dentrix Home / Dashboard"
      style={{ width: size, height: size }}
    >
      {/* Radiant Royal Blue glowing under-shadow and aura behind the tooth */}
      <div className="absolute inset-0 rounded-full bg-blue-600/40 blur-xl group-hover:bg-blue-600/60 group-hover:blur-2xl transition-all pointer-events-none scale-125" />
      <div className="absolute -bottom-2 w-4/5 h-3 rounded-full bg-blue-700/70 blur-md group-hover:bg-blue-600/90 group-hover:scale-125 transition-all pointer-events-none" />
    </div>
  );
};
