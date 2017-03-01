angular = require("angular");

angular.module("app").controller("CandidatesController", ["$scope", "candidates", function ($scope, candidates) {
    $scope.currentPage = 0;
    $scope.pageSize = 5;
    $scope.candidates = candidates;
    $scope.results = [];
    $scope.getCurrentPage = function() {
        $scope.numberOfPages = Math.ceil($scope.results.length / $scope.pageSize);
        $scope.currentPage = Math.max(0, Math.min($scope.numberOfPages - 1, $scope.currentPage));
        return $scope.currentPage;
    };
}]);