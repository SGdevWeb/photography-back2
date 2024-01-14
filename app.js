const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql");
require("dotenv").config();

const app = express();

app.use(cors());

app.use(bodyParser.json());

// Configuration de la connexion à la base de données
const connexion = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

connexion.connect((err) => {
  if (err) {
    console.error("Erreur  lors de la connexion à la base de données : ", err);
    return;
  }
  console.log("Connexion à la base de donnée réussie !");
});

// Route pour récupérer les données de la table "location"
app.get("/api/locations", (req, res) => {
  const query = "SELECT * FROM location";

  connexion.query(query, (err, results) => {
    if (err) {
      console.error("Erreur lors de la récupération des locations :", err);
      res
        .status(500)
        .json({ error: "Erreur lors de la récupération des locations" });
      return;
    }

    res.json(results);
  });
});

module.exports = app;
