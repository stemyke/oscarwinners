angular = require("angular");

angular.module("app").controller("EditCandidateController", ["$scope", "$location", "OscarService", "candidate", function($scope, $location, oscarService, candidate) {
        
    $scope.candidate = candidate;
        
    $scope.updateCover = function (cover) {
        $scope.candidate.cover = cover;
    };    
     
    $scope.submit = function (invalid) {
        if (invalid) return;
        oscarService.updateCandidate($scope.candidate).then(function() {
            $location.path("/candidates");
        });
    };

}]);