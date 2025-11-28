const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.post("/save", (req, res) => {
    fs.writeFile("data.txt", req.body.text, () => {
        res.json({ status: "OK" });
    });
});

app.listen(3000, () => {
    console.log("Server läuft auf Port 3000");
});
