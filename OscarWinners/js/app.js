//modulok betöltése
angular = require("angular");
jQuery = require("jquery");
require("bootstrap");
require("angular-ui-router");
require("angular-translate");
require("angular-translate-loader-static-files");
require("../dist/js/templates");

//state lista
states = [
    {
        name: "home",
        url: "/home",
        templateUrl: "home.html",
        controller: "HomeController",
        show: true
    },
    {
        name: "home2",
        url: "/home2",
        templateUrl: "home.html",
        controller: "HomeController",
        show: true
    }
];

//beállítások
angular.module("app", ["ui.router", "pascalprecht.translate", "templatesModule"])
    .config(["$stateProvider", "$urlRouterProvider", "$locationProvider", "$translateProvider", function ($stateProvider, $urlRouterProvider, $locationProvider, $translateProvider) {
        
        //state kezelés
        angular.forEach(states, function (state) {
            $stateProvider.state(state.name, state);
        });
        
        //default state megadása
        $urlRouterProvider.otherwise("/home");
        
        //html5 mód engedélyezése
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
        
        //fordítás fájlok betöltése
        $translateProvider.useStaticFilesLoader({
            prefix: "translations/",
            suffix: ".json"
        });
        
        //alapértelmezett nyelv beállítása
        var preferredLanguage = localStorage.getItem("language");
        if (!preferredLanguage) {
            preferredLanguage = "hu";
            localStorage.setItem("language", preferredLanguage);
        }
        $translateProvider.preferredLanguage(preferredLanguage);

        //"fertőtlenítő" stratégia beállítása
        $translateProvider.useSanitizeValueStrategy("sanitizeParameters");
    }]).
    run(["$rootScope", "$state", function ($rootScope, $state) {
        $rootScope.states = states;
        $rootScope.routerState = $state;
    }]);

require("HomeController");