import './App.css'
import React, { useRef, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, PositionalAudio } from '@react-three/drei'
import * as THREE from 'three'
import groundTexture from './assets/ground_texture.jpg'
import wallTexture from './assets/wall_texture.jpg'
import doorTexture from './assets/door_texture.jpg'
import graveTexture from './assets/grave_texture.jpeg'

function App() {
  const WALL_HEIGHT = 4
  const ROOF_HEIGHT = 1
  const textureLoader = new THREE.TextureLoader();

  const MyAudioComponent = () => {
    const audioRef = useRef(null);
    const [audioContext, setAudioContext] = useState(null);
  
    useEffect(() => {
      const handleUserGesture = () => {
        if (audioContext && audioRef.current) {
          audioContext.resume().then(() => {
            audioRef.current.play();
          });
        } else {
          const newAudioContext = new (window.AudioContext || window.webkitAudioContext)();
          setAudioContext(newAudioContext);
          audioRef.current.context = newAudioContext;
          newAudioContext.resume().then(() => {
            audioRef.current.play();
          });
        }
        window.removeEventListener('click', handleUserGesture);
      };
  
      window.addEventListener('click', handleUserGesture);
  
      return () => {
        window.removeEventListener('click', handleUserGesture);
      };
    }, [audioContext]);
  
    return (
      <Canvas>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <PositionalAudio
          ref={audioRef}
          url="src/assets/haunted-house.mp3"
          distance={3}
          loop
        />
      </Canvas>
    );
  };
  

  const Floor = () => {
    return (
      <mesh rotation={[-Math.PI * 0.5, 0, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color={'#95AC78'} map={textureLoader.load(groundTexture)} />
      </mesh>
    )
  }

  const Walls = () => {
    return (
      <mesh position={[0, WALL_HEIGHT / 2, 0]} castShadow>
        <boxGeometry args={[WALL_HEIGHT, WALL_HEIGHT, WALL_HEIGHT]} />
        <meshStandardMaterial color={'#ffffff'}  map={textureLoader.load(wallTexture)}/>
      </mesh>
    )
  }

  const Roof = () => {
    return (
      <mesh position={[0, WALL_HEIGHT + ROOF_HEIGHT / 2, 0]} rotation={[0, -Math.PI * 0.25, 0]} castShadow>
        <coneGeometry args={[3.5, ROOF_HEIGHT, 4]} />
        <meshStandardMaterial color={'#ff0000'}  map ={textureLoader.load(doorTexture)}/>
      </mesh>
    )
  }

  const Door = () => {
    return (
      <mesh position={[0, 1.24, WALL_HEIGHT / 2 + 0.002]} castShadow>
        <planeGeometry args={[2, 2.5, 100, 100]} />
        <meshStandardMaterial color={'#ff0000'} map={textureLoader.load(doorTexture)} />
      </mesh>
    )
  }

  
  const DoorLight = () => {
    return (
      <pointLight
        position={[0, 1.5, 3.4]}
        color={'#ff7d46'}
        intensity={3.7}
        distance={19}
        castShadow
        shadow-mapSize-width={256}
        shadow-mapSize-height={256}
        shadow-camera-far={7}
      />
    )
  }

  const SpookyTree = (props) => {
  return (
    <mesh {...props} castShadow>
      <cylinderGeometry args={[0.2, 0.5, 5, 8]} />
      <meshStandardMaterial color={'#4b3f28'} />
      {/* Add branches */}
      <mesh position={[0, 2.5, 0]} castShadow>
        <cylinderGeometry args={[0.05, 0.1, 2, 8]} />
        <meshStandardMaterial color={'#4b3f28'} />
      </mesh>
    </mesh>
  );
};


const ColorfulLight = () => {
  const lightRef = useRef();
  const colors = ['#ff0000', '#00ff00', '#0000ff', '#ff00ff', '#00ffff', '#ffff00']; // Array of colors
  let colorIndex = 0;
  let lastChangeTime = 0;

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();
    const speed = 0.8; // Adjust speed for light movement
    const radius = 4; // Adjust radius of light movement

    // Update position
    lightRef.current.position.x = Math.cos(elapsedTime * speed) * radius;
    lightRef.current.position.z = Math.sin(elapsedTime * speed) * radius;
    lightRef.current.position.y = 1.5 + Math.sin(elapsedTime * speed * 2); // Up and down motion

    // Change color every second
    if (elapsedTime - lastChangeTime > 1) {
      lastChangeTime = elapsedTime;
      colorIndex = (colorIndex + 1) % colors.length;
      lightRef.current.color = new THREE.Color(colors[colorIndex]);
    }
  });

  return (
    <pointLight
      ref={lightRef}
      intensity={3}
      distance={15}
      castShadow
      shadow-mapSize-width={256}
      shadow-mapSize-height={256}
      shadow-camera-far={4}
    />
  );
};

const MovingShadow = () => {
  const shadowRef = useRef();
  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();
    shadowRef.current.position.x = Math.sin(elapsedTime * 0.5) * 3.7;
    shadowRef.current.position.z = Math.cos(elapsedTime * 0.5) * 3.6;
  });
  return (
    <mesh ref={shadowRef} position={[0, 0, 0]} castShadow>
      <boxGeometry args={[1, 3, 0.01]} />
      <meshStandardMaterial color={'#000000'} opacity={0.4} transparent/>
    </mesh>
  );
};

