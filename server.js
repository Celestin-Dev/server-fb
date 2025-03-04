const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const axios = require("axios");

const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.urlencoded({extended : true}));

app.post('/webhook-chatfuel', async(req, res) => {
  const data = req.body;
  console.log("Données reçues:", data);

  if (data.etat === 'on') {
    console.log(`Etat reçu: ${data.etat}`); 

    // URL de l'API esp32
    const chatfuelUrl = 'http://192.168.43.154:80/webhook';

    // Exemple de payload à envoyer à esp32
    const payload = {
      etat: "on"
    };

    try {
      const response = await axios.post(chatfuelUrl, payload, {
        headers: { "Content-Type": "application/json" },
      });

      console.log("Réponse de esp32:", response.data);
      res.json({ status: 'success', message: 'Données envoyées à esp32' });

    } catch (error) {
      console.error("Erreur lors de l'envoi à esp32:", error.message);
      res.status(500).json({ status: 'error', message: 'Echec de l\'envoi à esp32' });
    }
  }else if(data.etat === 'off'){
    // URL de l'API ESP32
    const chatfuelUrl = 'http://192.168.43.154:80/webhook';

    // Exemple de payload à envoyer à ESP32
    const payload = {
      etat: "off"
    };

    try {
      const response = await axios.post(chatfuelUrl, payload, {
        headers: { "Content-Type": "application/json" },
      });

      console.log("Réponse de Chatfuel:", response.data);
      res.json({ status: 'success', message: 'Données envoyées à esp32' });

    } catch (error) {
      console.error("Erreur lors de l'envoi à Chatfuel:", error.message);
      res.status(500).json({ status: 'error', message: 'Echec de l\'envoi à esp32' });
    }
  }else {
    res.json({ status: 'success', message: 'Aucune donnée envoyée' });
  }
});

// Écoute la requête HTTP
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port: ${PORT}`);
});