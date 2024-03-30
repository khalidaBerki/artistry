// Home.js

import React from 'react';
import '../CSS/Home.css';
import Header from './Header'; 
import HOME from '../assets/HOME.png';

const Introduction = () => {
    return (
      <div className="intro-container">
        <h1>Bienvenue à la Galerie d'Art de l'Institut de Chicago</h1>
        <p>Explorez notre collection en ligne inspirée par les trésors du Art Institute of Chicago. Plongez dans un monde d'expression artistique où chaque œuvre raconte une histoire unique. Utilisant React, cette plateforme vous permet de parcourir une collection diversifiée d'œuvres d'art, des chefs-d'œuvre classiques aux créations contemporaines. Que vous soyez à la recherche d'une pièce particulière ou simplement curieux de découvrir de nouveaux artistes, notre galerie vous offre une expérience immersive. Bienvenue dans notre exposition virtuelle, où l'art prend vie à chaque clic.</p>
      </div>
    );
}
  
// Home.js

function Home() {
    return (
      <div className="home-container">
        <Header />
        <div className="content-container">
          <div className="intro-container">
            <Introduction />
          </div>
          <div className="image-container">
            <img src={HOME} alt="HOME" className="image1" />
          </div>
        </div>
      </div>
    );
  }
  
  
export default Home;
