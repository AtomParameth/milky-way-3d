import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/solar.css';
import sunImg from '../assets/images/sun.jpg';
import mercuryImg from '../assets/images/mercury.jpg';
import venusImg from '../assets/images/venus.jpg';
import earthImg from '../assets/images/earth.jpg';
import marsImg from '../assets/images/mars.jpg';
import jupiterImg from '../assets/images/jupiter.jpg';
import saturnImg from '../assets/images/saturn.jpg';
import uranusImg from '../assets/images/uranus.jpg';
import neptuneImg from '../assets/images/neptune.jpg';

const planets = [
  { 
    name: 'Sun', 
    image: sunImg,
    description: 'The star at the center of our Solar System'
  },
  { 
    name: 'Mercury', 
    image: mercuryImg,
    description: 'The smallest and innermost planet'
  },
  { 
    name: 'Venus', 
    image: venusImg,
    description: 'Second planet from the Sun'
  },
  { 
    name: 'Earth', 
    image: earthImg,
    description: 'Our home planet'
  },
  { 
    name: 'Mars', 
    image: marsImg,
    description: 'The Red Planet'
  },
  { 
    name: 'Jupiter', 
    image: jupiterImg,
    description: 'The largest planet in our Solar System'
  },
  { 
    name: 'Saturn', 
    image: saturnImg,
    description: 'Known for its prominent ring system'
  },
  { 
    name: 'Uranus', 
    image: uranusImg,
    description: 'The seventh planet from the Sun'
  },
  { 
    name: 'Neptune', 
    image: neptuneImg,
    description: 'The windiest planet in our Solar System'
  }
];

const Solar = () => {
  const navigate = useNavigate();
  const [selectedCard, setSelectedCard] = useState(null);

  const handleCardClick = (index) => {
    setSelectedCard(selectedCard === index ? null : index);
  };

  const handleExplore = (planetName) => {
    const route = planetName.toLowerCase();
    navigate(`/${route}`);
  };

  return (
    <div className="page-container">
      <div className="galaxy-background" />
      <button className="back-btn" onClick={() => navigate('/')}>
        ← Back
      </button>
      <h1 className="page-title">Explore Our Solar System</h1>
      <div className="solar-container">
        {planets.map((planet, index) => (
          <div 
            className={`card ${selectedCard === index ? 'card-active' : ''}`} 
            key={index}
            onClick={() => handleCardClick(index)}
          >
            <div className="card-image-container">
              <img src={planet.image} alt={planet.name} className="planet-image" />
              {selectedCard === index && (
                <div className="card-overlay">
                  <h3 className="overlay-title">{planet.name}</h3>
                  <p className="overlay-description">{planet.description}</p>
                  <button 
                    className="explore-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleExplore(planet.name);
                    }}
                  >
                    Explore
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Solar;