angular = require("angular");

angular.module("app").controller("EditCandidateController", ["$scope", "$q", "candidate", "OscarService", function($scope, $q, candidate, oscarService) {
    $scope.candidate = candidate;
}]);