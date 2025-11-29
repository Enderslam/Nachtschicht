const express = require('express');
const path = require('path');
const app = express();

// Dieser Befehl macht den "public"-Ordner für die Website zugänglich
app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server läuft erfolgreich!"));
