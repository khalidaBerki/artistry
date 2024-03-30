// App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import ArtworkDetails from './components/ArtworkDetails';
import ArtistSelection from './components/ArtistSelection';
import ComingSoon from './components/ComingSoon';
import Catalogue from './components/Catalogue'
// Importez d'autres composants pour vos autres pages ici

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/artwork/:id" element={<ArtworkDetails />} />
        <Route path="/artist/:artistId" element={ArtistSelection} />
        <Route path="/catalogue" element={<Catalogue/>} />
        <Route path="/about" element={<ComingSoon/>} />
        <Route path="/contact" element={<ComingSoon/>} />
      </Routes>
    </Router>
  );
}

export default App;
