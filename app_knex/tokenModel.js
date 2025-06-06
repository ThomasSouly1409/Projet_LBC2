// db.js - Fichier pour gérer les opérations CRUD avec Knex
const knex = require('knex')(require('./knexfile')['development']);

// Create
async function createToken(email, token) {
  return await knex('token').insert({ email, token });
}

// Read
async function getAllTokens() {
  return await knex.select().from('tokens');
}

async function getTokenById(id) {
  return await knex('token').where({ token }).first();
}

// Update
async function updateToken(id, newEmail, newToken) {
  return await knex('token').where({ token }).update({ email: newEmail, token: newToken });
}

// Delete
async function deleteToken(token) {
  return await knex('token').where({ token }).del();
}

module.exports = {
  createToken,
  getAllTokens,
  getTokenById,
  updateToken,
  deleteToken
};

// npm install knex sqlite3