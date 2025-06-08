import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from 'react-router-dom';
import Login from './components/Login';
import EquipmentList from './components/EquipmentList';
import EquipmentDetails from './components/EquipmentDetails';
import ReservationList from './components/ReservationList';
import NewReservation from './components/NewReservation';
import AdministratoriausPaskyra from './components/AdministratoriausPaskyra';
import UserProfile from './components/UserProfile';
import './App.css';

function App() {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Įranga
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/reservations">
                  Mano rezervacijos
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/admin">
                  Administratoriaus paskyra
                </Link>
              </li>
            </ul>
            <ul className="navbar-nav">
              {user ? (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/profile">
                      {user.username} ({user.role})
                    </Link>
                  </li>
                  <li className="nav-item">
                    <button
                      onClick={() => setUser(null)}
                      className="nav-link btn btn-outline-light ms-2"
                    >
                      Atsijungti
                    </button>
                  </li>
                </>
              ) : (
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Prisijungti
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>

      <div className="container mt-4">
        <Routes>
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/" element={<EquipmentList />} />
          <Route path="/equipment/:id" element={<EquipmentDetails />} />
          <Route
            path="/reservations"
            element={
              user ? <ReservationList user={user} /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/new-reservation"
            element={
              user ? <NewReservation user={user} /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/admin"
            element={
              user && user.role === 'admin' ? (
                <AdministratoriausPaskyra />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/profile"
            element={
              user ? <UserProfile user={user} /> : <Navigate to="/login" />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
