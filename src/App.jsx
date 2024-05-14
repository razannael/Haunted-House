import './App.css'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

function App() {

  return (
    <>
      <Canvas>
        <OrbitControls/>
        <ambientLight intensity={0.5} color={0xffffff}/>
        <directionalLight position={[0, 0, 5]} color={0xffffff}/>
        <mesh>
          <boxGeometry/>
          <meshStandardMaterial color={'red'}/>
        </mesh>
      </Canvas>
    </>
  )
}

export default App
