angular.module('Streem-Test.services', [])

.factory('LoginService', function($q, $http) {
    return {
        loginUser: function(name, pw) {
            var deferred = $q.defer();
            var promise = deferred.promise;
            var data =  JSON.stringify({user: {login: name, password: pw}} );
            var config = {
                headers : {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
                }
            };

            $http({
              method: 'POST',
              url: 'https://api.streem.com.au/v1/sessions',
              data: data, 
              config: config
            }).then(function successCallback(response) {
                deferred.resolve(response);
                return promise;
            }, function errorCallback(response) {
                deferred.reject(null, response);
                return promise;
            });
            
            promise.success = function(fn) {
                promise.then(fn);
                return promise;
            }
            promise.error = function(fn) {
                promise.then(null, fn);
                return promise;
            }


            return promise;
        }
    }
})

.factory('SearchService', function($q, $http) {
    return {
        searchQuery: function(query) {
            var deferred = $q.defer();
            var promise = deferred.promise;

            var baseUrl = "https://api.streem.com.au/v1/search?";
            var token = window.localStorage.getItem("auth_token");

            var timestamp = new Date().getTime();
            timestamp = Math.floor(timestamp/1000);

            var data = query.split(",");
            data = data.map(function(d) {
              d = d.replace(/^\s\s*/, '').replace(/\s\s*$/, ''); /* trimming the white space on the beginning and the end of the searched phrase*/
              return '"' + d + '"';
            });
            
            var url = baseUrl + "before="+timestamp+"&auth_token=" + token + "&limit=10&query=" + encodeURIComponent(data.join(","));
            $http({
              method: 'GET',
              url: url,
              config : {
                headers:  {
                  'Access-Control-Allow-Origin': 'https://api.streem.com.au'
                }
              }
            }).then(function successCallback(response) {
                deferred.resolve(response);
                return promise;
            }, function errorCallback(response) {
                deferred.reject(null, response);
                return promise;
            });
            
            promise.success = function(fn) {
                promise.then(fn);
                return promise;
            }
            promise.error = function(fn) {
                promise.then(null, fn);
                return promise;
            }


            return promise;
        }
    }
});