// app.js (ou index.js)
const express = require('express');
const app = express();
const userRoutes = require('./userRoutes');
const annonceRoutes = require('./annonceRoutes');
const propositionRoutes = require('./propositionRoutes');

app.use(express.json());
app.use('/', userRoutes); // Par exemple, utilisez '/api' comme préfixe pour toutes les routes des utilisateurs
app.use('/', annonceRoutes);
app.use('/', propositionRoutes);

app.get('/', (req, res) => {
  res.send('Bienvenue sur la page d\'accueil !')
})

const PORT = 80;
app.listen(PORT, () => {
  console.log(`Le serveur Express écoute sur le port ${PORT}`);
});
