import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import MilkyWay from './components/milky_way'
import Solar from './components/solar'
import Mercury from './components/mercury'
import Venus from './components/venus'
import Earth from './components/earth'
import Mars from './components/mars'
import Jupiter from './components/jupiter'
import Saturn from './components/saturn'
import Uranus from './components/uranus'
import Neptune from './components/neptune'
import Sun from './components/sun'
import Blackhole from './components/blackhole'

function App() {
  return (
    <Router>
      <div className="app-container">
        <main className="main-content">
          <Routes>
            <Route path="/" element={<MilkyWay />} />
            <Route path="/solar-system" element={<Solar />} />
            <Route path="/sun" element={<Sun />} />
            <Route path="/mercury" element={<Mercury />} />
            <Route path="/venus" element={<Venus />} />
            <Route path="/earth" element={<Earth />} />
            <Route path="/mars" element={<Mars />} />
            <Route path="/jupiter" element={<Jupiter />} />
            <Route path="/saturn" element={<Saturn />} />
            <Route path="/uranus" element={<Uranus />} />
            <Route path="/neptune" element={<Neptune />} />
            <Route path="/blackhole" element={<Blackhole />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App