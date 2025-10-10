'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useState, useEffect } from 'react';
import * as THREE from 'three';

// Komponen untuk animasi scroll
function ScrollControls({ scrollY, scrollMax }: { scrollY: number; scrollMax: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const cameraRef = useRef<THREE.Camera>(null);
  
  // Nilai interpolasi dari 0 sampai 1 berdasarkan scroll
  const scrollProgress = scrollMax > 0 ? Math.min(scrollY / scrollMax, 1) : 0;
  
  // Debug nilai scroll
  console.log('ScrollControls - Progress:', scrollProgress.toFixed(2), 'Y:', scrollY, 'Max:', scrollMax);
  
  useFrame(({ camera }) => {
    if (!groupRef.current) return;
    
    // Atur rotasi berdasarkan scroll
    const rotationY = scrollProgress * Math.PI * 2; // Satu putaran penuh
    const rotationX = scrollProgress * Math.PI * 0.5; // Miring ke atas
    
    // Atur posisi kamera berdasarkan scroll
    const cameraDistance = 3 + Math.sin(scrollProgress * Math.PI) * 2;
    const cameraHeight = Math.sin(scrollProgress * Math.PI * 0.5) * 2;
    
    // Terapkan transformasi
    groupRef.current.rotation.y = rotationY;
    groupRef.current.rotation.x = rotationX;
    
    // Gerakkan kamera secara halus
    camera.position.x = Math.sin(scrollProgress * Math.PI * 2) * cameraDistance;
    camera.position.z = Math.cos(scrollProgress * Math.PI * 2) * cameraDistance;
    camera.position.y = cameraHeight;
    camera.lookAt(0, 0, 0);
  });

  return (
    <group ref={groupRef}>
      <Box />
    </group>
  );
}

function Box() {
  const boxRef = useRef<THREE.Mesh>(null);
  
  // Animasi berputar pelan
  useFrame(() => {
    if (boxRef.current) {
      boxRef.current.rotation.y += 0.005;
    }
  });

  return (
    <mesh ref={boxRef} castShadow>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial 
        color="hotpink" 
        roughness={0.5}
        metalness={0.5}
      />
    </mesh>
  );
}

export default function CubeScene() {
  const [scrollY, setScrollY] = useState(0);
  const [scrollMax, setScrollMax] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
        const maxScroll = scrollHeight - clientHeight;
        const currentScroll = Math.max(0, Math.min(scrollTop, maxScroll));
        const scrollProgress = maxScroll > 0 ? currentScroll / maxScroll : 0;
        
        console.log('Scroll Info:', {
          scrollTop: currentScroll,
          scrollMax: maxScroll,
          scrollProgress: scrollProgress.toFixed(2)
        });
        
        setScrollY(currentScroll);
        setScrollMax(maxScroll);
      }
    };

    const container = containerRef.current;
    if (container) {
      // Tambahkan event listener ke window untuk memastikan scroll terdeteksi
      window.addEventListener('scroll', handleScroll, { passive: true });
      // Juga tambahkan ke container untuk berjaga-jaga
      container.addEventListener('scroll', handleScroll, { passive: true });
      // Inisialisasi nilai awal
      handleScroll();
      
      // Trigger resize untuk memastikan ukuran container benar
      window.dispatchEvent(new Event('resize'));
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="w-full h-screen overflow-y-auto bg-gray-900"
      style={{ 
        scrollBehavior: 'smooth',
        position: 'relative',
        zIndex: 1
      }}
    >
      {/* Elemen kosong untuk membuat scroll area */}
      <div style={{ 
        height: '200vh', 
        width: '100%',
        position: 'relative',
        zIndex: 1
      }}>
        <div style={{
          position: 'fixed',
          top: '20px',
          left: '20px',
          background: 'rgba(0,0,0,0.7)',
          color: 'white',
          padding: '10px',
          borderRadius: '5px',
          zIndex: 1000,
          fontSize: '14px',
          fontFamily: 'monospace'
        }}>
          Scroll Position: {scrollY.toFixed(0)} / {scrollMax.toFixed(0)}
        </div>
      </div>
      
      {/* Fixed canvas yang menutupi layar */}
      <div className="fixed inset-0">
        <Canvas
          camera={{ position: [0, 0, 5], fov: 50 }}
          gl={{ antialias: true, alpha: true }}
        >
          <color attach="background" args={['#111']} />
          <ambientLight intensity={0.8} color="#ffffff" />
          <directionalLight 
            position={[5, 5, 5]} 
            intensity={1} 
            color="#ffffff"
            castShadow
          />
          <directionalLight 
            position={[-5, 5, -5]} 
            intensity={0.5} 
            color="#ff9999"
          />
          
          <ScrollControls scrollY={scrollY} scrollMax={scrollMax} />
          
          {/* Grid helper untuk referensi visual */}
          <gridHelper args={[10, 10]} position={[0, -1, 0]} />
        </Canvas>
      </div>
      
      {/* Overlay teks petunjuk */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-4 py-2 rounded-lg pointer-events-none">
        Gulir untuk memutar dan menggerakkan kamera
      </div>
    </div>
  
  );
}
