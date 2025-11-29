const express = require('express');
const path = require('path');
const multer = require('multer');
const app = express();
const PORT = process.env.PORT || 3000;

// Upload-Ordner für Dateien
const upload = multer({ dest: 'uploads/' });

// Statische Dateien ausliefern
app.use(express.static(__dirname));

// Startseite
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Upload-Route
app.post('/upload', upload.single('meinedatei'), (req, res) => {
  console.log(req.file); // Infos über hochgeladene Datei
  res.send('Datei erfolgreich hochgeladen!');
});

app.listen(PORT, () => console.log(`Server läuft auf Port ${PORT}`));
