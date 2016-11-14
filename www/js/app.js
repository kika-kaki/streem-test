angular.module('Streem-Test', ['ionic', 'Streem-Test.controllers', 'Streem-Test.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
  .state('login', {
      url: '/login-form',
      templateUrl: 'templates/login-form.html',
      controller: 'LoginCtrl'
  })
  .state('home', {
    url: '/home',
    templateUrl: 'templates/home.html',
    controller: 'HomeCtrl'
  })


  $urlRouterProvider.otherwise('/login-form');

});
