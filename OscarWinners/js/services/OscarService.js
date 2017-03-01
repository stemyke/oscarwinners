angular = require("angular");

angular.module("app").service("OscarService", ["$http", "$q", function ($http, $q) {

	var candidatesDeferred;
	
	var getCandidates = function() {
	    if (candidatesDeferred != null) return candidatesDeferred.promise;
	    candidatesDeferred = $q.defer();
	    $http.get("candidates_data.json").then(function(result) {
            candidatesDeferred.resolve(result.data);
	    });
		return candidatesDeferred.promise;
	}
	
	var getCandidateById = function(id) {
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
	
	var getNextId = function() {
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
	
	var addCandidate = function (candidate) {
        var deferred = $q.defer();
        getCandidates().then(function (candidates) {
		    candidates.push(candidate);
            deferred.resolve(candidates.length - 1);
        });
        return deferred.promise;
	}
	
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
	
	return {
		getCandidates: getCandidates,
		getCandidateById: getCandidateById,
		getNextId: getNextId,
		addCandidate: addCandidate,
		updateCandidate: updateCandidate
	}
}]);