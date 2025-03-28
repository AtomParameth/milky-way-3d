import React, { useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF, Stars } from '@react-three/drei'
import { Link } from 'react-router-dom'
import '../styles/information.css'

const BlackholeModel = () => {
  const blackhole = useGLTF('./blackhole/scene.gltf')
  return (
    <primitive 
      object={blackhole.scene} 
      scale={0.5}
      position={[0, 0, 0]}
    />
  )
}

const Blackhole = () => {
  const [isPlaying, setIsPlaying] = useState(false)
  const blackholeInfo = "Sagittarius A* is the supermassive black hole at the center of our Milky Way galaxy. It has a mass of about 4.3 million times that of our Sun and is located approximately 26,000 light-years from Earth. This cosmic giant plays a crucial role in shaping our galaxy's structure and evolution. Its immense gravitational pull affects the orbits of stars and gas clouds in the galactic center."

  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel()
    }
  }, [])

  const handleSpeak = () => {
    if (isPlaying) {
      window.speechSynthesis.cancel()
      setIsPlaying(false)
    } else {
      const speech = new SpeechSynthesisUtterance(blackholeInfo)
      speech.onend = () => setIsPlaying(false)
      window.speechSynthesis.speak(speech)
      setIsPlaying(true)
    }
  }

  return (
    <div className='info-container'>
      <div className='galaxy-background' />
      <Link to="/solar-system" className='previous-button'>
        ← Back
      </Link>
      <h1 className='page-title'>Sagittarius A*</h1>
      
      <div className='content-wrapper'>
        <div className='canvas-container'>
          <Canvas>
            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
            <OrbitControls 
              minDistance={3} 
              maxDistance={10} 
              autoRotate 
              autoRotateSpeed={1} 
              enablePan={false} 
            />
            <ambientLight intensity={3} />
            <directionalLight intensity={0.5} />
            <BlackholeModel />
          </Canvas>
        </div>

        <div className='info-card'>
          <h2>Blackhole Information</h2>
          <div className='info-content'>
            <p>{blackholeInfo}</p>
            <div className='info-stats'>
              <div className='stat-item'>
                <span className='stat-label'>Mass</span>
                <span className='stat-value'>4.3 Million Solar Masses</span>
              </div>
              <div className='stat-item'>
                <span className='stat-label'>Distance from Earth</span>
                <span className='stat-value'>26,000 Light Years</span>
              </div>
              <div className='stat-item'>
                <span className='stat-label'>Size</span>
                <span className='stat-value'>44 Million km</span>
              </div>
            </div>
            <button 
              onClick={handleSpeak} 
              className='speak-button'
              aria-label={isPlaying ? 'Stop speaking' : 'Start speaking'}
            >
              {isPlaying ? '🔊 Stop' : '🔊 Speak'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Blackhole