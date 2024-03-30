import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import Header from './Header';
import '../CSS/ArtworkDetail.css';

function ArtworkDetail() {
  const [artwork, setArtwork] = useState(null);
  const [artistArtworks, setArtistArtworks] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchArtwork = async () => {
      try {
        const response = await axios.get(`https://api.artic.edu/api/v1/artworks/${id}`);
        setArtwork(response.data.data);
        if (response.data.data.artist_id) {
          const artistResponse = await axios.get(`https://api.artic.edu/api/v1/artworks?fields=id,title,image_id&artist_id=${response.data.data.artist_id}`);
          setArtistArtworks(artistResponse.data.data);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des détails de l\'œuvre d\'art :', error);
      }
    };

    fetchArtwork();
  }, [id]);

  const constructImageUrl = (imageId) => {
    return `https://www.artic.edu/iiif/2/${imageId}/full/!400,400/0/default.jpg`;
  };

  const renderUnknownIfNull = (value) => {
    return value ? value : "Inconnu";
  };

  const stripHtmlTags = (htmlString) => {
    return htmlString.replace(/<\/?[^>]+(>|$)/g, "");
  };

  return (
    <div className="container">
      <Header />
      <h1>Détails de l'œuvre d'art</h1>
      {artwork ? (
        <div className ="containerDarck">
          <img src={constructImageUrl(artwork.image_id)} alt={artwork.title} />
          <h2>{artwork.title}</h2>
          <p>Par {renderUnknownIfNull(artwork.artist_title)}</p>
          <p>Description : {stripHtmlTags(renderUnknownIfNull(artwork.description))}</p>
          <h3>Suggestions d'autres œuvres de {renderUnknownIfNull(artwork.artist_title)} :</h3>
          <ul>
            {artistArtworks.slice(0, 3).map(art => (
              <li key={art.id}>
                <Link to={`/artwork/${art.id}`}>
                  <img src={constructImageUrl(art.image_id)} alt={art.title} />
                  <p>{art.title}</p>
                </Link>
              </li>
            ))}
          </ul>
          {/* Ajoutez d'autres détails de l'œuvre d'art ici */}
        </div>
      ) : (
        <p>Chargement en cours...</p>
      )}
    </div>
  );
}

export default ArtworkDetail;
