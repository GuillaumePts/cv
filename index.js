const express = require('express');
const path = require('path');
const app = express();
const port = 3000;
const axios = require('axios');
const bodyParser = require('body-parser');
require('dotenv').config();
const nodemailer = require('nodemailer');
const RECAPTCHA_SECRET = process.env.RECAPTCHA_SECRET;





async function envoyerEmail() {

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    const timestamp = new Date().toISOString(); 

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

app.use(bodyParser.urlencoded({ extended: true }));


// Route principale
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'captcha.html'));
});

app.use(express.static(path.join(__dirname, 'public')));

// Route pour valider le CAPTCHA
app.post('/validate-captcha', async (req, res) => {
  const captchaResponse = req.body['g-recaptcha-response'];

  if (!captchaResponse) {
    return res.status(400).send('CAPTCHA non rempli.');
  }

  try {
    
    const verification = await axios.post(
      'https://www.google.com/recaptcha/api/siteverify',
      null,
      {
        params: {
          secret: RECAPTCHA_SECRET,
          response: captchaResponse,
        },
      }
    );

    if (verification.data.success) {
      envoyerEmail()
      res.sendFile(path.join(__dirname, 'public', 'index.html'));
    } else {
      res.status(400).send('CAPTCHA invalide.');
    }
  } catch (err) {
    console.error('Erreur lors de la validation du CAPTCHA :', err);
    res.status(500).send('Erreur serveur.');
  }
});



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
