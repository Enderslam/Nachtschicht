const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;

// Test route for Render
app.get("/", (req, res) => {
    res.send("Nachtschicht Server läuft erfolgreich über Render! 🚀");
});

app.listen(PORT, () => {
    console.log("Server gestartet auf Port: " + PORT);
});
