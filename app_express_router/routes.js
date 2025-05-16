const express = require('express');
const router = express.Router();

// Route pour la page d'accueil
router.get('/', (req, res) => {
  res.send('Bienvenue sur la page d\'accueil !');
});

// Route pour les données en GET
router.get('/api/data', (req, res) => {
  const jsonData = {
    message: 'Ceci est une réponse GET depuis /api/data',
    queryParams: req.query
  };
  res.json(jsonData);
});

// Route pour les données en POST
router.post('/api/postdata', (req, res) => {
  const jsonData = {
    message: 'Ceci est une réponse POST depuis /api/postdata',
    postData: req.body
  };
  res.json(jsonData);
});

module.exports = router;