const Bat = (props) => {
  const batRef = useRef();
  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();
    const speedFactor = 0.3;
    batRef.current.position.x = Math.sin(elapsedTime * speedFactor + props.offset) * 9;
    batRef.current.position.z = Math.cos(elapsedTime * speedFactor + props.offset) * 5;
    batRef.current.position.y = Math.abs(Math.sin(elapsedTime * 2 * speedFactor)) * 2 + 3;
  });
  return (
    <mesh ref={batRef} {...props} castShadow>
      <boxGeometry args={[0.15, 0.03, 0.0001]} />
      <meshStandardMaterial color={'#000000'} opacity={0.6} transparent/>
    </mesh>
  );
};
  const Bush = (props) => {
    return (
      <mesh {...props} castShadow>
        <sphereGeometry args={[1, 16, 16]} />
        <meshStandardMaterial color={'#89c854'} />
      </mesh>
    )
  }

  const MoonLight = () => {
    return (
      <directionalLight
        intensity={0.5}
        position={[-4, 5, 2]}
        color={'#b9d5ff'}
        castShadow
        shadow-mapSize-width={256}
        shadow-mapSize-height={256}
        shadow-camera-far={15}
      />
    )
  }

  const Graves = () => {
    const gravesRef = useRef()

    useEffect(() => {
      const graveGeometry = new THREE.BoxGeometry(0.6, 0.8, 0.2)
      const graveMaterial = new THREE.MeshStandardMaterial({ color: "#b2b6b1",  map: textureLoader.load(graveTexture) })

      for (let i = 0; i < 50; i++) {
        const angle = Math.random() * Math.PI * 2.5
        const radius = 3 + Math.random() * 6
        const x = Math.cos(angle) * radius
        const z = Math.sin(angle) * radius

        const grave = new THREE.Mesh(graveGeometry, graveMaterial)
        grave.position.set(x, 0.3, z)
        grave.rotation.set((Math.random() - 0.3) * 0.4, (Math.random() - 0.5) * 0.4, 0)
        grave.castShadow = true
        gravesRef.current.add(grave)
      }
    }, [])

    return <group ref={gravesRef} />
  }

  const Ghost = () => {
    const ghostRef = useRef()

    useFrame(({ clock }) => {
      const elapsedTime = clock.getElapsedTime()
      const ghostAngle = elapsedTime * 0.5
      ghostRef.current.position.x = Math.cos(ghostAngle) * 4
      ghostRef.current.position.z = Math.sin(ghostAngle) * 4
      ghostRef.current.position.y = Math.sin(elapsedTime * 3)
    })

    return (
      <pointLight
        ref={ghostRef}
        color="#f3f3f3"
        intensity={2}
        distance={3}
        castShadow
        shadow-mapSize-width={256}
        shadow-mapSize-height={256}
        shadow-camera-far={7}
      />
    )
  }

  
  return (
    <>
      <Canvas
        shadows
        onCreated={(state) => {
          state.gl.setClearColor('#262837')
          state.gl.setPixelRatio(window.devicePixelRatio)
          state.gl.setSize(window.innerWidth, window.innerHeight)
          state.scene.fog = new THREE.Fog('#262837', 1, 19)
        }}
        camera={{ position: [0, 5, 12], near: 0.1, far: 100 }}
      >
       
        <OrbitControls />
        <ambientLight intensity={0.11} color={'#b9d5ff'} />
        <MoonLight />
        <Floor />
        <Walls />
        <Roof />
        <Door />
        <DoorLight />
        <Bush position={[0.9, 0.2, 2.2]} scale={[0.4, 0.4, 0.4]} />
        <Bush position={[1.4, 0.1, 2.2]} scale={[0.25, 0.25, 0.25]} />
        <Bush scale={[-0.33, 0.33, 0.33]} position={[-0.8, 0.2, 2.2]} />
        <Bush scale={[0.15, 0.15, 0.15]} position={[1, 0.05, 2.6]} />
        <Bush scale={[0.15, 0.15, 0.15]} position={[-1.1, 0.05, 2.44]} />
        <Bat offset={0} />
<Bat offset={Math.PI / 1.5} />
<Bat offset={Math.PI} />
<Bat offset={(3 * Math.PI) / 1.5} />
        <Graves />
        <Ghost />
        <ColorfulLight/>
        <MovingShadow />
      </Canvas>
    </>
  )
}

export default App
