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
// ...