import './App.css'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

function App() {

 const Floor = () => {
   return(
    <mesh rotation={[-Math.PI * 0.5, 0, 0]}>
      <planeGeometry args={[20, 20]}/>
      <meshStandardMaterial color={'#95AC78'} />
    </mesh>
   )
 }

  return (
    <>
      <Canvas 
      camera={{ position: [0, 5, 15],
        near: 0.1,
        far: 100,
      }}>
        <OrbitControls/>
        <ambientLight intensity={0.1} color={'#b9d5ff'}/>
        <directionalLight 
        intensity={1.2}
        position={[-4, 5, 2]} 
        color={'#b9d5ff'}/>
        <Floor/>
      </Canvas>
    </>
  )
}

export default App
