const admin = require('firebase-admin');
function initializeAppSA() {
    const serviceAccount = require('../serviceAccountKey.json');
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });
    const db = admin.firestore();
    return db;
  }

  module.exports = initializeAppSA();