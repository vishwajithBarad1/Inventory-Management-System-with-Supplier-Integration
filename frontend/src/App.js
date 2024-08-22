import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from "./pages/LoginPage";
import DashBoard from './pages/DashBoard';
import Product from './pages/Product';
import SuppliersPage from './pages/SuppliersPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage/>}/>
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/Product" element={<Product />} />
        <Route path="/Orders" element={<DashBoard />} />
        <Route path="/Suppliers" element={<SuppliersPage />} />
        <Route path="/Reports" element={<DashBoard />} />

      </Routes>
    </Router>
  );
}

export default App;