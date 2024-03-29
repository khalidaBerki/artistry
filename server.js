const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const port = 5000;

// Middleware pour permettre les requêtes cross-origin
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
});

// Route pour récupérer les catégories d'œuvres d'art depuis l'API de l'Art Institute of Chicago
app.get('/api/v1/artworks', async (req, res) => {
    try {
        // Logique pour récupérer les œuvres d'art depuis l'API de l'Art Institute of Chicago
        const response = await axios.get('https://api.artic.edu/api/v1/artworks');
        const artworks = response.data.data;
        res.json(artworks);
    } catch (error) {
        console.error('Erreur lors de la récupération des œuvres d\'art :', error);
        res.status(500).json({ message: 'Erreur lors de la récupération des œuvres d\'art.' });
    }
});

// Route pour servir l'application React (après avoir construit l'application pour la production)
app.use(express.static(path.join(__dirname, 'client', 'build')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

app.listen(port, () => {
    console.log(`Serveur Express en cours d'exécution sur le port ${port}`);
});

