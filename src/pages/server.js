const express = require("express");
const session = require('express-session');
const app = express();
const port = 5000;
const mysql = require("mysql");
const cors = require("cors");

// Middleware CORS
app.use(cors());

// Configuration de la base de données
const databaseCall = {
  host: "localhost",
  user: "root",
  password: "root",
  database: "pokemon",
  port: 3306
};

// Appel de la base de données
const database = mysql.createConnection(databaseCall);

// Middleware pour analyser les données JSON dans les requêtes
app.use(express.json());

// Connexion à la base de données
database.connect((err) => {
  if (err) {
    console.error('Erreur lors de la connexion à la base de données:', err);
    return;
  }
  console.log('Connecté à la base de données MySQL');
});

// Vos routes et logique de gestion des requêtes viendront ici...

// Démarrage du serveur
app.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port}`);
});

// Route POST pour ajouter un client
app.post('/client', (req, res) => {
    const { nom, prenom, commentaire } = req.body;
    
    // Vérifiez que tous les champs sont fournis
    if (!nom || !prenom || !commentaire) {
      return res.status(400).json({ message: "Veuillez fournir tous les champs." });
    }
    
    // Insérez les données dans la base de données
    const sql = "INSERT INTO client (nom, prenom, commentaire) VALUES (?, ?, ?)";
    database.query(sql, [nom, prenom, commentaire], (err, result) => {
      if (err) {
        console.error('Erreur lors de l\'insertion des données dans la base de données:', err);
        return res.status(500).json({ message: "Une erreur s'est produite lors de l'ajout du client." });
      }
      
      console.log('Données insérées avec succès dans la base de données.');
      res.status(200).json({ message: "Données insérées avec succès dans la base de données." });
    });
  });
    app.get('/client', (req, res) => {
      const sql = "SELECT * FROM client";
      database.query(sql, (err, results) => {
        if (err) {
          console.error('Erreur lors de la récupération des données:', err);
          return res.status(500).json({ message: "Une erreur s'est produite lors de la récupération des données." });
        }
        
        res.status(200).json(results);
      });
    
  });
  