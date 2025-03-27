import React, { useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { useGLTF, OrbitControls, Stars } from '@react-three/drei'
import '../styles/information.css'
import { Link } from 'react-router-dom'

const Mars = () => {
    const mars = useGLTF('./mars/scene.gltf')
    const [isPlaying, setIsPlaying] = useState(false)
    const marsInfo = "Mars is the fourth planet from the Sun and the second-smallest planet in the Solar System. Known as the Red Planet, its reddish appearance is due to iron oxide (rust) on its surface. Mars has two small moons, polar ice caps, and the largest volcano in the Solar System."

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
            const speech = new SpeechSynthesisUtterance(marsInfo)
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
            <h1 className='page-title'>Mars</h1>
            
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
                        <primitive 
                            object={mars.scene} 
                            scale={1.2} 
                            position={[0, -1.3, 0]} 
                            rotation={[0, 0, 0]} 
                        />
                    </Canvas>
                </div>

                <div className='info-card'>
                    <h2>Mars Information</h2>
                    <div className='info-content'>
                        <p>{marsInfo}</p>
                        <div className='info-stats'>
                            <div className='stat-item'>
                                <span className='stat-label'>Surface Area</span>
                                <span className='stat-value'>144.8 million km²</span>
                            </div>
                            <div className='stat-item'>
                                <span className='stat-label'>Orbital Period</span>
                                <span className='stat-value'>687 days</span>
                            </div>
                            <div className='stat-item'>
                                <span className='stat-label'>Number of Moons</span>
                                <span className='stat-value'>2 (Phobos & Deimos)</span>
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

export default Mars