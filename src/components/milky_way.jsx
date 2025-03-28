import React, { useState, useRef, useEffect, useCallback } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { useGLTF, OrbitControls, Html, Stars } from '@react-three/drei'
import { useNavigate } from 'react-router-dom'
import * as THREE from 'three'
import '../styles/milky_way.css'
import '../styles/information.css'
import SolarSystem from '../assets/images/solarsystem.jpg'
import Blackhole from '../assets/images/blackhole.jpg'
import StarCluster from '../assets/images/starcluster.jpg'
import Nebula from '../assets/images/nebula.jpg'
import CelestialMarker from './CelestialMarker'

const celestialObjects = {
  solarSystem: {
    type: 'solarSystem',
    position: [-0.5, 0.2, 0.5],
    label: 'Solar System',
    title: 'Our Solar System',
    description: 'Our cosmic neighborhood, located approximately 26,000 light-years from the Galactic Center.',
    image: SolarSystem,
    stats: [
      { label: 'Age', value: '4.6 Billion Years' },
      { label: 'Distance from Center', value: '26,000 Light Years' }
    ]
  },
  sagittariusA: {
    type: 'blackHole',
    position: [0, 0.1, 0],
    label: 'Sagittarius A*',
    title: 'Sagittarius A* - Supermassive Black Hole',
    description: 'The supermassive black hole at the center of our Milky Way galaxy.',
    image: Blackhole, // Temporarily removed until image is available
    stats: [
      { label: 'Mass', value: '4.3 Million Solar Masses' },
      { label: 'Age', value: '13.6 Billion Years' }
    ]
  },
  pleiadesCluster: {
    type: 'starCluster',
    position: [-0.8, 0.15, 0.3],
    label: 'Pleiades',
    title: 'Pleiades Star Cluster',
    description: 'Also known as the Seven Sisters, this open star cluster contains middle-aged, hot B-type stars.',
    image: StarCluster, // Temporarily removed until image is available
    stats: [
      { label: 'Distance', value: '444 Light Years' },
      { label: 'Age', value: '100 Million Years' }
    ]
  },
  orionNebula: {
    type: 'nebula',
    position: [-0.3, -0.2, 0.6],
    label: 'Orion Nebula',
    title: 'Orion Nebula',
    description: 'A massive star-forming region visible to the naked eye.',
    image: Nebula, // Temporarily removed until image is available
    stats: [
      { label: 'Distance', value: '1,344 Light Years' },
      { label: 'Size', value: '24 Light Years' }
    ]
  }
}

const InfoBox = ({ position, onClose, object }) => {
  const { camera } = useThree()
  const ref = useRef()
  const navigate = useNavigate()

  // Calculate scale based on camera distance - inverted scaling
  const getScale = useCallback(() => {
    if (camera && position) {
      const markerPos = new THREE.Vector3(position[0], position[1], position[2])
      const distance = camera.position.distanceTo(markerPos)
      // Enhanced scaling: much larger when zoomed out
      const baseScale = distance * 0.4 // Doubled multiplier for stronger effect
      return Math.max(1, Math.min(3, baseScale)) // Increased min and max values
    }
    return 1
  }, [camera, position])

  return (
    <Html
      position={position}
      center
      sprite
      transform
      occlude={false}
      distanceFactor={getScale()}
      style={{ 
        zIndex: 1000,
        pointerEvents: 'auto'
      }}
    >
      <div ref={ref} className="info-box" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>×</button>
        <div className='info-image-container'>
          {object.image && (
            <img src={object.image} alt={object.title} className="info-image" />
          )}
          <div className='info-text'>
            <h3>{object.title}</h3>
            <p className="info-description">{object.description}</p>
            <div className="info-stats">
              {object.stats.map((stat, index) => (
                <div key={index} className="stat-item">
                  <span className="stat-label">{stat.label}</span>
                  <span className="stat-value">{stat.value}</span>
                </div>
              ))}
            </div>
            {(object.type === 'solarSystem' || object.type === 'blackHole') && (
              <>
                <div className="divider"></div>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(object.type === 'solarSystem' ? '/solar-system' : '/blackhole');
                  }}
                  className="explore-button"
                >
                  Explore {object.type === 'solarSystem' ? 'Solar System' : 'Black Hole'}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </Html>
  )
}

const MilkyWay = () => {
  const navigate = useNavigate()
  const milkyWay = useGLTF('./milky_way/scene.gltf')
  const [selectedObject, setSelectedObject] = useState(null)
  const [hoveredObject, setHoveredObject] = useState(null)

  const handleMarkerClick = (objectKey) => {
    setSelectedObject(selectedObject === objectKey ? null : objectKey)
  }

  const handleClose = () => {
    setSelectedObject(null)
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
        <directionalLight position={[5, 5, 5]} intensity={2} castShadow />
        <pointLight position={[10, 10, 10]} intensity={1.5} />
        <hemisphereLight skyColor="#ffffff" groundColor="#000000" intensity={0.5} />

        {/* Background stars */}
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

        {/* Milky Way model */}
        <mesh receiveShadow castShadow>
          <primitive 
            object={milkyWay.scene} 
            scale={0.01} 
            position={[0, 0, 0]} 
            rotation={[1.6, 0, 0]}
          />
        </mesh>

        {/* Celestial Markers */}
        {Object.entries(celestialObjects).map(([key, object]) => (
          <group key={key}
            onPointerOver={() => setHoveredObject(key)}
            onPointerOut={() => setHoveredObject(null)}
          >
            <CelestialMarker 
              type={object.type}
              position={object.position}
              onClick={() => handleMarkerClick(key)}
              isHovered={hoveredObject === key}
              label={object.label}
            />
          </group>
        ))}

        {/* Information overlay */}
        {selectedObject && (
          <InfoBox 
            position={celestialObjects[selectedObject].position}
            onClose={handleClose}
            object={celestialObjects[selectedObject]}
          />
        )}
      </Canvas>
    </div>
  )
}

export default MilkyWay