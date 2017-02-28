//Express alkalmaz�s l�trehoz�sa
express = require("express");
app = express();
path = require("path");

//F�jlok kiszolg�l�sa a dist mapp�b�l
app.use("/", express.static(__dirname + "/dist/"));

//Nem l�tez� f�jlok eset�ben az index.html-t adja vissza
app.get("/*", function (req, res) {
    res.sendFile(path.join(__dirname + "/dist/index.html"));
});

//hosztn�v �s port sz�m
hostname = "localhost";
port = 3000;

app.listen(port, hostname, function () {
    console.log("Server running at http://" + hostname + ":" + port + "/");
});