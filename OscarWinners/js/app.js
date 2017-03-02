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
        name: "details",
        url: "/details?id",
        templateUrl: "candidate_details.html",
        controller: "CandidateDetailsController",
        resolve: {
            candidate: ["OscarService", "$stateParams", function (oscarService, $stateParams) {
                    return oscarService.getCandidateById($stateParams.id);
                }]
        },
        show: false
    },
    {
        name: "edit",
        url: "/edit?id",
        templateUrl: "candidate_form.html",
        controller: "EditCandidateController",
        resolve: {
            candidate: ["OscarService", "$stateParams", function (oscarService, $stateParams) {
                    return oscarService.getCandidateById($stateParams.id);
                }]
        },
        show: false
    },
    {
        name: "add",
        url: "/add",
        templateUrl: "candidate_form.html",
        controller: "AddCandidateController",
        resolve: {
            id: ["OscarService", function (oscarService) {
                    return oscarService.getNextId();
                }]
        },
        show: false
    }
];

//beállítások
angular.module("app", ["ui.router", "pascalprecht.translate", "templatesModule"])
    .config(["$translateProvider", "$urlRouterProvider", "$stateProvider", "$locationProvider", function ($translateProvider, $urlRouterProvider, $stateProvider, $locationProvider) {
        
        //alapértelmezett nyelv beállítása
        var preferredLanguage = localStorage.getItem("language");
        if (!preferredLanguage) {
            preferredLanguage = "hu";
            localStorage.setItem("language", preferredLanguage);
        }
        $translateProvider.preferredLanguage(preferredLanguage);
        
        //"fertőtlenítő" stratégia beállítása
        $translateProvider.useSanitizeValueStrategy("sanitizeParameters");
        
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
    }]).
    //Alkalmazás futtatása
    run(["$rootScope", "$state", function ($rootScope, $state) {
        $rootScope.states = states;
        $rootScope.routerState = $state;
    }]);

//Szükséges fájlok betöltése
require("HeaderController");
require("HomeController");
require("CandidatesController");
require("CandidateDetailsController");
require("AddCandidateController");
require("EditCandidateController");
require("OscarService");
require("OnFileChangeDirective");
require("StartFromFilter");