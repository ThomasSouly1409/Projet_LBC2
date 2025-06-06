// db.js - Fichier pour gérer les opérations CRUD avec Knex
const knex = require('knex')(require('./knexfile')['development']);

// Create
async function createAnnonce(title, body, user_id, status, created_at) {
  return await knex('annonces').insert({ title, body, user_id, status, created_at });
}

// Read
async function getAllAnnonces() {
  return await knex.select().from('annonces');
}

async function getAnnonceById(id) {
  return await knex('annonces').where({ id }).first();
}

// Update
async function updateAnnonce(id, newTitle, newBody, newUser_id, newStatus, newCreated_at) {
  return await knex('annonces').where({ id }).update({ title: newTitle, body: newBody, user_id: newUser_id, status: newStatus, created_at: newCreated_at });
}

// Delete
async function deleteAnnonce(id) {
  return await knex('annonces').where({ id }).del();
}

module.exports = {
  createAnnonce,
  getAllAnnonces,
  getAnnonceById,
  updateAnnonce,
  deleteAnnonce
};