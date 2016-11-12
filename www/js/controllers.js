angular.module('Streem-Test.controllers', [])

.controller('LoginCtrl', function($scope, LoginService, $ionicPopup, $state) {
  $scope.data = {};
  $scope.login = function() {
        console.log("LOGIN user: " + $scope.data.username + " - PW: " + $scope.data.password);

        LoginService.loginUser($scope.data.username, $scope.data.password).success(function(data) {
            window.localStorage.setItem("auth_token", data.data.auth_token);
            $state.go('home');
        }).error(function(data) {
            var alertPopup = $ionicPopup.alert({
                title: 'Login failed!',
                template: 'Please check your credentials!'
            });
        });
  }
})

.controller('HomeCtrl', function($scope, SearchService) {
  //$scope.data = {};
  $scope.searchQuery = "";

  $scope.clearSearch = function () {
      $scope.searchKey = "";
  }

  $scope.search = function () {
      SearchService.searchQuery($scope.searchQuery).then(function (searchResults) {
          $scope.searchResults = searchResults.data;
      });
  }

  $scope.canLoadMore = function() {
    return (typeof $scope.searchResults !== 'undefined' && $scope.searchResults.length > 0) ? true : false;
  }
})
