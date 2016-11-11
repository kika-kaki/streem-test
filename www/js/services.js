angular.module('Streem-Test.services', [])

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
})

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
        findByName: function(name, pw) {
            var deferred = $q.defer();
            var promise = deferred.promise;
            var data =  JSON.stringify({user: {login: name, password: pw}} );
            //https://api.streem.com.au/v1/search?before=1478696400&authoken=abc123&limit=10&query="Donald Trump","Hillary Clinton"
            var config = {
                headers : {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
                }
            };

            $http({
              method: 'GET',
              url: 'https://api.streem.com.au/v1/search',
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
});