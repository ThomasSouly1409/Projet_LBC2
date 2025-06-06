// App.js - Utilisation des opérations CRUD avec Knex

const db_user = require('./userModel');
const db_annonce = require('./annonceModel');
const db_proposition = require('./propositionModel')

async function main() {
  // Create
  await db_user.createUser('John Doe', 'john@example.com');
  await db_annonce.createAnnonce ('Audi', 'Année 2020', '1', 'En ligne', '06/06');
  await db_proposition.createProposition ('2', '1', 'Voici une magnifique Audi A1 Sportback 40 TFSI 200ch S line S tronic 6 de 2020', '08/06')

  // Read
  const allUsers = await db_user.getAllUsers();
  console.log('Tous les utilisateurs :', allUsers);
  const allAnnonces = await db_annonce.getAllAnnonces();
  console.log('Toutes les annnonces :', allAnnonces)
  const allPropositions = await db_proposition.getAllPropositions();
  console.log('Toutes les propositions :', allPropositions)

  // Update
  await db_user.updateUser(1, 'Jane Doe', 'jane@example.com');
  await db_annonce.updateAnnonce(1, 'Mercedez', 'Année 2020', '1', 'En ligne', '06/06')
  await db_proposition.updateProposition(1, '1', 'Voici une magnifique Mercedez A1 Sportback 40 TFSI 200ch S line S tronic 6 de 2020', '08/06')

  // Read user/annonce/proposition by ID
  const userById = await db_user.getUserById(1);
  console.log('Utilisateur par ID :', userById);
  const annonceById = await db_annonce.getAnnonceById(1);
  console.log('Annonce par ID :', annonceById)
  const propositionById = await db_proposition.getPropositionById(1);
  console.log('Proposition par ID :', propositionById)


  // Delete
  await db_user.deleteUser(1);
  await db_annonce.deleteAnnonce(1);
  await db_proposition.deleteProposition(1);
}

main().catch(err => console.error(err));
