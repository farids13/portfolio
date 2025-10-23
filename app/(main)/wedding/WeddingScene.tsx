'use client';

import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { useRef, useState, useEffect } from 'react';
import * as THREE from 'three';

import CommentForm from './_components/CommentForm';
import CommentsSection from './_components/CommentsSection';
import CoupleNames from './_components/CoupleNames';
import DigitalWallet from './_components/DigitalWallet';
import EventInformationSection from './_components/EventInformationSection';
import MusicPlayer from './_components/MusicPlayer';
import QuranSection from './_components/QuranSection';
import RSVPSection from './_components/RSVPSection';
import SaveTheDateSection from './_components/SaveTheDateSection';
import ThankYouSection from './_components/ThankYouSection';
import WelcomeSection from './_components/WelcomeSection';

function ScrollControls({ scrollY, scrollMax }: { scrollY: number; scrollMax: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const scrollProgress = scrollMax > 0 ? Math.min(scrollY / scrollMax, 1) : 0;
  const scrollPercent = scrollMax > 0 ? (scrollY / scrollMax * 100) : 0;


  useFrame(({ camera }) => {
    if (!groupRef.current) { return; }
    let valueMoveZ = -(scrollProgress * 8)
    if (scrollPercent <= 28 && !isNaN(scrollPercent)) {
      camera.position.set(0, 0, valueMoveZ);
      camera.lookAt(0, 0, -8);
    }
    if (scrollPercent >= 28 && !isNaN(scrollPercent)) {
      const moveSpeed = 0.05;
      let moveX = (scrollPercent - 28) * moveSpeed;
      let moveY = (scrollPercent - 28) * moveSpeed * 2;

      let limitX = 0.2;
      const limitY = 0.23;
      let limitZ = -2.45;

      if (scrollPercent > 38 && !isNaN(scrollPercent)) {
        const transition = Math.min((scrollPercent - 38) * 0.2, 1);
        limitX = 0.175 - (transition * 0.3);
      }
      if (scrollPercent > 50 && !isNaN(scrollPercent)) {
        limitX = (limitX + (scrollPercent - 50) * 0.05) <= 0.01 ? (limitX + (scrollPercent - 50) * 0.05) : 0.01;
        limitZ = (limitZ + (scrollPercent - 50) * 0.05) <= -2.1 ? (limitZ + (scrollPercent - 50) * 0.05) : -2.1;
      }

      moveX = Math.min(moveX, Math.abs(limitX));
      moveY = Math.min(moveY, limitY);
      valueMoveZ = Math.max(valueMoveZ, limitZ);

      camera.position.set(limitX > 0 ? -moveX : -limitX + (moveX * 0.5), moveY, valueMoveZ);
      camera.lookAt(camera.position.x, camera.position.y, -8);
    }
  });

  return (
    <group ref={groupRef}>
      <OutsideGate x={0} y={0} z={-2} />
      <OutsideGate x={0} y={0} z={-1.6} />
      <OutsideGate x={0} y={0} z={-1.2} />
      <OutsideGate x={0} y={0} z={-0.8} />
      <OutsideGate x={0} y={0} z={-0.4} />
      <TableFlower x={0} y={-0.54} z={-1.4} />
      <TableFlower x={0} y={-0.54} z={-1.8} />
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

      <mesh position={[0, height / 2, 0]}>
        <boxGeometry args={[width + 0.2, 0.1, depth + 0.2]} />
        <meshStandardMaterial
          color="#A67C52"
          roughness={0.4}
          metalness={0.0}
        />
      </mesh>

      <mesh position={[0, height / 2 - 0.05, 0]} rotation={[0, 0, 0]}>
        <boxGeometry args={[width + 0.2, 0.05, depth + 0.2]} />
        <meshStandardMaterial
          color="#5D4037"
          roughness={0.5}
          metalness={0.1}
        />
      </mesh>

      <ambientLight intensity={0.7} />
      <pointLight position={[0, 2, 0]} intensity={1} distance={10} />
    </group>
  );
}

function Stage({ x, y, z }: { x: number, y: number, z: number }) {
  const texture = useLoader(THREE.TextureLoader, '/images/wedding/frame/vector-stage.webp');

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
  const texture = useLoader(THREE.TextureLoader, '/images/wedding/frame/sofa.webp');

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
  const texture = useLoader(THREE.TextureLoader, '/images/wedding/couple_image.webp');

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
  const texture = useLoader(THREE.TextureLoader, '/images/wedding/frame/outside-door.webp');

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
  const texture = useLoader(THREE.TextureLoader, '/images/wedding/frame/table-flower.webp');

  const aspectRatio = texture.image ? texture.image.width / texture.image.height : 1;
  const width = 0.3;
  const height = width / aspectRatio;
  const offset = 0.42;

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

interface WeddingSceneProps {
  playMusicNow?: boolean;
  onMusicStarted?: () => void;
}

export default function WeddingScene({ playMusicNow = false, onMusicStarted }: WeddingSceneProps) {
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
        if (maxScroll > 0) {
          setScrollYPercent((currentScroll / maxScroll) * 100);
        } else {
          setScrollYPercent(0);
        }
        setScrollMax(maxScroll);
      }
    };

    const container = containerRef.current;
    if (container) {
      handleScroll();
      container.addEventListener('scroll', handleScroll, { passive: true });
    }

    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  return (
    <div ref={containerRef} className={`w-full h-screen overflow-y-auto`} style={{ WebkitOverflowScrolling: 'touch' }}>
      <MusicPlayer playMusicNow={playMusicNow} onMusicStarted={onMusicStarted} />
      <div className='relative z-1 h-[200vh] w-full'></div>
      <div className='h-full w-full relative z-1'>
        <div
          className='fixed bottom-0 left-0 bg-amber-400/80 p-1 rounded-r-lg pointer-events-none h-1'
          style={{ width: `${scrollYPercent}%` }}
        />
      </div>
      <div>
        {scrollYPercent >= 0 && scrollYPercent <= 5 && (
          <WelcomeSection scrollY={Number(scrollYPercent.toFixed(0))} start={0} end={5} />
        )}
        {scrollYPercent >= 5 && scrollYPercent <= 15 && (
          <QuranSection scrollY={Number(scrollYPercent.toFixed(0))} start={5} end={15} />
        )}
        {scrollYPercent >= 15 && scrollYPercent <= 22 && (
          <SaveTheDateSection scrollY={Number(scrollYPercent.toFixed(0))} start={15} end={22} />
        )}
        {scrollYPercent >= 22 && scrollYPercent <= 30 && (
          <EventInformationSection scrollY={Number(scrollYPercent.toFixed(0))} start={22} end={30} />
        )}
        {scrollYPercent >= 31 && scrollYPercent <= 41 && (
          <CoupleNames
            scrollY={Number(scrollYPercent.toFixed(0))}
            start={32}
            end={40}
            name="Farid Satria"
            parents="Putra dari "
            dad="Bapak Muhammad Sholeh"
            mom="Ibu Alm. Chuzaimah"
            position={{
              top: 'top-1/6',
              left: '-left-18 xs:-left-15 sm:-left-5 md:-left-2 lg:left-9'
            }}
            size={{
              width: 'w-[350px] xs:w-[400px] sm:w-[450px] md:w-[500px] lg:w-[600px]',
              height: 'h-[200px] xs:h-[220px] sm:h-[250px] md:h-[250px] lg:h-[350px]'
            }}
            textSize={{
              name: 'text-4xl xs:text-5xl sm:text-5xl md:text-6xl ',
              parents: 'max-w-[70vw] ml-2 text-[9px] xs:text-[12px] sm:text-sm md:text-md lg:text-lg'
            }}
          />
        )}
        {scrollYPercent >= 42 && scrollYPercent <= 51 && (
          <CoupleNames
            scrollY={Number(scrollYPercent.toFixed(0))}
            start={43}
            end={50}
            name="Asri Dilla Wahyuni"
            parents="Putri dari "
            dad="Bapak Mariyono"
            mom="Ibu Masfuah"
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
          />
        )}
        {scrollYPercent >= 54 && scrollYPercent <= 71 && (
          <DigitalWallet scrollY={Number(scrollYPercent.toFixed(0))} start={57} end={70} />
        )}
        {scrollYPercent >= 69 && scrollYPercent <= 80 && (
          <RSVPSection scrollY={Number(scrollYPercent.toFixed(0))} start={70} end={80} />
        )}
        {scrollYPercent >= 79 && scrollYPercent <= 88 && (
          <CommentForm
            scrollY={Number(scrollYPercent.toFixed(0))}
            start={80}
            end={88}
          />
        )}
        {scrollYPercent >= 88 && scrollYPercent <= 96 && (
          <CommentsSection
            scrollY={Number(scrollYPercent.toFixed(0))}
            start={88}
            end={95}
          />
        )}
        {scrollYPercent >= 94 && scrollYPercent <= 101 && (
          <ThankYouSection
            scrollY={Number(scrollYPercent.toFixed(0))}
            start={95}
          />
        )}
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
