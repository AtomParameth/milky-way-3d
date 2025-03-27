import React, { useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { useGLTF, OrbitControls, Stars } from '@react-three/drei'
import '../styles/information.css'
import { Link } from 'react-router-dom'

const Neptune = () => {
    const neptune = useGLTF('./neptune/scene.gltf')
    const [isPlaying, setIsPlaying] = useState(false)
    const neptuneInfo = "Neptune is the eighth and farthest known planet from the Sun. It's the fourth-largest planet by diameter and the third-most massive. Neptune's atmosphere, with its active weather systems, features visible storms similar to Jupiter's Great Red Spot."

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
            const speech = new SpeechSynthesisUtterance(neptuneInfo)
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
            <h1 className='page-title'>Neptune</h1>
            
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
                            object={neptune.scene} 
                            scale={0.1} 
                            position={[0, 0, 0]} 
                            rotation={[0, 0, 0]} 
                        />
                    </Canvas>
                </div>

                <div className='info-card'>
                    <h2>Neptune Information</h2>
                    <div className='info-content'>
                        <p>{neptuneInfo}</p>
                        <div className='info-stats'>
                            <div className='stat-item'>
                                <span className='stat-label'>Surface Area</span>
                                <span className='stat-value'>7.6 billion km²</span>
                            </div>
                            <div className='stat-item'>
                                <span className='stat-label'>Orbital Period</span>
                                <span className='stat-value'>165 years</span>
                            </div>
                            <div className='stat-item'>
                                <span className='stat-label'>Number of Moons</span>
                                <span className='stat-value'>14</span>
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

export default Neptune