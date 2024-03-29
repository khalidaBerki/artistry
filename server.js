const express = require('express');
const axios = require('axios');

const app = express();
const port = 5000;

app.get('/api/v1/artworks', async (req, res) => {
  try {
    const response = await axios.get('https://api.artic.edu/api/v1/artworks?fields=id,title,image_id');
    res.json(response.data);
  } catch (error) {
    console.error('Erreur lors de la récupération des œuvres d\'art :', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des données' });
  }
});

app.listen(port, () => {
  console.log(`Serveur Express en cours d'exécution sur le port ${port}`);
});
