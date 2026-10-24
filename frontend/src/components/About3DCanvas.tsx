import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface About3DCanvasProps {
  className?: string;
}

export const About3DCanvas: React.FC<About3DCanvasProps> = ({ className = '' }) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // 1. Scene Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      mount.clientWidth / mount.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 7.5);
    camera.lookAt(0, 0, 0);

    // 2. High Performance WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.domElement.style.display = 'block';
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    mount.appendChild(renderer.domElement);

    // 3. Central Group (Exactly at origin 0, 0, 0 - Center & Middle)
    const coreGroup = new THREE.Group();
    coreGroup.position.set(0, 0, 0);
    scene.add(coreGroup);

    // ── Compact Geometry: ~50% Smaller Size ──

    // A. Central Icosahedron Crystal Core (compact radius: 0.9)
    const coreGeometry = new THREE.IcosahedronGeometry(0.9, 0);
    const coreMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x5E5BFF,
      emissive: 0x3b1ebd,
      emissiveIntensity: 0.18,
      roughness: 0.2,
      metalness: 0.8,
      clearcoat: 1.0,
      clearcoatRoughness: 0.15,
      wireframe: false,
      transparent: true,
      opacity: 0.42,
    });
    const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
    coreGroup.add(coreMesh);

    // B. Wireframe Cage with glow (compact radius: 1.15)
    const wireframeGeo = new THREE.WireframeGeometry(new THREE.IcosahedronGeometry(1.15, 1));
    const wireframeMat = new THREE.LineBasicMaterial({
      color: 0xA78BFA,
      transparent: true,
      opacity: 0.5,
      linewidth: 1,
    });
    const wireframeMesh = new THREE.LineSegments(wireframeGeo, wireframeMat);
    coreGroup.add(wireframeMesh);

    // C. Orbital Ring 1 (compact radius: 1.55)
    const ring1Geo = new THREE.TorusGeometry(1.55, 0.018, 16, 100);
    const ring1Mat = new THREE.MeshBasicMaterial({
      color: 0x6366F1,
      transparent: true,
      opacity: 0.65,
    });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.rotation.x = Math.PI / 3;
    coreGroup.add(ring1);

    // D. Orbital Ring 2 (Counter-axis, compact radius: 1.8)
    const ring2Geo = new THREE.TorusGeometry(1.8, 0.015, 16, 100);
    const ring2Mat = new THREE.MeshBasicMaterial({
      color: 0x06B6D4,
      transparent: true,
      opacity: 0.55,
    });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.y = Math.PI / 4;
    ring2.rotation.x = -Math.PI / 5;
    coreGroup.add(ring2);

    // E. Compact Surrounding Particle Constellation (compact radius 1.4 - 2.5)
    const particleCount = 100;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const radius = 1.35 + Math.random() * 1.3;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      particlePositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      particlePositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      particlePositions[i * 3 + 2] = radius * Math.cos(phi);
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xC084FC,
      size: 0.045,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    coreGroup.add(particles);

    // 4. Balanced Ambient & Point Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x5E5BFF, 3.5, 12);
    pointLight1.position.set(3, 2, 3);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xA855F7, 2.5, 12);
    pointLight2.position.set(-3, -2, 2.5);
    scene.add(pointLight2);

    const pointLight3 = new THREE.PointLight(0x06B6D4, 2, 10);
    pointLight3.position.set(0, 3, -2.5);
    scene.add(pointLight3);

    // 5. Mouse Parallax (Window Normalized, Always Returns to Exact Center)
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse between -0.5 and +0.5 relative to window center
      const normX = e.clientX / window.innerWidth - 0.5;
      const normY = e.clientY / window.innerHeight - 0.5;
      targetX = normX * 0.5;
      targetY = normY * 0.5;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // 6. Responsive Resize Listener
    const handleResize = () => {
      if (!mount) return;
      const width = mount.clientWidth;
      const height = mount.clientHeight;
      if (width === 0 || height === 0) return;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // 7. Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth camera/core lerp to mouse
      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;

      coreGroup.rotation.y = elapsedTime * 0.22 + mouseX * 0.7;
      coreGroup.rotation.x = Math.sin(elapsedTime * 0.18) * 0.1 + mouseY * 0.7;

      // Independent sub-mesh rotations
      coreMesh.rotation.y += 0.004;
      coreMesh.rotation.x += 0.002;
      wireframeMesh.rotation.y -= 0.0025;
      wireframeMesh.rotation.z += 0.0015;
      ring1.rotation.z = elapsedTime * 0.35;
      ring2.rotation.z = -elapsedTime * 0.28;
      particles.rotation.y = elapsedTime * 0.06;

      // Subtle, tight vertical float (remains tightly centered)
      coreGroup.position.y = Math.sin(elapsedTime * 0.8) * 0.06;

      renderer.render(scene, camera);
    };

    animate();

    // Clean up
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
      coreGeometry.dispose();
      coreMaterial.dispose();
      wireframeGeo.dispose();
      wireframeMat.dispose();
      ring1Geo.dispose();
      ring1Mat.dispose();
      ring2Geo.dispose();
      ring2Mat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className={`relative w-full h-full pointer-events-none select-none ${className}`}
    />
  );
};
