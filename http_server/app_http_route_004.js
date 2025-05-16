const http = require('http');
const url = require('url');
const querystring = require('querystring');

class Router {
  constructor() {
    this.routes = {
      GET: {},
      POST: {},
      PUT: {},
      DELETE: {}
    };
  }

  get(path, handler) {
    this.routes.GET[path] = handler;
  }

  post(path, handler) {
    this.routes.POST[path] = handler;
  }

  put(path, handler) {
    this.routes.PUT[path] = handler;
  }

  delete(path, handler) {
    this.routes.DELETE[path] = handler;
  }

  handleRequest(request, response) {
    const parsedUrl = url.parse(request.url);
    const queryParams = querystring.parse(parsedUrl.query);
    const method = request.method;
    const path = parsedUrl.pathname;

    const routeHandler = this.routes[method] && this.routes[method][path];
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
      } else if (method === 'PUT') {
        request.on('data', (chunk) => {
          body += chunk.toString();
        });

        request.on('end', () => {
          const putData = querystring.parse(body);
          routeHandler(request, response, putData);
        });
      } else {
        routeHandler(request, response, queryParams);
      }
    } else {
      response.writeHead(404, { 'Content-Type': 'text/plain' });
      response.end('Route non trouvée ou méthode non autorisée');
    }
  }
}

const router = new Router();
router.get('/api/data', (request, response, queryParams) => {
  const jsonData = {
    message: 'Ceci est une réponse GET depuis /api/data',
    queryParams: queryParams
  };
  response.writeHead(200, { 'Content-Type': 'application/json' });
  response.end(JSON.stringify(jsonData));
});

router.post('/api/data', (request, response, postData) => {
  const jsonData = {
    message: 'Ceci est une réponse POST depuis /api/data',
    postData: postData
  };
  response.writeHead(200, { 'Content-Type': 'application/json' });
  response.end(JSON.stringify(jsonData));
});

router.put('/api/data', (request, response, putData) => {
  const jsonData = {
    message: 'Ceci est une réponse PUT depuis /api/data',
    putData: putData
  };
  response.writeHead(200, { 'Content-Type': 'application/json' });
  response.end(JSON.stringify(jsonData));
});

router.delete('/api/data', (request, response) => {
  const jsonData = {
    message: 'Ceci est une réponse DELETE depuis /api/data',
  };
  response.writeHead(200, { 'Content-Type': 'application/json' });
  response.end(JSON.stringify(jsonData));
});

// Création du serveur avec le router
const server = http.createServer((request, response) => {
  router.handleRequest(request, response);
});

server.listen(80, (err) => {
  if (err) {
    return console.error('Erreur: ', err);
  }
  console.log('Le serveur est en cours d\'écoute sur le port 80');
});
