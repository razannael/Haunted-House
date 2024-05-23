import './App.css'
import React, { useRef, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

function App() {
  const WALL_HEIGHT = 4
  const ROOF_HEIGHT = 1

  const Floor = () => {
    return (
      <mesh rotation={[-Math.PI * 0.5, 0, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color={'#95AC78'} />
      </mesh>
    )
  }

  const Walls = () => {
    return (
      <mesh position={[0, WALL_HEIGHT / 2, 0]} castShadow>
        <boxGeometry args={[WALL_HEIGHT, WALL_HEIGHT, WALL_HEIGHT]} />
        <meshStandardMaterial color={'#ffffff'} />
      </mesh>
    )
  }

  const Roof = () => {
    return (
      <mesh position={[0, WALL_HEIGHT + ROOF_HEIGHT / 2, 0]} rotation={[0, -Math.PI * 0.25, 0]} castShadow>
        <coneGeometry args={[3.5, ROOF_HEIGHT, 4]} />
        <meshStandardMaterial color={'#b35f45'} />
      </mesh>
    )
  }

  const Door = () => {
    return (
      <mesh position={[0, 1.24, WALL_HEIGHT / 2 + 0.002]} castShadow>
        <planeGeometry args={[2, 2.5, 100, 100]} />
        <meshStandardMaterial color={'#ff0000'} />
      </mesh>
    )
  }

  const DoorLight = () => {
    return (
      <pointLight
        position={[0, 1.5, 3.4]}
        color={'#ff7d46'}
        intensity={3.5}
        distance={19}
        castShadow
        shadow-mapSize-width={256}
        shadow-mapSize-height={256}
        shadow-camera-far={7}
      />
    )
  }

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
      const graveMaterial = new THREE.MeshStandardMaterial({ color: "#b2b6b1" })

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
        <Graves />
        <Ghost />
      </Canvas>
    </>
  )
}

export default App
