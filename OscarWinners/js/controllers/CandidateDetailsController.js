angular = require("angular");

//Jel�lt r�szletes adatinak megtekint�s�re szolgl� controller
angular.module("app").controller("CandidateDetailsController", ["$scope", "candidate", function ($scope, candidate) {
    //Jel�lt ment�se scopeba
    $scope.candidate = candidate;
}]);