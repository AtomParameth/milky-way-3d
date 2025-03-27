import React, { useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { useGLTF, OrbitControls, Stars } from '@react-three/drei'
import '../styles/information.css'
import { Link } from 'react-router-dom'

const Sun = () => {
    const sun = useGLTF('./sun/scene.gltf')
    const [isPlaying, setIsPlaying] = useState(false)
    const sunInfo = "The Sun is the star at the center of our Solar System. It's a massive ball of hydrogen and helium undergoing nuclear fusion, providing light and energy to Earth and the other planets. The Sun accounts for 99.86% of the Solar System's mass."

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
            const speech = new SpeechSynthesisUtterance(sunInfo)
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
            <h1 className='page-title'>The Sun</h1>
            
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
                        <ambientLight intensity={2} />
                        <pointLight position={[0, 0, 0]} intensity={3} color="#ff7b00" />
                        <directionalLight intensity={1} color="#ffb700" />
                        <primitive 
                            object={sun.scene} 
                            scale={0.1} 
                            position={[0, 0, 0]} 
                            rotation={[1.6, 0, 0]} 
                        />
                    </Canvas>
                </div>

                <div className='info-card'>
                    <h2>Sun Information</h2>
                    <div className='info-content'>
                        <p>{sunInfo}</p>
                        <div className='info-stats'>
                            <div className='stat-item'>
                                <span className='stat-label'>Surface Temperature</span>
                                <span className='stat-value'>5,500°C</span>
                            </div>
                            <div className='stat-item'>
                                <span className='stat-label'>Mass</span>
                                <span className='stat-value'>1.989 × 10^30 kg</span>
                            </div>
                            <div className='stat-item'>
                                <span className='stat-label'>Age</span>
                                <span className='stat-value'>4.6 billion years</span>
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

export default Sun