angular = require("angular");

angular.module("app").controller("HeaderController", ["$rootScope", "$scope", "$translate", "$filter", function ($rootScope, $scope, $translate, $filter) {
        
    //Címsor megváltoztatása   
    var changeTitle = function() {
        var stateName = $rootScope.routerState.current.name.toUpperCase();
        document.title = $filter("translate")("HEADER.TITLE") + "-" + $filter("translate")("PAGES." + stateName);
    };
        
    //Ha betöltődött a nyelvi fájl akkor címsor megváltoztatása
    $translate.onReady(changeTitle);
        
    //State változás sikeressége esetén címsor megváltoztatása
    $rootScope.$on("$stateChangeSuccess", changeTitle);    
        
    //Nyelv váltás
    $scope.changeLang = function (lang) {
        localStorage.setItem("language", lang);
        $translate.use(lang);
        changeTitle();
    }
}]);