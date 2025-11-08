import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ListaVehiculos from './pages/Vehiculos/ListaVehiculos';
import ListaRegistros from './pages/Registros/ListaRegistros';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <div className="nav-container">
            <h1 className="nav-logo">Sistema de Vehículos</h1>
            <ul className="nav-menu">
              <li className="nav-item">
                <Link to="/" className="nav-link">Inicio</Link>
              </li>
              <li className="nav-item">
                <Link to="/vehiculos" className="nav-link">Vehículos</Link>
              </li>
              <li className="nav-item">
                <Link to="/registros" className="nav-link">Registros</Link>
              </li>
            </ul>
          </div>
        </nav>

        <div className="main-content">
          <Routes>
            <Route path="/" element={
              <div className="home-container">
                <h1>Bienvenido al Sistema de Gestión de Vehículos</h1>
                <p>Selecciona una opción del menú para comenzar</p>
              </div>
            } />
            <Route path="/vehiculos" element={<ListaVehiculos />} />
            <Route path="/registros" element={<ListaRegistros />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;