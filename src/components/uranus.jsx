import React, { useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { useGLTF, OrbitControls, Stars } from '@react-three/drei'
import '../styles/information.css'
import { Link } from 'react-router-dom'

const Uranus = () => {
    const uranus = useGLTF('./uranus/scene.gltf')
    const [isPlaying, setIsPlaying] = useState(false)
    const uranusInfo = "Uranus is the seventh planet from the Sun and the third-largest planet in our Solar System. It's unique among the planets as it rotates on its side, likely due to a massive impact early in its history. It has 27 known moons and a faint ring system."

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
            const speech = new SpeechSynthesisUtterance(uranusInfo)
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
            <h1 className='page-title'>Uranus</h1>
            
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
                            object={uranus.scene} 
                            scale={0.02} 
                            position={[0, 0, 0]} 
                            rotation={[0, 0, 0]} 
                        />
                    </Canvas>
                </div>

                <div className='info-card'>
                    <h2>Uranus Information</h2>
                    <div className='info-content'>
                        <p>{uranusInfo}</p>
                        <div className='info-stats'>
                            <div className='stat-item'>
                                <span className='stat-label'>Surface Area</span>
                                <span className='stat-value'>8.1 billion km²</span>
                            </div>
                            <div className='stat-item'>
                                <span className='stat-label'>Orbital Period</span>
                                <span className='stat-value'>84 years</span>
                            </div>
                            <div className='stat-item'>
                                <span className='stat-label'>Average Temperature</span>
                                <span className='stat-value'>-224°C</span>
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

export default Uranus