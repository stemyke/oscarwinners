angular = require("angular");

//Adathalmaz adott indextől való lekérdezésére szolgáló szűrő
angular.module("app").filter("startFrom", function () {
    return function (input, start) {
        start = parseInt(start);
        return input.slice(start);
    }
});