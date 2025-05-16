// userRoutes.test.js
const chai = require('chai');
const expect = chai.expect;
const request = require('supertest');
const app = require('./app'); // Importez votre application Express

describe('User Routes', () => {
  it('GET /users - Récupère tous les utilisateurs', (done) => {
    request(app)
      .get('/users')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.be.an('array');
        done();
      });
  });

  it('POST /users - Crée un nouvel utilisateur', (done) => {
    request(app)
      .post('/users')
      .send({ name: 'John Doe', email: 'johnteddst@example.com' })
      .expect(201)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.have.property('message').equal('Utilisateur créé avec succès');
        done();
      });
  });

  // Exemple :
  it('GET /users/:id - Récupère un utilisateur par ID', (done) => {
    request(app)
      .get('/users/2')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('id').equal(2); // Vérifie si l'utilisateur a bien l'ID 1 (ajustez selon vos besoins)
        done();
      });
  });
});
