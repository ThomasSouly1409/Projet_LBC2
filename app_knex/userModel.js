// db.js - Fichier pour gérer les opérations CRUD avec Knex
const knex = require('knex')(require('./knexfile')['development']);

// Create
async function createUser(name, email, password, created_at = new Date()) {
  return await knex('users').insert({ name, email, password, created_at });
}

// Read
async function getAllUsers() {
  return await knex.select().from('users');
}

async function getUserByEmail(email) {
  const user = await knex('users').where({ email }).first();
  return user;
}

async function getUserById(id) {
  return await knex('users').where({ id }).first();
}

// Update
async function updateUser(id, newName, newEmail) {
  return await knex('users').where({ id }).update({ name: newName, email: newEmail });
}

// Delete
async function deleteUser(id) {
  return await knex('users').where({ id }).del();
}

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  getUserByEmail
};

// npm install knex sqlite3