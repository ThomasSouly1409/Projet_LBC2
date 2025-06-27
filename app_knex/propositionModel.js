// db.js - Fichier pour gérer les opérations CRUD avec Knex
const knex = require('knex')(require('./knexfile')['development']);

// Create
async function createProposition(annonce_id, user_id, message, created_at) {
  return await knex('propositions').insert({ annonce_id, user_id, message, created_at });
}

// Read
async function getAllPropositions() {
  return await knex.select().from('Propositions');
}

async function getPropositionById(id) {
  return await knex('propositions').where({ id }).first();
}   

// Update
async function updateProposition(id, newAnnonce_id, newUser_id, newMessage, newCreated_at) {
  return await knex('propositions').where({ id }).update({ annonce_id: newAnnonce_id, user_id: newUser_id, message: newMessage, created_at: newCreated_at });
}

// Delete
async function deleteProposition(id) {
  return await knex('propositions').where({ id }).del();
}

module.exports = {
  createProposition,
  getAllPropositions,
  getPropositionById,
  updateProposition,
  deleteProposition
};