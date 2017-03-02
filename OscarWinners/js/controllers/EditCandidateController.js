angular = require("angular");

//Jel�lt szerkeszt�s�re szolg�l� controller
angular.module("app").controller("EditCandidateController", ["$scope", "$location", "OscarService", "candidate", function($scope, $location, oscarService, candidate) {
        
    //Jel�lt ment�se scopeba
    $scope.candidate = candidate;
        
    //Bor�t� friss�t�se
    $scope.updateCover = function (cover) {
        $scope.candidate.cover = cover;
    };    
        
    //Adatok ment�se
    $scope.submit = function (invalid) {
        if (invalid) return;
        oscarService.updateCandidate($scope.candidate).then(function() {
            $location.path("/candidates");
        });
    };

}]);