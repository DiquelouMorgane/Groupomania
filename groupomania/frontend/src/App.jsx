import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login/login';
import Profil from './pages/Profil/profil';
import Trending from './pages/Trending/trending';
import './styles/_settings.scss';

function App() {
    return (
        <Router>
        <Routes>
          <Route exact path="/login" element={<Login />}/>
          <Route path="/profil" element={<Profil />}/>
          <Route path="/trending" element={<Trending />}/>
        </Routes>
      </Router>
    );
}

export default App;