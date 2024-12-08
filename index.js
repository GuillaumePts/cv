const express = require('express');
const path = require('path');
const app = express();
const port = 3000;
const session = require('express-session');
require('dotenv').config();
const nodemailer = require('nodemailer');



const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});


async function envoyerEmail(req) {
  try {
    const timestamp = new Date().toISOString(); // Horodatage de la visite

    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,    
      to: 'guillaume.pitois1@gmail.com',   
      subject: 'Quelqu\'un regarde ton cv !',    
      text: `Ceci est un message texte. 
      Informations de la visite :
      - Date et heure de la visite: ${timestamp}`,
      html: `<b>Ceci est un message HTML</b>
      <p>Informations de la visite :</p>
      <ul>
        <li><b>Date et heure</b>: ${timestamp}</li>
      </ul>`
    });

    console.log('Email envoyé : %s', info.messageId);
  } catch (err) {
    console.error('Erreur lors de l\'envoi de l\'email :', err);
  }
}

// Route principale
app.get('/', async (req, res) => {
  try {
    await envoyerEmail(); 
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  } catch (err) {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  }
  
});

app.use(express.static(path.join(__dirname, 'public')));


// Route pour le téléchargement de fichier
app.get('/download', (req, res) => {
  const filePath = path.join(__dirname, 'diplome.pdf');
  res.download(filePath, 'diplome.pdf', (err) => {
    if (err) {
      console.error('Erreur lors du téléchargement :', err);
      res.status(500).send('Erreur lors du téléchargement.');
    }
  });
});

// Lancement du serveur
app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});
