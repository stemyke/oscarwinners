angular = require("angular");

//Jelölt részletes adatinak megtekintésére szolgló controller
angular.module("app").controller("CandidateDetailsController", ["$scope", "candidate", function ($scope, candidate) {
    //Jelölt mentése scopeba
    $scope.candidate = candidate;
}]);