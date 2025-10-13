'use client';

import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber';
import { useRef, useState, useEffect } from 'react';
import * as THREE from 'three';
import WelcomeSection from './WelcomeSection';
import QuranVerse from './QuranVerse';
import WeddingEvent from './WeddingEvent';
import GroomName from './CoupleNames';
import CoupleNames from './CoupleNames';
import DigitalWallet from './DigitalWallet';
import RSVPSection from './RSVPSection';
import CommentsSection from './CommentsSection';
import ThankYouSection from './ThankYouSection';

function ScrollControls({ scrollY, scrollMax }: { scrollY: number; scrollMax: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const scrollProgress = scrollMax > 0 ? Math.min(scrollY / scrollMax, 1) : 0;
  const scrollPercent = scrollY / scrollMax * 100;

  useFrame(({ camera }) => {
    if (!groupRef.current) return;
    let valueMoveZ = -(scrollProgress * 8)
    if (scrollPercent <= 28) {
      camera.position.set(0, 0, valueMoveZ);
      camera.lookAt(0, 0, -8);
    }
    if (scrollPercent >= 28) {
      const moveSpeed = 0.05;
      let moveX = (scrollPercent - 28) * moveSpeed;
      let moveY = (scrollPercent - 28) * moveSpeed * 2;

      let limitX = 0.2;
      let limitY = 0.23;
      let limitZ = -2.45;

      if (scrollPercent > 38) {
        const transition = Math.min((scrollPercent - 38) * 0.2, 1);
        limitX = 0.175 - (transition * 0.3);
      }
      if (scrollPercent > 50) {
        limitX = (limitX + (scrollPercent - 50) * 0.05) <= 0.01 ? (limitX + (scrollPercent - 50) * 0.05) : 0.01;
        limitZ = (limitZ + (scrollPercent - 50) * 0.05) <= -2.1 ? (limitZ + (scrollPercent - 50) * 0.05) : -2.1;
      }

      moveX = Math.min(moveX, Math.abs(limitX));
      moveY = Math.min(moveY, limitY);
      valueMoveZ = Math.max(valueMoveZ, limitZ);

      camera.position.set(limitX > 0 ? -moveX : -limitX + (moveX * 0.5), moveY, valueMoveZ);
      camera.lookAt(camera.position.x, camera.position.y, -8);
    }

    // console.log(scrollProgress, camera.position);
  });

  return (
    <group ref={groupRef}>
      <OutsideGate x={0} y={0} z={-2.} />
      <OutsideGate x={0} y={0} z={-2} />
      <OutsideGate x={0} y={0} z={-1.6} />
      <OutsideGate x={0} y={0} z={-1.2} />
      <OutsideGate x={0} y={0} z={-0.8} />
      <OutsideGate x={0} y={0} z={-0.4} />
      <TableFlower x={0} y={-0.2} z={-1} />
      <TableFlower x={0} y={-0.2} z={-1.4} />
      <TableFlower x={0} y={-0.2} z={-1.8} />
      <RedCarpet startZ={-0.3} endZ={-3} />
      <StagePlatform x={0} y={-0.5} z={-3.5} width={3.5} height={0.1} depth={1.5} />
      <Couple x={0} y={0.03} z={-2.8} />
      <Sofa x={0} y={-0.05} z={-2.81} />
      <Stage x={0} y={0.4} z={-3.2} />
    </group>
  );
}

function RedCarpet({ startZ, endZ }: { startZ: number; endZ: number }) {
  const carpetLength = Math.abs(startZ - endZ);
  const centerZ = (startZ + endZ) / 2;
  const length = carpetLength * 1;

  return (
    <group position={[0, -0.6, 0]}>
      <mesh position={[0, 0, centerZ]} rotation={[0, 0, 0]}>
        <boxGeometry args={[0.4, 0.04, length]} />
        <meshStandardMaterial
          color="#ff0000"
          roughness={10}
        />
      </mesh>
    </group>
  );
}

function StagePlatform({ x, y, z, width, height, depth }: { x: number, y: number, z: number, width: number, height: number, depth: number }) {
  const stageMaterial = new THREE.MeshStandardMaterial({
    color: 0x8B5A2B,
    roughness: 0.5,
    metalness: 0.1,
  });

  return (
    <group position={[x, y, z]}>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[width, height, depth]} />
        <primitive object={stageMaterial} attach="material" />
      </mesh>

      {/* Top surface with different color for contrast */}
      <mesh position={[0, height / 2, 0]}>
        <boxGeometry args={[width + 0.2, 0.1, depth + 0.2]} />
        <meshStandardMaterial
          color="#A67C52"
          roughness={0.4}
          metalness={0.0}
        />
      </mesh>

      {/* Decorative borders */}
      <mesh position={[0, height / 2 - 0.05, 0]} rotation={[0, 0, 0]}>
        <boxGeometry args={[width + 0.2, 0.05, depth + 0.2]} />
        <meshStandardMaterial
          color="#5D4037"
          roughness={0.5}
          metalness={0.1}
        />
      </mesh>

      {/* Add some ambient light to brighten the platform */}
      <ambientLight intensity={0.7} />
      <pointLight position={[0, 2, 0]} intensity={1} distance={10} />
    </group>
  );
}

