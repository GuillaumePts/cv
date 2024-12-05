const express = require('express');
const path = require('path');
const app = express();
const port = 9999;

app.use(express.static(path.join(__dirname, 'public')));
// Route principale qui renvoie le fichier HTML
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});


// Démarrer le serveur
app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});
