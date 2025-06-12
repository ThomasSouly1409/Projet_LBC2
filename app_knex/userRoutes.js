// userRoutes.js
const express = require('express');
const router = express.Router();
const userModel = require('./userModel');
const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');
const tokenModel = require('./tokenModel')

// Récupérer tous les utilisateurs
router.get('/users', async (req, res) => {
  try {
    const users = await userModel.getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Récupérer un utilisateur par ID
router.get('/users/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const user = await userModel.getUserById(id);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Créer un nouvel utilisateur
router.post('/users', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    await userModel.createUser(name, email, password);
    res.status(201).json({ message: 'Utilisateur créé avec succès' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Mettre à jour un utilisateur existant
router.put('/users/:id', async (req, res) => {
  const { id } = req.params;
  const { name, email, password } = req.body;
  try {
    await userModel.updateUser(id, name, email, password);
    res.json({ message: 'Utilisateur mis à jour avec succès' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Supprimer un utilisateur
router.delete('/users/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await userModel.deleteUser(id);
    res.json({ message: 'Utilisateur supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Sign Up (création de compte, avec email/password/name donc create user)
router.post('/signup', async (req, res) => {
  const { name, email, password, created_at } = req.body;
  const passwordEncrypted = crypto.createHash('md5').update(password).digest('hex');
  try {
    await userModel.createUser(name, email, passwordEncrypted, created_at);
    res.status(201).json({ message: 'Utilisateur créé avec succès' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Sign In (connexion)
router.post('/signin', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.getUserByEmail(email);
    if (!user) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }
    const passwordEncrypted = crypto.createHash('md5').update(password).digest('hex');
    if (user.password !== passwordEncrypted) {
      return res.status(401).json({ error: 'Mot de passe incorrect' });
    }
    const token = uuidv4();
    await tokenModel.createToken(token, email);
    res.json({ message: 'Connexion réussie', token});
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

// Log out (déconnexion)
router.post('/logout', async (req, res) => {
  const { token } = req.body;
  try{
    await tokenModel.deleteToken(token);
    res.json({ message: 'Déconnexion réussie'});
  } catch (error) {
    res.status(500).json({ error: error.message});
  }
});

module.exports = router;
