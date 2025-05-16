const http = require('http');
const url = require('url');
const querystring = require('querystring');

const routes = {
   GET: {
    '/api/data': (request, response, queryParams) => {
      // Répond à la requête GET sur /api/data
      const jsonData = {
        message: 'Ceci est une réponse GET depuis /api/data',
        queryParams: queryParams
      };
      response.writeHead(200, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify(jsonData));
    },
  },
  POST: {
    '/api/data': (request, response, queryParams) => {
      // Répond à la requête GET sur /api/data
      const jsonData = {
        message: 'Ceci est une réponse POST depuis /api/data',
        queryParams: queryParams
      };
      response.writeHead(200, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify(jsonData));
    }
  }
}
// Fonction de gestion des requêtes
const requestHandler = (request, response) => {
  const parsedUrl = url.parse(request.url);
  const queryParams = querystring.parse(parsedUrl.query);
  
  routes[request.method][parsedUrl.pathname](request, response, queryParams)

  // if (request.method === 'GET' && parsedUrl.pathname === '/api/data') {
  //   // Répond à la requête GET sur /api/data
  //   const jsonData = {
  //     message: 'Ceci est une réponse GET depuis /api/data',
  //     queryParams: queryParams
  //   };
  //   response.writeHead(200, { 'Content-Type': 'application/json' });
  //   response.end(JSON.stringify(jsonData));
  // } else if (request.method === 'POST' && parsedUrl.pathname === '/api/data') {
  //   // Gestion de la requête POST sur /api/data
  //   let body = '';
  //   request.on('data', (chunk) => {
  //     body += chunk.toString();
  //   });

  //   request.on('end', () => {
  //     const postData = querystring.parse(body);
  //     const jsonData = {
  //       message: 'Ceci est une réponse POST depuis /api/data',
  //       postData: postData
  //     };
  //     response.writeHead(200, { 'Content-Type': 'application/json' });
  //     response.end(JSON.stringify(jsonData));
  //   });
  // } else if (request.method === 'PUT' && parsedUrl.pathname === '/customers') {
  //   // Gestion de la requête POST sur /api/data
  //   let body = '';
  //   request.on('data', (chunk) => {
  //     body += chunk.toString();
  //   });

  //   request.on('end', () => {
  //     const postData = querystring.parse(body);
  //     const jsonData = {
  //       message: 'Ceci est une réponse PUT depuis /customers',
  //       postData: postData
  //     };
  //     response.writeHead(200, { 'Content-Type': 'application/json' });
  //     response.end(JSON.stringify(jsonData));
  //   });
  // } else if (request.method === 'DELETE' && parsedUrl.pathname === '/customers/1') {
  //   // Répond à la requête GET sur /api/data
  //   const jsonData = {
  //     message: 'Ceci est une réponse DELETE depuis /customers/1',
  //     queryParams: queryParams
  //   };
  //   response.writeHead(200, { 'Content-Type': 'application/json' });
  //   response.end(JSON.stringify(jsonData));
  // } else {
  //   // Route inconnue ou méthode non autorisée
  //   response.writeHead(404, { 'Content-Type': 'text/plain' });
  //   response.end('Route non trouvée ou méthode non autorisée');
  // }
};

const server = http.createServer(requestHandler);

server.listen(80, (err) => {
  if (err) {
    return console.error('Erreur: ', err);
  }
  console.log('Le serveur est en cours d\'écoute sur le port 80');
});
