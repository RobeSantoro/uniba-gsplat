import { Canvas } from '@react-three/fiber'

import './App.css'
import { OrbitControls } from '@react-three/drei'
import Scene from './Scene'
// import DemoLighting from './DemoLighting'
// import Uniba from './Uniba'

function App() {

  return (

    <div
      style={{
        width: '100vw',
        height: '100vh',
        backgroundColor: 'black',
      }}
    >

      <Canvas
        gl={{ alpha: true, antialias: false, preserveDrawingBuffer: true }}
        camera={{ position: [3, 2, 2], fov: 80, near: 0.1, far: 1000, }}
      >
        {/* <ambientLight /> */}
        <pointLight position={[5, 5, 5]} intensity={100} />

        {/* <mesh>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color={'hotpink'} />
        </mesh> */}

        <Scene />
        {/* <DemoLighting /> */}
        {/* <Uniba /> */}

        <OrbitControls />
        <gridHelper args={[30, 30]} />
      </Canvas>

    </div>
  )
}

export default App
