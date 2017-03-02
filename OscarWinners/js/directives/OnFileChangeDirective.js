angular = require("angular");

//Fájl változás direktíva
angular.module("app").directive("onFileChange", function () {
    
    //Fájl beolvasása után meghívódik a html-ben megadott kezelõ függvény az eredménnyel
    var onLoad = function (scope, reader, handler) {
        return function () {
            scope.$apply(function () {
                handler(reader.result);
            });
        };
    };
    
    //Direktíva felépítése
    return {
        restrict: "A",
        link: function (scope, element, attrs) {
            //Kezelõ függvény értelmezése
            var handler = scope.$eval(attrs.onFileChange);
            //Fájl mezõ értékének változására feliratkozunk
            element.bind("change", function () {
                var files = element[0].files;
                if (files) {
                    //Létrehozzuk a fájl beolvasót, majd beolvastatjuk vele a fájlt
                    var reader = new FileReader();
                    reader.onload = onLoad(scope, reader, handler);
                    reader.readAsDataURL(files[0]);
                }
            });
        }
    };
});