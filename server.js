const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Stelle sicher, dass der Root-Ordner freigegeben ist
app.use(express.static(__dirname));

// Liefere index.html für die Startseite
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => console.log(`Server läuft auf Port ${PORT}`));
