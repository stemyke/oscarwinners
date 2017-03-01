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
        name: "candidates",
        url: "/candidates",
        templateUrl: "candidates.html",
        controller: "CandidatesController",
        resolve: {
            candidates: ["OscarService", function (oscarService) {
                    return oscarService.getCandidates();
                }]
        },
        show: true
    },
    {
        name: "winners",
        url: "/winners",
        templateUrl: "candidates.html",
        controller: "CandidatesController",
        resolve: {
            candidates: ["OscarService", function (oscarService) {
                    return oscarService.getCandidates();
                }]
        },
        show: true
    },
    {
        name: "edit",
        url: "/edit?id",
        templateUrl: "html/candidate_form.html",
        controller: "EditCandidateController",
        resolve: {
            candidate: ["OscarService", "$stateParams", function (oscarService, $stateParams) {
                return oscarService.getCandidateById($stateParams.id);
            }]
        },
        show: false
    }
];

//beállítások
angular.module("app", ["ui.router", "pascalprecht.translate", "templatesModule"])
    .config(["$urlRouterProvider", "$stateProvider", "$locationProvider", "$translateProvider", function ($urlRouterProvider, $stateProvider, $locationProvider, $translateProvider) {
        
        
        //default state megadása
        $urlRouterProvider.otherwise("/home");
        
        //state kezelés
        angular.forEach(states, function (state) {
            $stateProvider.state(state.name, state);
        });
        
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
        console.log(preferredLanguage);
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

require("HeaderController");
require("HomeController");
require("CandidatesController");
require("EditCandidateController");
require("OscarService");
require("StartFromFilter");