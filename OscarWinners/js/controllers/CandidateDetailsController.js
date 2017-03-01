angular = require("angular");

angular.module("app").controller("CandidateDetailsController", ["$scope", "candidate", function($scope, candidate) {
    $scope.candidate = candidate;
}]);