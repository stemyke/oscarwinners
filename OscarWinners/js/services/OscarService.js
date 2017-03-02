angular = require("angular");

//Oscar díjra jelölt filmeket kezelõ service
angular.module("app").service("OscarService", ["$http", "$q", function ($http, $q) {
        
        //json fájl aszinkron betöltését segíti
        var candidatesDeferred;
        
        //Jelöltek lekérdezése
        var getCandidates = function () {
            if (candidatesDeferred != null) return candidatesDeferred.promise;
            candidatesDeferred = $q.defer();
            $http.get("candidates_data.json").then(function (result) {
                candidatesDeferred.resolve(result.data);
            });
            return candidatesDeferred.promise;
        }
        
        //Jelölt lekérdezése id alapján
        var getCandidateById = function (id) {
            var deferred = $q.defer();
            getCandidates().then(function (candidates) {
                for (var i = 0; i < candidates.length; i++) {
                    if (candidates[i].id == id) {
                        var candidate = JSON.parse(JSON.stringify(candidates[i]));
                        deferred.resolve(candidate);
                        return;
                    }
                }
                deferred.resolve(null);
            });
            return deferred.promise;
        }
        
        //Következõ lehetésges id lekérdezése
        var getNextId = function () {
            var deferred = $q.defer();
            getCandidates().then(function (candidates) {
                var id = 0;
                for (var i = 0; i < candidates.length; i++) {
                    if (candidates[i].id > id) id = candidates[i].id;
                }
                deferred.resolve(id + 1);
            });
            return deferred.promise;
        }
        
        //Jelölt hozzáadása
        var addCandidate = function (candidate) {
            var deferred = $q.defer();
            getCandidates().then(function (candidates) {
                candidates.push(candidate);
                deferred.resolve(candidates.length - 1);
            });
            return deferred.promise;
        }
        
        //Jelölt frissítése
        var updateCandidate = function (candidate) {
            var deferred = $q.defer();
            getCandidates().then(function (candidates) {
                for (var i = 0; i < candidates.length; i++) {
                    if (candidates[i].id == candidate.id) {
                        candidates[i] = candidate;
                        deferred.resolve(i);
                        break;
                    }
                }
            });
            return deferred.promise;
        }
        
        //Service függvényei
        return {
            getCandidates: getCandidates,
            getCandidateById: getCandidateById,
            getNextId: getNextId,
            addCandidate: addCandidate,
            updateCandidate: updateCandidate
        }
    }]);