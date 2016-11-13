angular.module('Streem-Test.controllers', [])

.controller('LoginCtrl', function($scope, LoginService, $ionicPopup, $state) {
  $scope.data = {};
  $scope.login = function() {
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
  $scope.searchResults = [];
  $scope.lastResultLength = 0;
  $scope.searchQuery = "";

  $scope.newSearch = function() {
    $scope.searchResults = [];
    $scope.search();
  }

  $scope.clearSearch = function () {
      console.log('clear search');
      $scope.searchQuery = "";
  }

  $scope.search = function () {
      SearchService.searchQuery($scope.searchQuery).then(function (searchResults) {
          var result = searchResults.data;
          $scope.lastResultLength = result.length;

          for(var i = 0; i < result.length; i++) {
            $scope.searchResults.push(result[i]);
          }
      });
      $scope.$broadcast('scroll.infiniteScrollComplete');
  }

  $scope.canLoadMore = function() {
    return ($scope.lastResultLength > 0) ? true : false;
  }
})
