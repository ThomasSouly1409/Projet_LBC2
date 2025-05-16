const http = require('http');
const url = require('url');
const querystring = require('querystring');

class Voiture {
  constructor(couleur) {
    this.vitesse = 0;
    this.couleur = couleur;
  }


  roule(vitesse) {
    this.vitesse = vitesse;
  }

  getVitesse() {
    return this.vitesse;
  }

  // get(path, handler) {
  //   this.routes.GET[path] = handler;
  // }

  // post(path, handler) {
  //   this.routes.POST[path] = handler;
  // }

  // handleRequest(request, response) {
  // }
}

const voiture = new Voiture("bleu")
console.info(voiture.couleur)

voiture.couleur = "jaune";

console.info(voiture.couleur)

console.info(voiture.roule(90))



// class Express {
//   constructor() {
//     this.path = null;
//     this.func = null
//   }


//   get(path, func) {
//     this.path = path;
//     this.func = func
//   }

//   run() {
//     return this.func();
//   }

//   // get(path, handler) {
//   //   this.routes.GET[path] = handler;
//   // }

//   // post(path, handler) {
//   //   this.routes.POST[path] = handler;
//   // }

//   // handleRequest(request, response) {
//   // }
// }

// const app = new Express()
// app.get('/api/data', (req, res) => {
//   console.info('hello')
// })

// app.run()

