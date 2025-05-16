const http = require('http');

const requestHandler = (request, response) => {
  const jsonData = {
    message: 'Hello, this is JSON response!',
    timestamp: new Date().toISOString()
  };

  response.writeHead(200, {'Content-Type': 'application/json'});
  response.end(JSON.stringify(jsonData));
};

const server = http.createServer(requestHandler);

server.listen(80, (err) => {
  if (err) {
    return console.error('Erreur: ', err);
  }
  console.log('Le serveur est en cours d\'écoute sur le port 80');
});
