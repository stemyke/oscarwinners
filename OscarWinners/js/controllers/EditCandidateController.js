angular = require("angular");

angular.module("app").controller("EditCandidateController", ["$scope", "$q", "$location", "OscarService", "candidate", function($scope, $q, $location, oscarService, candidate) {
        
    $scope.candidate = candidate;
        
    $scope.updateCover = function (cover) {
        $scope.candidate.cover = cover;
    };    
     
    $scope.submit = function (invalid) {
        if (invalid) return;
        oscarService.updateCandidate($scope.candidate);
        $location.path("/candidates");
    };

}]);