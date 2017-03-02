angular = require("angular");

//F�jl v�ltoz�s direkt�va
angular.module("app").directive("onFileChange", function () {
    
    //F�jl beolvas�sa ut�n megh�v�dik a html-ben megadott kezel� f�ggv�ny az eredm�nnyel
    var onLoad = function (scope, reader, handler) {
        return function () {
            scope.$apply(function () {
                handler(reader.result);
            });
        };
    };
    
    //Direkt�va fel�p�t�se
    return {
        restrict: "A",
        link: function (scope, element, attrs) {
            //Kezel� f�ggv�ny �rtelmez�se
            var handler = scope.$eval(attrs.onFileChange);
            //F�jl mez� �rt�k�nek v�ltoz�s�ra feliratkozunk
            element.bind("change", function () {
                var files = element[0].files;
                if (files) {
                    //L�trehozzuk a f�jl beolvas�t, majd beolvastatjuk vele a f�jlt
                    var reader = new FileReader();
                    reader.onload = onLoad(scope, reader, handler);
                    reader.readAsDataURL(files[0]);
                }
            });
        }
    };
});