function Stage({ x, y, z }: { x: number, y: number, z: number }) {
  const texture = useLoader(THREE.TextureLoader, '/images/wedding/frame/vector-stage.png');

  const aspectRatio = texture.image ? texture.image.width / texture.image.height : 1;
  const width = 3;
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
function Sofa({ x, y, z }: { x: number, y: number, z: number }) {
  const texture = useLoader(THREE.TextureLoader, '/images/wedding/frame/sofa.png');

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

function Couple({ x, y, z }: { x: number, y: number, z: number }) {
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

function OutsideGate({ x, y, z }: { x: number, y: number, z: number }) {
  const texture = useLoader(THREE.TextureLoader, '/images/wedding/frame/outside-door.png');

  const aspectRatio = texture.image ? texture.image.width / texture.image.height : 1;
  const width = 2;
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

function TableFlower({ x, y, z }: { x: number, y: number, z: number }) {
  const texture = useLoader(THREE.TextureLoader, '/images/wedding/frame/table-flower.png');

  const aspectRatio = texture.image ? texture.image.width / texture.image.height : 1;
  const width = 0.3;
  const height = width / aspectRatio;
  const offset = 0.42;

  return (
    <group position={[x, -0.54, z]}>
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
  const [scrollYPercent, setScrollYPercent] = useState(0);
  const [scrollMax, setScrollMax] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
        const maxScroll = scrollHeight - clientHeight;
        const currentScroll = Math.max(0, Math.min(scrollTop, maxScroll));

        setScrollY(currentScroll);
        setScrollYPercent((currentScroll / maxScroll) * 100);
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
    <div ref={containerRef} className="w-full h-screen overflow-y-auto bg-white">
      <div className='relative z-1 h-[400vh] w-full'></div>
      <div className='h-full w-full relative z-1'>
        <div className='fixed top-2 left-2 bg-black bg-opacity-50 text-white px-4 py-2 rounded-lg pointer-events-none'>
          Scroll Position: {`${scrollYPercent.toFixed(0)}%/${scrollY.toFixed(0)}`}
        </div>
      </div>
      <div>
        {/* <WelcomeSection scrollY={Number(scrollYPercent.toFixed(0))} start={0} end={5} />
        <QuranVerse scrollY={Number(scrollYPercent.toFixed(0))} start={5} end={15} />
        <WeddingEvent scrollY={Number(scrollYPercent.toFixed(0))} start={15} end={25} />
        <CoupleNames
          scrollY={Number(scrollYPercent.toFixed(0))} 
          start={30} 
          end={40}
          name="Farid Satria"
          parents="Putra dari Bapak Ahmad & Ibu Siti"
          position={{
            top: 'top-20 xs:top-21 md:top-22 lg:top-23',
            left: '-left-5 xs:left-0 sm:left-3 md:left-5 lg:left-9'
          }}
          size={{
            width: 'w-[300px] xs:w-[330px] sm:w-[450px] md:w-[500px] lg:w-[600px]',
            height: 'h-[200px] xs:h-[220px] sm:h-[250px] md:h-[250px] lg:h-[350px]'
          }}
          textSize={{
            name: 'text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl',
            parents: 'text-xs xs:text-xs sm:text-sm md:text-base lg:text-base'
          }}
        />
         <CoupleNames
          scrollY={Number(scrollYPercent.toFixed(0))} 
          start={43} 
          end={50}
          name="Asri Dilla Wahyuni"
          parents="Putra dari Bapak Ahmad & Ibu Siti"
          position={{
            top: 'top-28 xs:top-29 md:top-30 lg:top-31',
            left: '-right-10 xs:-right-4 sm:right-3 md:right-5 lg:right-9'
          }}
          size={{
            width: 'w-[350px] xs:w-[330px] sm:w-[450px] md:w-[500px] lg:w-[600px]',
            height: 'h-[200px] xs:h-[220px] sm:h-[250px] md:h-[250px] lg:h-[350px]'
          }}
          textSize={{
            name: 'text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl',
            parents: 'text-xs xs:text-xs sm:text-sm md:text-base lg:text-base'
          }}
        /> */}
        {/* <DigitalWallet scrollY={Number(scrollYPercent.toFixed(0))} start={60} end={70} /> */}
        {/* <RSVPSection scrollY={Number(scrollYPercent.toFixed(0))} start={0} end={10} /> */}
        <CommentsSection 
            scrollY={Number(scrollYPercent.toFixed(0))} 
            start={5} 
            end={15}
            stay={10} // The section will stay fully visible between 10% and 15% scroll
        />
        <ThankYouSection 
            scrollY={Number(scrollYPercent.toFixed(0))} 
            start={15} 
            end={25}
        />
      </div>

      <div className="fixed inset-0">
        <Canvas camera={{ position: [0, 0, 0], fov: 80 }}>
          <color attach="background" args={['#fff']} />
          <ambientLight args={[0xffffff, 0.5]} />
          <directionalLight
            args={[0xffffff, 1]}
            position={[0, 0, 0]}
            castShadow
          />
          <pointLight args={[0xffffff, 0.5]} position={[0, 0, 0]} />

          <ScrollControls scrollY={scrollY} scrollMax={scrollMax} />
          {/* <gridHelper args={[100, 100]} position={[0, -0.2, 0]} /> */}
        </Canvas>
      </div>
    </div>

  );
}
