const knex = require('knex')(require('./knexfile').development);

async function resetTokensTable() {
  try {
    const exists = await knex.schema.hasTable('tokens');
    if (exists) {
      await knex.schema.dropTable('tokens');
      console.log('✅ Table "tokens" supprimée');
    }

    await knex.schema.createTable('tokens', table => {
      table.increments('id').primary();
      table.string('token');
      table.string('email');
      table.integer('user_id'); // ← Ajout essentiel
      table.timestamp('created_at');
    });

    console.log('✅ Nouvelle table "tokens" créée avec user_id');
  } catch (err) {
    console.error('❌ Erreur :', err);
  } finally {
    await knex.destroy();
  }
}

resetTokensTable();