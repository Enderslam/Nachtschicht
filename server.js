const express = require('express');
const multer = require('multer');
const { google } = require('googleapis');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Multer speichert die Datei nur im Speicher
const upload = multer({ storage: multer.memoryStorage() });

// Statische Dateien ausliefern
app.use(express.static(__dirname));

// Startseite
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Upload-Route: Datei geht direkt auf Google Drive
app.post('/upload', upload.single('meinedatei'), async (req, res) => {
  try {
    // Google Drive Auth über Environment Variable
    const auth = new google.auth.GoogleAuth({
      credentials: JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON),
      scopes: ['https://www.googleapis.com/auth/drive.file']
    });

    const drive = google.drive({ version: 'v3', auth });

    const fileMetadata = { name: req.file.originalname };
    const media = { mimeType: req.file.mimetype, body: Buffer.from(req.file.buffer) };

    const file = await drive.files.create({
      resource: fileMetadata,
      media,
      fields: 'id, webViewLink'
    });

    res.send(`Datei hochgeladen! <a href="${file.data.webViewLink}" target="_blank">Hier downloaden</a>`);
  } catch (err) {
    console.error(err);
    res.status(500).send('Fehler beim Hochladen auf Google Drive');
  }
});

app.listen(PORT, () => console.log(`Server läuft auf Port ${PORT}`));
