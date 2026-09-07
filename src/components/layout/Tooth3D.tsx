import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface Tooth3DProps {
  onClick?: () => void;
  size?: number;
}

export const Tooth3D: React.FC<Tooth3DProps> = ({ onClick, size = 56 }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const isHoveredRef = useRef(false);

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
    camera.position.set(0, 0.4, 4.2);

    // Renderer with antialias and alpha
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(size, size);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    currentMount.appendChild(renderer.domElement);

    // Enamel Gloss Material
    const enamelMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      emissive: 0x0a192f,
      emissiveIntensity: 0.08,
      roughness: 0.12,
      metalness: 0.05,
      clearcoat: 1.0,
      clearcoatRoughness: 0.08,
      reflectivity: 0.95,
      transmission: 0.05,
      thickness: 0.5,
      specularIntensity: 1.0,
      specularColor: new THREE.Color(0xdbeafe),
    });

    // Constructing a detailed anatomical 3D Tooth model
    const toothGroup = new THREE.Group();

    // 1. Crown Main Body
    const crownGeo = new THREE.CylinderGeometry(0.72, 0.55, 0.9, 32, 16);
    // Deform top to create realistic molar cusps
    const pos = crownGeo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const y = pos.getY(i);
      const x = pos.getX(i);
      const z = pos.getZ(i);

      if (y > 0.2) {
        // Create 4 distinct cusps (mesiobuccal, distobuccal, mesiolingual, distolingual)
        const angle = Math.atan2(z, x);
        const cuspWave = Math.sin(angle * 4) * 0.12;
        const centerDip = Math.max(0, 0.5 - Math.sqrt(x * x + z * z)) * 0.25;
        pos.setY(i, y + cuspWave - centerDip);
      }
    }
    crownGeo.computeVertexNormals();

    const crownMesh = new THREE.Mesh(crownGeo, enamelMaterial);
    crownMesh.position.y = 0.35;
    toothGroup.add(crownMesh);

    // 2. Crown Cusp Caps (Soft rounded enamel lobes)
    const cuspPositions = [
      [0.35, 0.72, 0.35],
      [-0.35, 0.72, 0.35],
      [0.35, 0.72, -0.35],
      [-0.35, 0.72, -0.35],
    ];

    cuspPositions.forEach(([cx, cy, cz]) => {
      const cuspGeo = new THREE.SphereGeometry(0.24, 16, 16);
      cuspGeo.scale(1, 0.65, 1);
      const cusp = new THREE.Mesh(cuspGeo, enamelMaterial);
      cusp.position.set(cx, cy, cz);
      toothGroup.add(cusp);
    });

    // 3. Cervical Neck (where crown transitions to root)
    const neckGeo = new THREE.CylinderGeometry(0.55, 0.42, 0.35, 24);
    const neckMesh = new THREE.Mesh(neckGeo, enamelMaterial);
    neckMesh.position.y = -0.15;
    toothGroup.add(neckMesh);

    // 4. Roots (Bifurcated roots: Mesial and Distal roots tapering down)
    const createRoot = (xOffset: number, curveDir: number) => {
      const rootCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(xOffset * 0.6, -0.25, 0),
        new THREE.Vector3(xOffset * 1.1, -0.7, curveDir * 0.05),
        new THREE.Vector3(xOffset * 0.85, -1.2, curveDir * 0.12),
        new THREE.Vector3(xOffset * 0.5, -1.55, curveDir * 0.15),
      ]);
      const rootGeo = new THREE.TubeGeometry(rootCurve, 24, 0.2, 16, false);
      // taper root
      const rootPos = rootGeo.attributes.position;
      for (let i = 0; i < rootPos.count; i++) {
        const y = rootPos.getY(i);
        const factor = Math.max(0.2, (y + 1.6) / 1.4);
        rootPos.setX(i, rootPos.getX(i) * factor);
        rootPos.setZ(i, rootPos.getZ(i) * factor);
      }
      rootGeo.computeVertexNormals();
      return new THREE.Mesh(rootGeo, enamelMaterial);
    };

    const rootLeft = createRoot(-0.28, -1);
    const rootRight = createRoot(0.28, 1);
    toothGroup.add(rootLeft);
    toothGroup.add(rootRight);

    toothGroup.position.y = 0.2;
    toothGroup.scale.set(1.15, 1.15, 1.15);
    scene.add(toothGroup);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    // Royal Blue primary key light to reflect clinic accent
    const blueKeyLight = new THREE.DirectionalLight(0x2563eb, 3.5);
    blueKeyLight.position.set(4, 5, 4);
    scene.add(blueKeyLight);

    // Pure white specular rim light
    const whiteRimLight = new THREE.DirectionalLight(0xffffff, 4.0);
    whiteRimLight.position.set(-4, 3, -3);
    scene.add(whiteRimLight);

    // Fill light
    const fillLight = new THREE.PointLight(0x93c5fd, 2.0, 10);
    fillLight.position.set(0, -2, 3);
    scene.add(fillLight);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Idle floating bob
      toothGroup.position.y = 0.1 + Math.sin(elapsedTime * 2) * 0.08;

      // Rotation
      if (isHoveredRef.current) {
        toothGroup.rotation.y += 0.045; // faster spin on hover
        toothGroup.rotation.x = Math.sin(elapsedTime * 4) * 0.15;
      } else {
        toothGroup.rotation.y += 0.015; // gentle idle orbit
        toothGroup.rotation.x = Math.sin(elapsedTime * 1.5) * 0.06;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Mouse enter / leave listeners
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
      crownGeo.dispose();
      enamelMaterial.dispose();
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
      {/* Subtle glowing halo behind tooth */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-primary-600/20 via-primary-400/20 to-transparent blur-md opacity-70 group-hover:opacity-100 transition-opacity pointer-events-none" />
    </div>
  );
};
