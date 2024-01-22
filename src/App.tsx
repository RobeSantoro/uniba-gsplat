import { Canvas } from '@react-three/fiber'

import './App.css'
import { OrbitControls } from '@react-three/drei'
import Scene from './Scene'

function App() {

  return (

    <div
      style={{
        width: '100vw',
        height: '100vh',
        backgroundColor: 'black',
      }}
    >

      <Canvas>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />

        {/* <mesh>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="hotpink" />
        </mesh> */}
        <Scene />

        <OrbitControls />

      </Canvas>
    </div>
  )
}

export default App
