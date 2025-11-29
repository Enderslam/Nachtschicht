const express = require('express');
const multer = require('multer');
const { google } = require('googleapis');
const path = require('path');
const { Readable } = require('stream');

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
    // Prüfen, ob die Environment Variable gesetzt ist
    if (!process.env.GOOGLE_SERVICE_ACCOUNT_JSON) {
      throw new Error('GOOGLE_SERVICE_ACCOUNT_JSON ist nicht gesetzt!');
    }

    // Google Drive Auth über Environment Variable
    const auth = new google.auth.GoogleAuth({
      credentials: JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON),
      scopes: ['https://www.googleapis.com/auth/drive.file']
    });

    const drive = google.drive({ version: 'v3', auth });

    // Datei hochladen (Buffer → Stream)
    const fileMetadata = { name: req.file.originalname };
    const media = {
      mimeType: req.file.mimetype,
      body: Readable.from(req.file.buffer)
    };

    const file = await drive.files.create({
      resource: fileMetadata,
      media,
      fields: 'id, webViewLink'
    });

    // Erfolgreich → Link zurückgeben
    res.send(`
      Datei hochgeladen! <br>
      <a href="${file.data.webViewLink}" target="_blank">Hier downloaden</a>
    `);
  } catch (err) {
    // Fehler ausgeben, damit man sieht, was genau schiefgeht
    console.error('UPLOAD ERROR:', err);
    res.status(500).send(`Fehler beim Hochladen auf Google Drive: <pre>${err.message}</pre>`);
  }
});

app.listen(PORT, () => console.log(`Server läuft auf Port ${PORT}`));
