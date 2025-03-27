import React, { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { useGLTF, OrbitControls, Html } from '@react-three/drei'
import { Link, useNavigate } from 'react-router-dom'
import '../styles/solarSystem.css'
import Sun from '../assets/images/sun.jpg'
import Mercury from '../assets/images/mercury.jpg'
import Venus from '../assets/images/venus.jpg'
import Earth from '../assets/images/earth.jpg'
import Mars from '../assets/images/mars.jpg'
import Jupiter from '../assets/images/jupiter.jpg'
import Saturn from '../assets/images/saturn.jpg'
import Uranus from '../assets/images/uranus.jpg'
import Neptune from '../assets/images/neptune.jpg'
import Solarsystem from '../assets/images/solarsystem.jpg'

const planets = [
  { name: 'Sun', position: [-2, 2, 0] },
  { name: 'Mercury', position: [-1.1, 2, 0] },
  { name: 'Venus', position: [-0.8, 2, 0] },
  { name: 'Earth', position: [-0.4, 2, 0] },
  { name: 'Mars', position: [-0.01, 2, 0] },
  { name: 'Jupiter', position: [0.55, 2, 0] },
  { name: 'Saturn', position: [1.5, 2, 0] },
  { name: 'Uranus', position: [2.5, 2, 0] },
  { name: 'Neptune', position: [3.1, 2, 0] },
]

const SolarSystem = () => {
  const { scene } = useGLTF('./solar_system_paint_3d/scene.gltf')
  const [showPlanetInfo, setShowPlanetInfo] = useState(false)
  const [showSolarSystemInfo, setShowSolarSystemInfo] = useState(false)
  const [selectedPlanet, setSelectedPlanet] = useState(null)
  const navigate = useNavigate()

  const handlePlanetInfoClick = (planet) => {
    setSelectedPlanet(planet)
    setShowPlanetInfo(true)
  }

  const handleSolarSystemInfoClick = () => {
    setShowSolarSystemInfo(true)
  }

  const handleCloseClick = () => {
    setShowPlanetInfo(false)
    setShowSolarSystemInfo(false)
    setSelectedPlanet(null)
  }

  const gotoPlanet = () => {
    if (selectedPlanet) {
      navigate(`/${selectedPlanet.name.toLowerCase()}`)
    }
  }

  return (
    <div className='ss-container'>
      <div className='ss-header'>
        <button className='previous-button'>Previous</button>
        <button className='info-button' onClick={handleSolarSystemInfoClick}>Information</button>
      </div>
      <Canvas>
        <OrbitControls />
        <ambientLight intensity={3} />
        <directionalLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <primitive object={scene} scale={600} position={[-0.5, 0, 0]} rotation={[0, 0, 0]} />
        {planets.map((planet, index) => (
          <mesh
            key={index}
            position={planet.position}
            onClick={() => handlePlanetInfoClick(planet)}
          >
            <sphereGeometry args={[0.1, 32, 32]} />
            <meshStandardMaterial color="red" />
          </mesh>
        ))}
      </Canvas>
      {showPlanetInfo && selectedPlanet && (
        <div className="info-popup">
          <div className="info-popup-content">
            <h2>{selectedPlanet.name} Information</h2>
            <img
              src={
                selectedPlanet.name === 'Sun' ? Sun :
                  selectedPlanet.name === 'Mercury' ? Mercury :
                    selectedPlanet.name === 'Venus' ? Venus :
                      selectedPlanet.name === 'Earth' ? Earth :
                        selectedPlanet.name === 'Mars' ? Mars :
                          selectedPlanet.name === 'Jupiter' ? Jupiter :
                            selectedPlanet.name === 'Saturn' ? Saturn :
                              selectedPlanet.name === 'Uranus' ? Uranus :
                                Neptune
              }
              alt={selectedPlanet.name}
              className="planet-image"
            />
            <p>Click the explore button below to learn more about {selectedPlanet.name}.</p>
            <div className='info-planet-buttons'>
              <button onClick={gotoPlanet}>Explore</button>
              <button onClick={handleCloseClick}>Close</button>
            </div>
          </div>
        </div>
      )}
      {showSolarSystemInfo && (
        <div className="info-popup">
          <div className="info-popup-content">
            <h2>Solar System Information</h2>
            <img src={Solarsystem} alt="Solar System" className="planet-image" />
            <p>The Solar System is the gravitationally bound system of the Sun and the objects that orbit it, either directly or indirectly.</p>
            <div className='info-planet-buttons'>
              <button onClick={handleCloseClick}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SolarSystem