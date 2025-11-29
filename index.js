const express = require("express");
const app = express();

// Render gibt den Port über die Umgebung vor
const PORT = process.env.PORT || 3000;

// Route für die Startseite
app.get("/", (req, res) => {
    res.send("Server läuft erfolgreich über Render! 🎉");
});

app.listen(PORT, () => {
    console.log("Server läuft auf Port " + PORT);
});
