angular = require("angular");

angular.module("app").controller("CandidatesController", ["$scope", "candidates", function($scope, candidates) {
    $scope.candidates = candidates;
}]);