'use client';

import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber';
import { useRef, useState, useEffect } from 'react';
import * as THREE from 'three';

function ScrollControls({ scrollY, scrollMax }: { scrollY: number; scrollMax: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const scrollProgress = scrollMax > 0 ? Math.min(scrollY / scrollMax, 1) : 0;
  
  useFrame(({ camera }) => {
    if (!groupRef.current) return;
    
    camera.position.set(0, 0, -(scrollProgress * 2));
    camera.lookAt(0, 0, -5);
    // console.log(scrollProgress, camera.position);
  });

  return (
    <group ref={groupRef}>
      <RedCarpet startZ={-0.4} endZ={-5} />
      <OutsideGate x={0} y={0} z={-2.2} />
      <OutsideGate x={0} y={0} z={-2} />
      <OutsideGate x={0} y={0} z={-1.6} />
      <OutsideGate x={0} y={0} z={-1.2} />
      <OutsideGate x={0} y={0} z={-0.8} />
      <OutsideGate x={0} y={0} z={-0.4} />
      <TableFlower x={0} y={-0.2} z={-0.6} />
      <TableFlower x={0} y={-0.2} z={-1} />
      <TableFlower x={0} y={-0.2} z={-1.4} />
      <TableFlower x={0} y={-0.2} z={-1.8} />
      <Couple x={0} y={0} z={-2.8} />
      <Sofa x={0} y={-0.05} z={-2.81} />
      <Stage x={0} y={0.8} z={-3.5} />
    </group>
  );
}

function RedCarpet({ startZ, endZ }: { startZ: number; endZ: number }) {
  const carpetLength = Math.abs(startZ - endZ);
  const centerZ = (startZ + endZ) / 2;
  const length = carpetLength * 1;
  
  return (
    <group position={[0, -0.8, 0]}>
      {/* Main carpet */}
      <mesh position={[0, -0.02, centerZ]} rotation={[0, 0, 0]}>
        <boxGeometry args={[0.5, 0.01, length]} />
        <meshStandardMaterial 
          color="#ff0000"
          roughness={0.7}
          metalness={0.1}
        />
      </mesh>
      
      {/* Left trim */}
      <mesh position={[-0.75, 0.02, centerZ]} rotation={[0, 0, 0]}>
        <boxGeometry args={[0.05, 0.03, length]} />
        <meshStandardMaterial 
          color="#FFD700" 
          metalness={0.8} 
          roughness={0.2} 
        />
      </mesh>
      
      {/* Right trim */}
      <mesh position={[0.75, 0.02, centerZ]} rotation={[0, 0, 0]}>
        <boxGeometry args={[0.05, 0.03, length]} />
        <meshStandardMaterial 
          color="#FFD700" 
          metalness={0.8} 
          roughness={0.2} 
        />
      </mesh>
    </group>
  );
}

function Stage({x, y, z}: {x: number, y: number, z: number}) {
  const texture = useLoader(THREE.TextureLoader, '/images/wedding/frame/vector-stage.png');
  
  const aspectRatio = texture.image ? texture.image.width / texture.image.height : 1;
  const width = 5;
  const height = width / aspectRatio;
  
  return (
    <group position={[x, y, z]}>
      <mesh position={[0, 0, 0]} rotation={[0, 0, 0]}>
        <planeGeometry args={[width, height, 1]} />
        <meshBasicMaterial 
          map={texture} 
          transparent={true}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}
function Sofa({x, y, z}: {x: number, y: number, z: number}) {
  const texture = useLoader(THREE.TextureLoader, '/images/wedding/frame/sofa.png');
  
  const aspectRatio = texture.image ? texture.image.width / texture.image.height : 1;
  const width = 0.9;
  const height = width / aspectRatio;
  
  return (
    <group position={[x, y, z]}>
      <mesh position={[0, 0, 0]} rotation={[0, 0, 0]}>
        <planeGeometry args={[width, height, 1]} />
        <meshBasicMaterial 
          map={texture} 
          transparent={true}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

function Couple({x, y, z}: {x: number, y: number, z: number}) {
  const texture = useLoader(THREE.TextureLoader, '/images/wedding/couple_image.png');
  
  const aspectRatio = texture.image ? texture.image.width / texture.image.height : 1;
  const width = 0.7;
  const height = width / aspectRatio;
  
  return (
    <group position={[x, y, z]}>
      <mesh position={[0, 0, 0]} rotation={[0, 0, 0]}>
        <planeGeometry args={[width, height, 1]} />
        <meshBasicMaterial 
          map={texture} 
          transparent={true}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

function OutsideGate({x, y, z}: {x: number, y: number, z: number}) {
  const texture = useLoader(THREE.TextureLoader, '/images/wedding/frame/outside-door.png');
  
  const aspectRatio = texture.image ? texture.image.width / texture.image.height : 1;
  const width = 1;
  const height = width / aspectRatio;
  
  return (
    <mesh position={[x, y, z]} rotation={[0, 0, 0]}>
      <planeGeometry args={[width, height, 1]} />
      <meshBasicMaterial map={texture} 
        transparent={true}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

function TableFlower({x, y, z}: {x: number, y: number, z: number}) {
  const texture = useLoader(THREE.TextureLoader, '/images/wedding/frame/table-flower.png');
  
  const aspectRatio = texture.image ? texture.image.width / texture.image.height : 1;
  const width = 0.2;
  const height = width / aspectRatio;
  const offset = 0.25; 
  
  return (
    <group position={[x, y, z]}>
      <mesh position={[offset, 0, 0]} rotation={[0, 0, 0]}>
        <planeGeometry args={[width, height, 1]} />
        <meshBasicMaterial 
          map={texture} 
          transparent={true}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh position={[-offset, 0, 0]} rotation={[0, 0, 0]} scale={[-1, 1, 1]}>
        <planeGeometry args={[width, height, 1]} />
        <meshBasicMaterial 
          map={texture} 
          transparent={true}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
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
        
        setScrollY(currentScroll);
        setScrollMax(maxScroll);
      }
    };

    const container = containerRef.current;
    if (container) {
      window.addEventListener('scroll', handleScroll, { passive: true });
      container.addEventListener('scroll', handleScroll, { passive: true });
      handleScroll();
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
    <div ref={containerRef} className="w-full h-screen overflow-y-auto bg-gray-900">
      <div className='h-[1000px] w-full relative z-1'>
        <div className='fixed top-2 left-2 bg-black bg-opacity-50 text-white px-4 py-2 rounded-lg pointer-events-none'>
          Scroll Position: {scrollY.toFixed(0)} / {scrollMax.toFixed(0)}
        </div>
      </div>

      <div className="fixed inset-0">
        <Canvas camera={{ position: [0, 0, 0], fov: 50 }}>
          <color attach="background" args={['#111']} />
          {/* Lights */}
          <ambientLight args={[0xffffff, 0.5]} />
          <directionalLight
            args={[0xffffff, 1]}
            position={[0, 0, 0]}
            castShadow
          />
          <pointLight args={[0xffffff, 0.5]} position={[0, 0, 0]} />
          
          <ScrollControls scrollY={scrollY} scrollMax={scrollMax} />
          <gridHelper args={[100, 100]} position={[0, -1, 0]} />
        </Canvas>
      </div>
    </div>
  
  );
}
