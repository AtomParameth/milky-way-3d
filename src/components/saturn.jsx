import React, { useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { useGLTF, OrbitControls, Stars } from '@react-three/drei'
import '../styles/information.css'
import { Link } from 'react-router-dom'

const Saturn = () => {
    const saturn = useGLTF('./saturn/scene.gltf')
    const [isPlaying, setIsPlaying] = useState(false)
    const saturnInfo = "Saturn is the sixth planet from the Sun and the second-largest planet in our Solar System. It's most famous for its spectacular ring system made mostly of ice particles, rocky debris, and dust. Saturn has 82 confirmed moons, with Titan being the largest."

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
            const speech = new SpeechSynthesisUtterance(saturnInfo)
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
            <h1 className='page-title'>Saturn</h1>
            
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
                            object={saturn.scene} 
                            scale={1} 
                            position={[0, 0, 0]} 
                            rotation={[0.2, 0, 0]} 
                        />
                    </Canvas>
                </div>

                <div className='info-card'>
                    <h2>Saturn Information</h2>
                    <div className='info-content'>
                        <p>{saturnInfo}</p>
                        <div className='info-stats'>
                            <div className='stat-item'>
                                <span className='stat-label'>Surface Area</span>
                                <span className='stat-value'>42.7 billion km²</span>
                            </div>
                            <div className='stat-item'>
                                <span className='stat-label'>Orbital Period</span>
                                <span className='stat-value'>29.5 years</span>
                            </div>
                            <div className='stat-item'>
                                <span className='stat-label'>Ring System Width</span>
                                <span className='stat-value'>282,000 km</span>
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

export default Saturn