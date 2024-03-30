import React from 'react';
import Header from './Header'; // Importer le composant Header
import '../CSS/ComingSoon.css';

const ComingSoon = () => {
  return (
    <div className="coming-soon-wrapper">
      <Header />
      <main className="coming-soon-content">
        <h2>Coming Soon</h2>
        <p>Cette page est en cours de développement. Revenez bientôt pour plus d'informations.</p>
      </main>
    </div>
  );
}

export default ComingSoon;
