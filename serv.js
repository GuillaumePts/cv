const express = require('express');
const path = require('path');
const app = express();
const port = 9999;

app.use(express.static(path.join(__dirname, 'public')));
// Route principale qui renvoie le fichier HTML

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


app.get('/download', (req, res) => {
  const filePath = path.join(__dirname, 'diplome.pdf');
  res.download(filePath, 'diplome.pdf', (err) => {
      if (err) {
          console.error('Erreur lors du téléchargement :', err);
          res.status(500).send('Erreur lors du téléchargement.');
      }
  });
});


// Démarrer le serveur
app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});
