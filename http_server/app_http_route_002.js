const http = require('http');
const url = require('url');
const querystring = require('querystring');

const routes = {
  GET: {
    '/api/data': handleGetData
  },
  POST: {
    '/api/data': handlePostData
  }
};

function handleGetData(request, response, queryParams) {
  const jsonData = {
    message: 'Ceci est une réponse GET depuis /api/data',
    queryParams: queryParams
  };
  response.writeHead(200, { 'Content-Type': 'application/json' });
  response.end(JSON.stringify(jsonData));
}

function handlePostData(request, response, postData) {
  const jsonData = {
    message: 'Ceci est une réponse POST depuis /api/data',
    postData: postData
  };
  response.writeHead(200, { 'Content-Type': 'application/json' });
  response.end(JSON.stringify(jsonData));
}

const requestHandler = (request, response) => {
  const parsedUrl = url.parse(request.url);
  const queryParams = querystring.parse(parsedUrl.query);
  const method = request.method;
  const path = parsedUrl.pathname;

  const routeHandler = routes[method] && routes[method][path];
  if (routeHandler) {
    let body = '';
    if (method === 'POST') {
      request.on('data', (chunk) => {
        body += chunk.toString();
      });

      request.on('end', () => {
        const postData = querystring.parse(body);
        routeHandler(request, response, postData);
      });
    } else {
      routeHandler(request, response, queryParams);
    }
  } else {
    response.writeHead(404, { 'Content-Type': 'text/plain' });
    response.end('Route non trouvée ou méthode non autorisée');
  }
};

const server = http.createServer(requestHandler);

server.listen(80, (err) => {
  if (err) {
    return console.error('Erreur: ', err);
  }
  console.log('Le serveur est en cours d\'écoute sur le port 80');
});
