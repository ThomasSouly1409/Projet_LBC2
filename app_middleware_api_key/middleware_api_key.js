const express = require('express');
const app = express();

// apiKeyAuthMiddleware.js
const allowedApiKeys = ['YOUR_API_KEY_1', 'YOUR_API_KEY_2']; // Remplacez par vos clés autorisées

function apiKeyAuthMiddleware(req, res, next) {
  const apiKey = req.headers['x-api-key']; // Récupère la clé API depuis les en-têtes

  if (!apiKey || !allowedApiKeys.includes(apiKey)) {
    return res.status(401).json({ error: 'Clé API non valide' });
  }

  // Si la clé est valide, vous pouvez continuer le traitement de la requête
  next();
}

// Utilisation du middleware pour toutes les requêtes
app.use(apiKeyAuthMiddleware);

// Routes
app.get('/', (req, res) => {
  res.send('Bienvenue sur la page d\'accueil !');
});

const PORT = 80;
app.listen(PORT, () => {
  console.log(`Le serveur Express écoute sur le port ${PORT}`);
});
