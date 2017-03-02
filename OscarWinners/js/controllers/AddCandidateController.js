angular = require("angular");

//Jelölt hozzáadására szolgáló controller
angular.module("app").controller("AddCandidateController", ["$scope", "$location", "OscarService", "id", function ($scope, $location, oscarService, id) {
        
    //Új jelölt
    $scope.candidate = {
        id: id
    };
        
    //Borító frissítése
    $scope.updateCover = function (cover) {
        $scope.candidate.cover = cover;
    };
        
    //Adatok mentése
    $scope.submit = function (invalid) {
        if (invalid) return;
        oscarService.addCandidate($scope.candidate).then(function () {
            $location.path("/candidates");
        });
    };

}]);