import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface Tooth3DProps {
  onClick?: () => void;
  size?: number;
}

export const Tooth3D: React.FC<Tooth3DProps> = ({ onClick, size = 42 }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const isHoveredRef = useRef(false);

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    // Scene
    const scene = new THREE.Scene();

    // Camera positioned with comfortable distance so tooth appears refined and compact
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    camera.position.set(0, -0.05, 4.4);

    // Renderer with antialias and alpha
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(size, size);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.4;
    currentMount.appendChild(renderer.domElement);

    // Anatomical Stylized 3D Tooth Group
    const toothGroup = new THREE.Group();

    // 1. Sleek High-Gloss Dental Ceramic Enamel Material
    const enamelMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      emissive: 0x1e40af, // Deep royal blue internal luminescence
      emissiveIntensity: 0.16,
      roughness: 0.08,
      metalness: 0.05,
      clearcoat: 1.0,
      clearcoatRoughness: 0.04,
      reflectivity: 1.0,
      transmission: 0.08,
      thickness: 0.6,
      specularIntensity: 2.0,
      specularColor: new THREE.Color(0xdbeafe), // Light ice-blue specular highlights
      ior: 1.62,
    });

    // 2. Crown: Lathed & sculpted organic crown with 4 flowing cusps & smooth occlusal surface
    // Using a refined parametric shape via Lathe / sculpted geometry
    const crownPoints: THREE.Vector2[] = [
      new THREE.Vector2(0.001, 0.88), // occlusal pit depression
      new THREE.Vector2(0.32, 0.96),  // inner cusp rise
      new THREE.Vector2(0.68, 1.02),  // cusp peak
      new THREE.Vector2(0.82, 0.82),  // upper buccal curve
      new THREE.Vector2(0.86, 0.50),  // maximum crown convexity (height of contour)
      new THREE.Vector2(0.76, 0.18),  // lower crown taper
      new THREE.Vector2(0.56, -0.06), // cervical line (cervix / cementoenamel junction)
      new THREE.Vector2(0.38, -0.22), // bifurcation base
    ];

    const crownGeo = new THREE.LatheGeometry(crownPoints, 48);
    const crownPos = crownGeo.attributes.position;
    for (let i = 0; i < crownPos.count; i++) {
      const x = crownPos.getX(i);
      const y = crownPos.getY(i);
      const z = crownPos.getZ(i);
      const angle = Math.atan2(z, x);
      const r = Math.sqrt(x * x + z * z);

      // Add 4 organic cusp lobes around the circumference
      if (y > 0.4) {
        const cuspMod = Math.sin(angle * 4) * 0.12;
        const radialFlay = (1 + Math.sin(angle * 4) * 0.09);
        crownPos.setX(i, x * radialFlay);
        crownPos.setZ(i, z * radialFlay);
        crownPos.setY(i, y + cuspMod * (y - 0.4) * 1.5);
      } else if (y < 0.1) {
        // Slightly ovalize the cervical neck for anatomical realism
        const ovalFactor = 1 + Math.sin(angle * 2) * 0.08;
        crownPos.setX(i, x * ovalFactor);
        crownPos.setZ(i, z * ovalFactor);
      }
    }
    crownGeo.computeVertexNormals();
    const crownMesh = new THREE.Mesh(crownGeo, enamelMaterial);
    toothGroup.add(crownMesh);

    // 3. Occlusal Cap (smooth rounded cusp peaks)
    const cuspCrests = [
      { x: 0.42, y: 1.01, z: 0.42, r: 0.22 },
      { x: -0.42, y: 1.01, z: 0.42, r: 0.22 },
      { x: 0.42, y: 0.99, z: -0.42, r: 0.21 },
      { x: -0.42, y: 0.99, z: -0.42, r: 0.21 },
    ];
    cuspCrests.forEach((c) => {
      const g = new THREE.SphereGeometry(c.r, 24, 24);
      g.scale(1.0, 0.72, 1.0);
      const m = new THREE.Mesh(g, enamelMaterial);
      m.position.set(c.x, c.y, c.z);
      toothGroup.add(m);
    });

    // 4. Smooth bifurcated roots (Left Mesial & Right Distal roots)
    const buildSleekRoot = (directionX: number, curveTilt: number) => {
      const curve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(directionX * 0.22, -0.15, 0.0),
        new THREE.Vector3(directionX * 0.46, -0.55, curveTilt * 0.05),
        new THREE.Vector3(directionX * 0.52, -1.05, curveTilt * 0.12),
        new THREE.Vector3(directionX * 0.38, -1.55, curveTilt * 0.16),
        new THREE.Vector3(directionX * 0.24, -1.82, curveTilt * 0.19),
      ]);

      const rootGeo = new THREE.TubeGeometry(curve, 36, 0.22, 24, false);
      const rPos = rootGeo.attributes.position;
      for (let i = 0; i < rPos.count; i++) {
        const ry = rPos.getY(i);
        // Gracefully taper down to apex
        const progress = Math.max(0.08, (ry + 1.85) / 1.7);
        const taper = Math.pow(progress, 0.85);
        rPos.setX(i, rPos.getX(i) * taper);
        rPos.setZ(i, rPos.getZ(i) * taper);
      }
      rootGeo.computeVertexNormals();
      return new THREE.Mesh(rootGeo, enamelMaterial);
    };

    const leftRoot = buildSleekRoot(-1, -1);
    const rightRoot = buildSleekRoot(1, 1);
    toothGroup.add(leftRoot);
    toothGroup.add(rightRoot);

    // Root apex caps (smooth rounded tips)
    const apexGeo = new THREE.SphereGeometry(0.07, 16, 16);
    const leftApex = new THREE.Mesh(apexGeo, enamelMaterial);
    leftApex.position.set(-0.24, -1.82, -0.19);
    const rightApex = new THREE.Mesh(apexGeo, enamelMaterial);
    rightApex.position.set(0.24, -1.82, 0.19);
    toothGroup.add(leftApex);
    toothGroup.add(rightApex);

    // Tooth Centering & Overall Scale (compact & refined)
    toothGroup.position.set(0, 0.32, 0);
    toothGroup.scale.set(0.95, 0.95, 0.95);
    scene.add(toothGroup);

    // 5. 3D Royal Blue Floor Under-Shadow Disc
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 256;
    shadowCanvas.height = 256;
    const ctx = shadowCanvas.getContext('2d');
    if (ctx) {
      const grad = ctx.createRadialGradient(128, 128, 6, 128, 128, 120);
      grad.addColorStop(0, 'rgba(29, 78, 216, 0.95)');  // Deep royal blue #1d4ed8
      grad.addColorStop(0.3, 'rgba(37, 99, 235, 0.70)'); // Royal blue #2563eb
      grad.addColorStop(0.65, 'rgba(59, 130, 246, 0.30)'); // Vibrant sky blue
      grad.addColorStop(1, 'rgba(29, 78, 216, 0.0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 256, 256);
    }
    const shadowTexture = new THREE.CanvasTexture(shadowCanvas);
    const shadowGeo = new THREE.PlaneGeometry(2.6, 2.6);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTexture,
      transparent: true,
      depthWrite: false,
      opacity: 0.9,
    });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.set(0, -1.88, 0);
    scene.add(shadowMesh);

    // 6. Lighting for High-End Ceramic Studio Look
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
    scene.add(ambientLight);

    // Primary Royal Blue Key Light from upper-front-right
    const royalBlueKeyLight = new THREE.DirectionalLight(0x2563eb, 4.5);
    royalBlueKeyLight.position.set(3.5, 4.5, 3.5);
    scene.add(royalBlueKeyLight);

    // Crisp White Studio Rim Light from back-left
    const studioRimLight = new THREE.DirectionalLight(0xffffff, 5.0);
    studioRimLight.position.set(-4.0, 3.5, -3.0);
    scene.add(studioRimLight);

    // Under-Glow Point Light (Royal Blue accent from below shadow)
    const underGlowLight = new THREE.PointLight(0x1d4ed8, 3.0, 8);
    underGlowLight.position.set(0, -1.5, 1.2);
    scene.add(underGlowLight);

    // Top Specular Glint Light
    const topGlint = new THREE.PointLight(0x60a5fa, 2.0, 6);
    topGlint.position.set(0, 2.5, 1.5);
    scene.add(topGlint);

    // Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Idle smooth vertical floating bob
      const bobOffset = Math.sin(elapsedTime * 2.2) * 0.07;
      toothGroup.position.y = 0.38 + bobOffset;

      // Dynamic royal blue shadow pulse & scaling
      const shadowScale = 1.0 - bobOffset * 0.9;
      shadowMesh.scale.set(shadowScale, shadowScale, shadowScale);
      shadowMesh.rotation.z = -toothGroup.rotation.y * 0.5;

      // Tooth Rotation & Tilt
      if (isHoveredRef.current) {
        toothGroup.rotation.y += 0.04;
        toothGroup.rotation.x = Math.sin(elapsedTime * 3.5) * 0.12;
        shadowMat.opacity = 0.95;
      } else {
        toothGroup.rotation.y += 0.016;
        toothGroup.rotation.x = 0.12 + Math.sin(elapsedTime * 1.6) * 0.06; // slight forward tilt showcasing crown
        shadowMat.opacity = 0.82 + Math.sin(elapsedTime * 2.2) * 0.14;
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
      crownGeo.dispose();
      shadowGeo.dispose();
      shadowTexture.dispose();
      shadowMat.dispose();
      enamelMaterial.dispose();
      apexGeo.dispose();
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
