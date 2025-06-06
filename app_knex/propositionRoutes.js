// propositionRoutes.js
const express = require('express');
const router = express.Router();
const propositionsModel = require('./propositionModel');

// Récupérer toutes les propositions
router.get('/propositions', async (req, res) => {
  try {
    const propositions = await propositionsModel.getAllPropositions();
    res.json(propositions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Récupérer une proposition par ID
router.get('/propositions/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const proposition = await propositionsModel.getPropositionById(id);
    res.json(proposition);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Créer une nouvelle proposition
router.post('/propositions', async (req, res) => {
  const { annonce_id, user_id, message, created_at } = req.body;
  try {
    await propositionsModel.createProposition(annonce_id, user_id, message, created_at);
    res.status(201).json({ message: 'Proposition créé avec succès' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Mettre à jour une proposition existante
router.put('/propositions/:id', async (req, res) => {
  const { id } = req.params;
  const { annonce_id, user_id, message, created_at } = req.body;
  try {
    await propositionsModel.updateProposition(id, annonce_id, user_id, message, created_at);
    res.json({ message: 'Proposition mise à jour avec succès' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Supprimer une annonce
router.delete('/propositions/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await annonceModel.deleteAnnonce(id);
    res.json({ message: 'Annonce supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;