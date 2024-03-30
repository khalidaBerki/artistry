import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../CSS/Catalogue.css';
import Header from './Header'; // Importer le composant Header

// Fonction de mélange aléatoire
const shuffleArray = (array) => {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

// Fonction de saut aléatoire
const randomJump = (array, jumpSize) => {
  const jumpIndex = Math.floor(Math.random() * (array.length - jumpSize));
  return array.slice(jumpIndex, jumpIndex + jumpSize);
};

function Catalogue() {
  // State hooks and useEffect
  const [artworks, setArtworks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedArtist, setSelectedArtist] = useState('');

  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        const response = await axios.get('https://api.artic.edu/api/v1/artworks?fields=id,title,image_id,artist_title');
        // Utilisation de la fonction de mélange aléatoire
        const shuffledArtworks = shuffleArray(response.data.data);
        // Utilisation de la fonction de saut aléatoire pour obtenir un sous-ensemble aléatoire
        const randomArtworks = randomJump(shuffledArtworks, 10); // Par exemple, saute de 10 œuvres à la fois
        setArtworks(randomArtworks); 
      } catch (error) {
        console.error('Erreur lors de la récupération des œuvres d\'art :', error);
      }
    };

    fetchArtworks();
  }, []);

  // Event handlers
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleArtistChange = (event) => {
    setSelectedArtist(event.target.value);
  };

  // filtres
  const filteredArtworks = artworks.filter(artwork => {
    const lowercaseSearchTerm = searchTerm ? searchTerm.toLowerCase() : '';
    const title = artwork.title ? artwork.title.toLowerCase() : '';
    const artistTitle = artwork.artist_title ? artwork.artist_title.toLowerCase() : '';
    return (
      title.includes(lowercaseSearchTerm) ||
      artistTitle.includes(lowercaseSearchTerm)
    );
  });

  // id des artistes
  const artistOptions = [
    { id: '36198', name: 'Pablo Picasso' },
    { id: '35670', name: 'Henri Matisse' },
    { id: '35809', name: 'Claude Monet' },
    // Add more artists here
  ];

  return (
    <div className="container">
      {/* Inclure le composant Header */}
      <Header />
      {/* Search and artist selection */}
      <div className="search-container">
        <label htmlFor="search">Recherche : </label>
        <input
          type="text"
          id="search"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <div className="artist-container">
        <label htmlFor="artist">Sélectionnez un artiste : </label>
        <select id="artist" value={selectedArtist} onChange={handleArtistChange}>
          <option value="">-- Sélectionnez un artiste --</option>
          {artistOptions.map(artist => (
            <option key={artist.id} value={artist.id}>{artist.name}</option>
          ))}
        </select>
        {selectedArtist && (
          <Link to={`/artist/${selectedArtist}`}>
            Voir les œuvres de l'artiste sélectionné
          </Link>
        )}
      </div>
      {/* Artwork list */}
      <h2>Liste des œuvres d'art</h2>
      <div className="artwork-list">
        {filteredArtworks.map(artwork => (
          <div key={artwork.id} className="artwork-box">
            <Link to={`/artwork/${artwork.id}`} className="artwork-link">
              <img 
                src={`https://www.artic.edu/iiif/2/${artwork.image_id}/full/!600,600/0/default.jpg`} 
                alt={artwork.title} 
              />
              <div className="artwork-details">
                <h3>{artwork.title}</h3>
                <p>Par {artwork.artist_title}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Catalogue;
