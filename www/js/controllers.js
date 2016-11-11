angular.module('Streem-Test.controllers', [])

.controller('LoginCtrl', function($scope, LoginService, $ionicPopup, $state) {
  $scope.data = {};
  $scope.login = function() {
        console.log("LOGIN user: " + $scope.data.username + " - PW: " + $scope.data.password);

        LoginService.loginUser($scope.data.username, $scope.data.password).success(function(data) {
          console.log("data after login: ", data);
            $scope.data = data.auth_token;
            $state.go('home');
        }).error(function(data) {
            var alertPopup = $ionicPopup.alert({
                title: 'Login failed!',
                template: 'Please check your credentials!'
            });
        });
  }
})

.controller('HomeCtrl', function($scope) {
  $scope.data = {};
  $scope.searchQuery = "";

  $scope.clearSearch = function () {
      $scope.searchKey = "";
  }

  $scope.search = function () {
      SearchService.findByName($scope.searchKey).then(function (searchResults) {
          $scope.searchResults = searchResults;
      });
  }

  console.log("HOME page: " + JSON.stringify($scope.data));
})

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
