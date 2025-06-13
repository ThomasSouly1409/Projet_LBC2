const knex = require('knex')(require('./knexfile')['development']);

async function createTable() {
  try {
    const exists_users = await knex.schema.hasTable('users');
    if (!exists_users) {
      await knex.schema.createTable('users', table => {
        table.increments('id').primary();
        table.string('name');
        table.string('email');
        table.string('password');
        table.timestamp('created_at')
      });
      console.log('La table "users" a été créée avec succès.');
    } else {
      console.log('La table "users" existe déjà.');
    }
    const exists_annonces = await knex.schema.hasTable('annonces');
    if (!exists_annonces) {
      await knex.schema.createTable('annonces', table => {
        table.increments('id').primary();
        table.string('title');
        table.string('body');
        table.integer('user_id');
        table.string('status');
        table.timestamp('created_at')
      });
      console.log('La table "annonces" a été créée avec succès.');
    } else {
      console.log('La table "annonces" existe déjà.');
    }
    const exists_propositions = await knex.schema.hasTable('propositions');
    if (!exists_propositions) {
      await knex.schema.createTable('propositions', table => {
        table.increments('id').primary();
        table.integer('annonce_id');
        table.integer('user_id');
        table.string('message');
        table.timestamp('created_at')
      });
      console.log('La table "propositions" a été créée avec succès.');
    } else {
      console.log('La table "propositions" existe déjà.');
    }
    const exists_tokens = await knex.schema.hasTable('tokens');
    if (!exists_tokens) {
      await knex.schema.createTable('tokens', table => {
        table.increments('id').primary();
        table.string('token');
        table.string('email');
        table.integer('user_id');
        table.timestamp('created_at');
      });
      console.log('La table "tokens" a été créée avec succès.');
    } else {
      console.log('La table "tokens" existe déjà.');
    }

  } catch (error) {
    console.error('Erreur lors de la création de la table :', error);
  } finally {
    await knex.destroy();
  }
}

createTable();