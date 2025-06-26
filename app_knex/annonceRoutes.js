// annonceRoutes.js
const express = require('express');
const router = express.Router();
const annonceModel = require('./annonceModel');
const tokenModel = require('./tokenModel')

// Récupérer toutes les annonces
router.get('/annonces', async (req, res) => {
  try {
    const annonces = await annonceModel.getAllAnnonces();
    res.json(annonces);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Récupérer une annonce par ID
router.get('/annonces/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const annonce = await annonceModel.getAnnonceById(id);
    res.json(annonce);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Créer une nouvelle annonce
router.post('/annonces', async (req, res) => {
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
  const { title, body, status } = req.body;
  try {
    await annonceModel.createAnnonce(title, body, user_id, status, created_at);
    res.status(201).json({ message: 'Annonce créé avec succès' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Mettre à jour une annonce existante
router.put('/annonces/:id', async (req, res) => {

  const { id } = req.params;
  const { title, body, status, created_at } = req.body;
  try {
    await annonceModel.updateAnnonce(id, title, body, user_id, status, created_at);
    res.json({ message: 'Annonce mise à jour avec succès' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Supprimer une annonce
router.delete('/annonces/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await annonceModel.deleteAnnonce(id);
    res.json({ message: 'Annonce supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;