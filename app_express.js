const express = require('express');
const app = express();

// Json support
app.use(express.json());

// Route pour la page d'accueil
app.get('/', (req, res) => {
  res.send('Bienvenue sur la page d\'accueil !');
});

// Route pour les données en GET
app.get('/api/data', (req, res) => {
  const jsonData = {
    message: 'Ceci est une réponse GET depuis /api/data',
    queryParams: req.query
  };
  res.json(jsonData);
});

// Route pour les données en POST
app.post('/api/postdata', (req, res) => {
  const jsonData = {
    message: 'Ceci est une réponse POST depuis /api/postdata',
    postData: req.body
  };
  res.json(jsonData);
});

const PORT = 80;
app.listen(PORT, () => {
  console.log(`Le serveur Express écoute sur le port ${PORT}`);
});
