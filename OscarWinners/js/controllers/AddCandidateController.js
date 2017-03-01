angular = require("angular");

angular.module("app").controller("AddCandidateController", ["$scope", "$location", "OscarService", function ($scope, $location, oscarService) {
        
    $scope.candidate = {
        id: oscarService.getNextId()
    };
        
    $scope.updateCover = function (cover) {
        $scope.candidate.cover = cover;
    };
        
    $scope.submit = function (invalid) {
        if (invalid) return;
        oscarService.addCandidate($scope.candidate).then(function () {
            $location.path("/candidates");
        });
    };

}]);