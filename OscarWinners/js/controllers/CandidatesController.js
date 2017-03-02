angular = require("angular");

//Jel�ltek list�j�nak megjelen�t�s�re szolg�l� controller
angular.module("app").controller("CandidatesController", ["$scope", "candidates", function ($scope, candidates) {
    //Jelenlegi oldal
    $scope.currentPage = 0;
    //Jel�ltek sz�ma oldalank�nt
    $scope.pageSize = 5;
    //Jel�ltek
    $scope.candidates = candidates;
    //Sz�rt jel�ltek, ezt a html-ben sz�rj�k keres�s �s az alapj�n, hogy csak a nyerteseket n�zz�k-e
    $scope.results = [];
    //Jelenlegi oldal lek�rdez�se (ez fut le a lapozott jel�ltek sz�r�s�n�l, �gy ha a be�ll�tott oldal a sz�r�s ut�n m�r nem l�tezne akkor be�ll�tjuk az utols� lehets�ges oldalt
    $scope.getCurrentPage = function() {
        $scope.numberOfPages = Math.ceil($scope.results.length / $scope.pageSize);
        $scope.currentPage = Math.max(0, Math.min($scope.numberOfPages - 1, $scope.currentPage));
        return $scope.currentPage;
    };
}]);