import React, { useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { useGLTF, OrbitControls, Stars } from '@react-three/drei'
import '../styles/information.css'
import { Link } from 'react-router-dom'

const Earth = () => {
    const earth = useGLTF('./earth/scene.gltf')
    const [isPlaying, setIsPlaying] = useState(false)
    const earthInfo = "Earth is the third planet from the Sun and the only astronomical object known to harbor life. About 29.2% of Earth's surface is land with remaining 70.8% covered with water."

    useEffect(() => {
        return () => {
            // Cleanup speech when component unmounts
            window.speechSynthesis.cancel()
        }
    }, [])

    const handleSpeak = () => {
        if (isPlaying) {
            window.speechSynthesis.cancel()
            setIsPlaying(false)
        } else {
            const speech = new SpeechSynthesisUtterance(earthInfo)
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
            <h1 className='page-title'>Earth</h1>
            
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
                            object={earth.scene} 
                            scale={1} 
                            position={[0, 0, 0]} 
                            rotation={[0, 0, 0]} 
                        />
                    </Canvas>
                </div>

                <div className='info-card'>
                    <h2>Earth Information</h2>
                    <div className='info-content'>
                        <p>{earthInfo}</p>
                        <div className='info-stats'>
                            <div className='stat-item'>
                                <span className='stat-label'>Surface Area</span>
                                <span className='stat-value'>510.1 million km²</span>
                            </div>
                            <div className='stat-item'>
                                <span className='stat-label'>Population</span>
                                <span className='stat-value'>7.9 billion</span>
                            </div>
                            <div className='stat-item'>
                                <span className='stat-label'>Orbital Period</span>
                                <span className='stat-value'>365.26 days</span>
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

export default Earth