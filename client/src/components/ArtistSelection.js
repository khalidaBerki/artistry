import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function ArtworkDetail() {
  const [artistArtworks, setArtistArtworks] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchArtistArtworks = async () => {
      try {
        const artistResponse = await axios.get(`https://api.artic.edu/api/v1/artworks?fields=id,title,image_id&artist_id=${id}`);
        setArtistArtworks(artistResponse.data.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des œuvres d\'art de l\'artiste :', error);
      }
    };

    fetchArtistArtworks();
  }, [id]);

  const constructImageUrl = (imageId) => {
    return `https://www.artic.edu/iiif/2/${imageId}/full/!400,400/0/default.jpg`;
  };

  return (
    <div>
      <h1>Oeuvres d'art de l'artiste</h1>
      <ul>
        {artistArtworks.map(artwork => (
          <li key={artwork.id}>
            <img src={constructImageUrl(artwork.image_id)} alt={artwork.title} />
            <p>{artwork.title}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ArtworkDetail;
