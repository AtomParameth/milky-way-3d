import React, { useState, useRef, useEffect } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { useGLTF, OrbitControls, Html, Stars, useTexture } from '@react-three/drei'
import { useNavigate } from 'react-router-dom'
import '../styles/milky_way.css'
import SolarSystem from '../assets/images/solarsystem.jpg'

const SolarSystemMarker = ({ position, onClick, isHovered }) => {
  return (
    <group position={position}>
      {/* Outer glow with animation */}
      <mesh scale={[0.15, 0.15, 0.15]} className="pulse-animation">
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial color="#ff4444" transparent opacity={0.2} />
      </mesh>
      {/* Clickable marker */}
      <mesh 
        scale={[0.08, 0.08, 0.08]} 
        onClick={onClick}
      >
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial 
          color={isHovered ? "#ff8888" : "#ff0000"} 
          emissive={isHovered ? "#ff4444" : "#880000"}
          emissiveIntensity={2}
          metalness={0.5}
          roughness={0.2}
        />
      </mesh>
      {/* Animated ring */}
      <mesh 
        scale={[0.2, 0.2, 0.2]} 
        rotation={[Math.PI / 2, 0, 0]}
        className="rotate-animation"
      >
        <ringGeometry args={[0.8, 1, 32]} />
        <meshBasicMaterial color="#ff4444" transparent opacity={0.3} />
      </mesh>
    </group>
  )
}

const InfoBox = ({ position, onClose, children }) => {
  const { camera } = useThree()
  const ref = useRef()

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        onClose()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [onClose])

  return (
    <Html position={position}>
      <div ref={ref} className="info-box" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </Html>
  )
}

const MilkyWay = () => {
  const navigate = useNavigate()
  const milkyWay = useGLTF('./milky_way/scene.gltf')
  const [showInfo, setShowInfo] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  // Position for our solar system in the Milky Way (approximately 26,000 light years from center)
  const solarSystemPosition = [-0.5, 1.1, 0.5]

  const handlePointClick = () => {
    setShowInfo(!showInfo)
  }

  const handlePointerOver = () => setIsHovered(true)
  const handlePointerOut = () => setIsHovered(false)

  const handleClose = () => {
    setShowInfo(false)
  }

  return (
    <div className='mw-container'>
      <Canvas
        camera={{ position: [0, 2, 5], fov: 60 }}
        style={{ background: 'black' }}
      >
        <OrbitControls 
          enableZoom={true}
          enablePan={true}
          minDistance={2}
          maxDistance={10}
          rotateSpeed={0.5}
        />
        
        {/* Enhanced lighting */}
        <ambientLight intensity={1} />
        <directionalLight 
          position={[5, 5, 5]} 
          intensity={2}
          castShadow
        />
        <pointLight position={[10, 10, 10]} intensity={1.5} />
        <hemisphereLight 
          skyColor="#ffffff"
          groundColor="#000000"
          intensity={0.5}
        />

        {/* Background stars */}
        <Stars 
          radius={100} 
          depth={50} 
          count={5000} 
          factor={4} 
          saturation={0} 
          fade 
          speed={1}
        />

        {/* Milky Way model */}
        <mesh receiveShadow castShadow>
          <primitive 
            object={milkyWay.scene} 
            scale={0.01} 
            position={[0, 0, 0]} 
            rotation={[1.6, 0, 0]}
          />
        </mesh>

        {/* Interactive Solar System Marker */}
        <group
          onPointerOver={handlePointerOver}
          onPointerOut={handlePointerOut}
        >
          <SolarSystemMarker 
            position={solarSystemPosition}
            onClick={handlePointClick}
            isHovered={isHovered}
          />
        </group>

        {/* Information overlay */}
        {showInfo && (
          <InfoBox position={solarSystemPosition} onClose={handleClose}>
            <div className='info-image-container'>
              <img src={SolarSystem} alt="Solar System" className="info-image" />
              <div className='info-text'>
                <h3>Our Solar System</h3>
                <p>Located approximately 26,000 light-years from the Galactic Center</p>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate('/solar-system');
                  }}
                  className="explore-button"
                >
                  Explore Solar System
                </button>
              </div>
            </div>
          </InfoBox>
        )}
      </Canvas>
    </div>
  )
}

export default MilkyWay