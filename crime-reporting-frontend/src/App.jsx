import React from 'react';

import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Navbar from './components/Navbar';
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ReportCrime from "./pages/ReportCrime";
import CrimeList from "./pages/CrimeList";
import Footer from './components/Footer';
import ReportedCrimes from './pages/reportedCrimes';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  

  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/report-crime" element={<ProtectedRoute allowedRoles={['citizen']}><ReportCrime /></ProtectedRoute>} />
        <Route path="/crimes" element={<ProtectedRoute allowedRoles={['police']}><CrimeList /></ProtectedRoute>} />
        <Route path="/user" element={<ReportedCrimes />} />
      </Routes>
      <Footer/>
    </Router>
  )
}

export default App
