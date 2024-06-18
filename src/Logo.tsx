import * as THREE from 'three';
import { useRef, useEffect } from 'react';
import { useLoader } from '@react-three/fiber';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';

const Logo = () => {
  const fontRef = useRef<THREE.Group>(null);
  const font = useLoader(FontLoader, '/path/to/font.json');

  useEffect(() => {
    if (!fontRef.current) return;

    const logoGeometry = new THREE.TextGeometry('ROBS', {
      font: font,
      size: 0.5,
      height: 0.2,
      curveSegments: 12,
    });

    const letterMaterials = [
      new THREE.MeshBasicMaterial({ color: 0xff0000 }), // R
      new THREE.MeshBasicMaterial({ color: 0x00ff00 }), // O
      new THREE.MeshBasicMaterial({ color: 0x0000ff }), // B
      new THREE.MeshBasicMaterial({ color: 0xffff00 }), // S
    ];

    logoGeometry.center();

    const mesh = new THREE.Mesh(logoGeometry, letterMaterials);
    fontRef.current.add(mesh);

    const animateLetters = () => {
      requestAnimationFrame(animateLetters);
      mesh.rotation.y += 0.01; // Rotate the entire mesh
    };

    animateLetters();
  }, [font]);

  return <group ref={fontRef} />;
};

export default Logo;
