// propositionRoutes.js
const express = require('express');
const router = express.Router();
const propositionModel = require('./propositionModel');
const tokenModel = require('./tokenModel')


// Récupérer toutes les propositions
router.get('/propositions', async (req, res) => {
  try {
    const propositions = await propositionModel.getAllPropositions();
    res.json(propositions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Récupérer une proposition par ID
router.get('/propositions/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const proposition = await propositionModel.getPropositionById(id);
    res.json(proposition);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Créer une nouvelle proposition
router.post('/propositions', async (req, res) => {
    if (!req.headers.authorization) {
      return res.status(403).json({ error: "Token obligatoire" });
    }
  
    const token = req.headers.authorization;
    const tokenDb = await tokenModel.getTokenById(token)
    if (!tokenDb) {
      return res.status(403).json({ error: "Token invalide" });
    }
  
  const user_id = tokenDb.user_id
  const created_at = new Date()
  const { annonce_id, message } = req.body;
  try {
    await propositionModel.createProposition(annonce_id, user_id, message, created_at);
    res.status(201).json({ message: 'Proposition créé avec succès' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Mettre à jour une proposition existante
router.put('/propositions/:id', async (req, res) => {
  if (!req.headers.authorization) {
    return res.status(403).json({ error: "Token obligatoire" });
  }

  const token = req.headers.authorization;
  const tokenDb = await tokenModel.getTokenById(token);
  if (!tokenDb) {
    return res.status(403).json({ error: "Token invalide" });
  }

  const user_id = tokenDb.user_id;
  const { id } = req.params;

  const proposition = await propositionModel.getPropositionById(id);
  if (!proposition) {
    return res.status(404).json({ error: "La proposition n'existe pas" });
  }
  if (proposition.user_id !== user_id) {
    return res.status(403).json({ error: "Action non autorisée" });
  }

  const { annonce_id, message } = req.body;

  try {
    await propositionModel.updateProposition(id, annonce_id, user_id, message);
    res.json({ message: "Proposition mise à jour avec succès" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Supprimer une annonce
router.delete('/propositions/:id', async (req, res) => {
    if (!req.headers.authorization) {
      return res.status(403).json({ error: "Token obligatoire" });
    }
  
    const token = req.headers.authorization;
    const tokenDb = await tokenModel.getTokenById(token)
    if (!tokenDb) {
      return res.status(403).json({ error: "Token invalide" });
    }
  
  const { id } = req.params;

    const propositionExist_delete = await propositionModel.getPropositionById(id);
    if (!propositionExist_delete) {
      return res.status(404).json({ error: "La proposition existe pas" });
    }
    if (propositionExist_delete.user_id != tokenDb.user_id) {
      return res.status(403).json({ error: "Action non autorisée" });
    } 

  try {
    await propositionModel.deleteProposition(id);
    res.json({ message: 'Proposition supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;