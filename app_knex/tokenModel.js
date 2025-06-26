// db.js - Fichier pour gérer les opérations CRUD avec Knex
const knex = require('knex')(require('./knexfile')['development']);

// Create
async function createToken(token, user_id, email) {
  console.log({ email, token, user_id, created_at: new Date() })
  return await knex('tokens').insert({ email, token, user_id, created_at: new Date() });
}

// Read
async function getAllTokens() {
  return await knex.select().from('tokens');
}

async function getTokenById(id) {
  return await knex('tokens').where({ token: id }).first();
}

// Update
async function updateToken(id, newEmail, newToken) {
  return await knex('tokens').where({ token: id }).update({ email: newEmail, token: newToken });
}

// Delete
async function deleteToken(token) {
  return await knex('tokens').where({ token }).del();
}

module.exports = {
  createToken,
  getAllTokens,
  getTokenById,
  updateToken,
  deleteToken
};

// npm install knex sqlite3