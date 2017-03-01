angular = require("angular");

angular.module("app").controller("EditCandidateController", ["$scope", "$q", "candidate", function($scope, $q, candidate) {
    $scope.candidate = candidate;
}]);