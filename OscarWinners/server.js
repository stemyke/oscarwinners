//Express alkalmazás létrehozása
express = require("express");
app = express();
path = require("path");

//Fájlok kiszolgálása a dist mappából
app.use("/", express.static(__dirname + "/dist/"));

//Nem létezõ fájlok esetében az index.html-t adja vissza
app.get("/*", function (req, res) {
    res.sendFile(path.join(__dirname + "/dist/index.html"));
});

//hosztnév és port szám
hostname = "localhost";
port = 3000;

app.listen(port, hostname, function () {
    console.log("Server running at http://" + hostname + ":" + port + "/");
});