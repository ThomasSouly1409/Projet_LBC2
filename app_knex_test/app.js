// app.js (ou index.js)
const express = require('express');
const app = express();
const userRoutes = require('./userRoutes');

app.use(express.json());
app.use('/', userRoutes); // Par exemple, utilisez '/api' comme préfixe pour toutes les routes des utilisateurs

const PORT = 80;
module.exports = app.listen(PORT, () => {
  console.log(`Le serveur Express écoute sur le port ${PORT}`);
});
