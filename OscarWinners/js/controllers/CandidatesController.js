angular = require("angular");

//Jelöltek listájának megjelenítésére szolgáló controller
angular.module("app").controller("CandidatesController", ["$scope", "candidates", function ($scope, candidates) {
    //Jelenlegi oldal
    $scope.currentPage = 0;
    //Jelöltek száma oldalanként
    $scope.pageSize = 5;
    //Jelöltek
    $scope.candidates = candidates;
    //Szûrt jelöltek, ezt a html-ben szûrjük keresés és az alapján, hogy csak a nyerteseket nézzük-e
    $scope.results = [];
    //Jelenlegi oldal lekérdezése (ez fut le a lapozott jelöltek szûrésénél, így ha a beállított oldal a szûrés után már nem létezne akkor beállítjuk az utolsó lehetséges oldalt
    $scope.getCurrentPage = function() {
        $scope.numberOfPages = Math.ceil($scope.results.length / $scope.pageSize);
        $scope.currentPage = Math.max(0, Math.min($scope.numberOfPages - 1, $scope.currentPage));
        return $scope.currentPage;
    };
}]);