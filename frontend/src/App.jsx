import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import Profil from './pages/profil';
import Posts from './pages/posts';
import "./styles/main.css";

function App() {
    return (
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />}/>
          <Route path="/profil" element={<Profil />}/>
          <Route path="/post" element={<Posts />}/>
        </Routes>
      </Router>
    );
}

export default App;