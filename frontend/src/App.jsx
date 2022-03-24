import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login/login';
import Profil from './pages/Profil/profil';
import Post from './pages/Post/post';
import './styles/_settings.scss';

function App() {
    return (
        <Router>
        <Routes>
          <Route exact path="/" element={<Login />}/>
          <Route path="/profil" element={<Profil />}/>
          <Route path="/post" element={<Post />}/>
        </Routes>
      </Router>
    );
}

export default App;