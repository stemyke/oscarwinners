angular = require("angular");

angular.module("app").controller("HeaderController", ["$scope", "$translate", function ($scope, $translate) {
    $scope.changeLang = function (lang) {
        localStorage.setItem("language", lang);
        $translate.use(lang);
    }
}]);