angular = require("angular");

angular.module("app").directive("onFileChange", function () {
    
    var onLoad = function (scope, reader, handler) {
        return function () {
            scope.$apply(function () {
                handler(reader.result);
            });
        };
    };
    
    return {
        restrict: "A",
        link: function (scope, element, attrs) {
            var handler = scope.$eval(attrs.onFileChange);
            element.bind("change", function () {
                var files = element[0].files;
                if (files) {
                    var reader = new FileReader();
                    reader.onload = onLoad(scope, reader, handler);
                    reader.readAsDataURL(files[0]);
                }
            });
        }
    };
});