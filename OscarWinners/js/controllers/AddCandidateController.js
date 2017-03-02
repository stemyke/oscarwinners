angular = require("angular");

//Jel�lt hozz�ad�s�ra szolg�l� controller
angular.module("app").controller("AddCandidateController", ["$scope", "$location", "OscarService", "id", function ($scope, $location, oscarService, id) {
        
    //�j jel�lt
    $scope.candidate = {
        id: id
    };
        
    //Bor�t� friss�t�se
    $scope.updateCover = function (cover) {
        $scope.candidate.cover = cover;
    };
        
    //Adatok ment�se
    $scope.submit = function (invalid) {
        if (invalid) return;
        oscarService.addCandidate($scope.candidate).then(function () {
            $location.path("/candidates");
        });
    };

}]);