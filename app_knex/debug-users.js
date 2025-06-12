const knex = require('knex')(require('./knexfile').development);

(async () => {
  const users = await knex('users').select();
  console.log(users);
  process.exit();
})();