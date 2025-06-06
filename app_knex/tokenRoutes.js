// tokenRoutes.js
const express = require('express');
const router = express.Router();
const tokenModel = require('./tokenModel');

// Récupérer tous les utilisateurs
router.get('/tokens', async (req, res) => {
  try {
    const tokens = await tokenModel.getAllTokens();
    res.json(tokens);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Récupérer un utilisateur par ID
router.get('/tokens/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const token = await tokenModel.getTokenById(id);
    res.json(token);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Créer un nouvel utilisateur
router.post('/tokens', async (req, res) => {
  const { email, token } = req.body;
  try {
    await tokenModel.createToken(email, token);
    res.status(201).json({ message: 'Token créé avec succès' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Mettre à jour un utilisateur existant
router.put('/tokens/:id', async (req, res) => {
  const { id } = req.params;
  const { email, token } = req.body;
  try {
    await tokenModel.updateTokens(id, email, token);
    res.json({ message: 'Token mis à jour avec succès' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Supprimer un utilisateur
router.delete('/tokens/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await tokenModel.deleteTokens(id);
    res.json({ message: 'Token supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;