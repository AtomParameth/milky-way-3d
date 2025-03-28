import React from 'react'
import { Html } from '@react-three/drei'

const markerStyles = {
  blackHole: {
    color: "#9933ff",
    emissive: "#6600cc",
    glowColor: "#9933ff",
    scale: [0.2, 0.2, 0.2]
  },
  starCluster: {
    color: "#33ccff",
    emissive: "#0099cc",
    glowColor: "#33ccff",
    scale: [0.15, 0.15, 0.15]
  },
  nebula: {
    color: "#ff66cc",
    emissive: "#cc3399",
    glowColor: "#ff66cc",
    scale: [0.18, 0.18, 0.18]
  },
  solarSystem: {
    color: "#ff4444",
    emissive: "#880000",
    glowColor: "#ff4444",
    scale: [0.15, 0.15, 0.15]
  }
}

const CelestialMarker = ({ type, position, onClick, isHovered, showLabel = true, label }) => {
  const style = markerStyles[type] || markerStyles.solarSystem

  return (
    <group position={position}>
      {/* Outer glow with animation */}
      <mesh scale={style.scale} className="pulse-animation">
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial color={style.glowColor} transparent opacity={0.2} />
      </mesh>
      
      {/* Clickable marker */}
      <mesh 
        scale={[style.scale[0] * 0.5, style.scale[1] * 0.5, style.scale[2] * 0.5]} 
        onClick={onClick}
      >
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial 
          color={isHovered ? style.glowColor : style.color} 
          emissive={isHovered ? style.glowColor : style.emissive}
          emissiveIntensity={2}
          metalness={0.5}
          roughness={0.2}
        />
      </mesh>
      
      {/* Animated ring */}
      <mesh 
        scale={style.scale} 
        rotation={[Math.PI / 2, 0, 0]}
        className="rotate-animation"
      >
        <ringGeometry args={[0.8, 1, 32]} />
        <meshBasicMaterial color={style.glowColor} transparent opacity={0.3} />
      </mesh>

      {/* Label */}
      {showLabel && label && (
        <Html position={[style.scale[0] * 1.5, style.scale[1] * 1.5, 0]}>
          <div className="celestial-label" style={{ color: style.color }}>
            {label}
          </div>
        </Html>
      )}
    </group>
  )
}

export default CelestialMarker