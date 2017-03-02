angular = require("angular");

//Jelölt szerkesztésére szolgáló controller
angular.module("app").controller("EditCandidateController", ["$scope", "$location", "OscarService", "candidate", function($scope, $location, oscarService, candidate) {
        
    //Jelölt mentése scopeba
    $scope.candidate = candidate;
        
    //Borító frissítése
    $scope.updateCover = function (cover) {
        $scope.candidate.cover = cover;
    };    
        
    //Adatok mentése
    $scope.submit = function (invalid) {
        if (invalid) return;
        oscarService.updateCandidate($scope.candidate).then(function() {
            $location.path("/candidates");
        });
    };

}]);