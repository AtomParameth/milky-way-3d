import React, { useState } from 'react';

const Help = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button 
        className="help-button" 
        onClick={() => setIsModalOpen(true)}
        aria-label="Help"
      >
        ?
      </button>

      {isModalOpen && (
        <>
          <div className="modal-overlay" onClick={() => setIsModalOpen(false)} />
          <div className="documentation-modal active">
            <button 
              className="modal-close" 
              onClick={() => setIsModalOpen(false)}
              aria-label="Close documentation"
            >
              ×
            </button>
            <h2>Documentation</h2>

            <div className="documentation-section">
              <h3>Getting Started</h3>
              <p>Welcome to our interactive 3D Milky Way exploration! This website allows you to explore the vast expanse of our galaxy, from the central supermassive black hole Sagittarius A* to various celestial objects and regions, including our Solar System.</p>
            </div>

            <div className="documentation-section">
              <h3>Navigation Controls</h3>
              <ul>
                <li>Left Click + Drag: Rotate the camera around the galactic scene</li>
                <li>Right Click + Drag: Pan across the galactic plane</li>
                <li>Mouse Wheel: Zoom in and out of regions</li>
                <li>Click on Markers: Interact with various celestial objects and regions</li>
              </ul>
            </div>

            <div className="documentation-section">
              <h3>Features</h3>
              <ul>
                <li>Interactive 3D Galaxy Model: Explore a detailed rendering of the Milky Way</li>
                <li>Celestial Objects: Discover key locations like Sagittarius A*, star clusters, and nebulae</li>
                <li>Solar System Access: Dive deep into our cosmic neighborhood</li>
                <li>Information Cards: Learn about different galactic features and phenomena</li>
                <li>Text-to-Speech: Listen to descriptions of celestial objects</li>
                <li>Responsive Design: Experience the galaxy on any device</li>
              </ul>
            </div>

            <div className="documentation-section">
              <h3>Key Locations</h3>
              <ul>
                <li>Sagittarius A*: Our galaxy's supermassive black hole</li>
                <li>Solar System: Our cosmic neighborhood</li>
                <li>Star Clusters: Dense collections of stars</li>
                <li>Nebulae: Vast clouds of gas and dust</li>
              </ul>
            </div>

            <div className="documentation-section">
              <h3>Tips</h3>
              <ul>
                <li>Use the back button (←) to return to previous views</li>
                <li>Look for glowing markers indicating points of interest</li>
                <li>Enable sound for the full educational experience</li>
                <li>Take time to explore the different regions of our galaxy</li>
                <li>For the best experience, use a modern web browser</li>
              </ul>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Help;