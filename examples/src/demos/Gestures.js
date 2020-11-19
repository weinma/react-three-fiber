import React from 'react'
import { Canvas, useThree } from 'react-three-fiber'
import { useDrag } from 'react-use-gesture'
import { useSpring, a } from 'react-spring/three'

function Obj() {
  const { viewport } = useThree()
  const [spring, set] = useSpring(() => ({
    position: [0, 0, 0],
    rotation: [0, 0, 0],
    config: { mass: 3, friction: 40, tension: 800 },
  }))

  const bind = useDrag(({ event, first, offset: [x, y], vxvy: [vx, vy], down, ...props }) => {
    const aspect = viewport().factor
    if (first) event.target.addEventListener('pointermove', () => console.log('hello'))
    set({
      position: [x / aspect, -y / aspect, 0],
      rotation: [y / aspect, x / aspect, 0],
    })
  })

  return (
    <mesh {...bind()} castShadow>
      <dodecahedronBufferGeometry attach="geometry" args={[1.4, 0]} />
      <meshNormalMaterial attach="material" />
    </mesh>
  )
}

export default function App() {
  return (
    <Canvas style={{ background: 'lightblue' }} shadowMap camera={{ position: [0, 0, 5] }}>
      <ambientLight intensity={0.5} />
      <spotLight
        intensity={0.6}
        position={[20, 10, 10]}
        angle={0.2}
        penumbra={1}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        castShadow
      />
      <mesh receiveShadow>
        <planeBufferGeometry attach="geometry" args={[1000, 1000]} />
        <meshPhongMaterial attach="material" color="#272727" />
      </mesh>
      <Obj />
    </Canvas>
  )
}
