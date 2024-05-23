import './App.css'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Fog } from 'three'

function App() {

  const WALL_HEIGHT = 4
  const ROOF_HEIGHT = 1

 const Floor = () => {
   return(
    <mesh rotation={[-Math.PI * 0.5, 0, 0]}>
      <planeGeometry args={[20, 20]}/>
      <meshStandardMaterial color={'#95AC78'} />
    </mesh>
   )
 }

 const Walls = () => {
   return(
    <mesh position={[0, WALL_HEIGHT / 2, 0]}>
      <boxGeometry args={[ WALL_HEIGHT, WALL_HEIGHT, WALL_HEIGHT]}/>
      <meshStandardMaterial color={'#ffffff'} />
    </mesh>
   )
 }

 const Roof = () => {
   return(
    <mesh position={[0, WALL_HEIGHT + ROOF_HEIGHT / 2, 0]} rotation={[0, -Math.PI * 0.25, 0]}>
      <coneGeometry args={[ 3.5, ROOF_HEIGHT, 4]}/>
      <meshStandardMaterial color={'#b35f45'} />
    </mesh>
   )
 }

 const Door = () => {
   return(
    <mesh position={[0, 1.24, WALL_HEIGHT / 2 +0.002]}>
      <planeGeometry args={[2, 2.5, 100, 100]}/>
      <meshStandardMaterial color={'#ff0000'} />
    </mesh>
   )
 }

const DoorLight = () => {
  return(
    <pointLight 
    position={[0, 1.5, 3.4]}
    color={'#ff7d46'}
    intensity={3.5}
    distance={19}
    />
   )
 }

 const Bush = (props) => {
   return(
    <mesh {...props}>
      <sphereGeometry args={[1, 16, 16]}/>
      <meshStandardMaterial color={'#89c854'} />
    </mesh>
   )
 }

const MoonLight = () => {

  return (
    <directionalLight 
     intensity={0.5}
    position={[-4, 5, 2]} 
    color={'#b9d5ff'}/>
  )
}

  return (
    <>
      <Canvas 
      onCreated={(state) => {
        state.gl.setClearColor('#262837')
        state.gl.setPixelRatio(window.devicePixelRatio)
        state.gl.setSize(window.innerWidth, window.innerHeight)
        state.scene.fog = new Fog('#262837', 1, 19)
      }}
      camera={{ position: [0, 5, 12],
        near: 0.1,
        far: 100,
      }}>
        <OrbitControls/>
        <ambientLight intensity={0.11} color={'#b9d5ff'}/>
        <MoonLight/>
        <Floor/>
        <Walls/>
        <Roof/>
        <Door/>
        <DoorLight/>
        <Bush position={[0.9, 0.2, 2.2]} scale={[0.4, 0.4, 0.4]}/>
        <Bush position={[1.4, 0.1, 2.2]} scale={[0.25, 0.25, 0.25]}/>
        <Bush scale={[-0.33, 0.33, 0.33]} position={[-0.8, 0.2, 2.2]}/>
        <Bush scale={[0.15, 0.15, 0.15]} position={[1, 0.05, 2.6]}/>

        <Bush scale={[0.15, 0.15, 0.15]} position={[-1.1, 0.05, 2.44]}/>
      </Canvas>
    </>
  )
}

export default App
