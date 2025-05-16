// Importation du module HTTP de Node.js
const http = require('http');

// Définition de la fonction de gestion de requête
const requestHandler = (request, response) => {
  // Envoi de la réponse HTTP avec le code 200 (OK) et le contenu 'Hello World!'
  response.writeHead(200, {'Content-Type': 'text/plain'});
  response.end('Hello World!\n');
};

// Création du serveur en utilisant la fonction createServer du module http
const server = http.createServer(requestHandler);

// Écoute du serveur sur le port 3000
server.listen(80, (err) => {
  if (err) {
    return console.error('Erreur: ', err);
  }

  // Affichage du message lorsque le serveur est en cours d'écoute
  console.log('Le serveur est en cours d\'écoute sur le port 80');
});
