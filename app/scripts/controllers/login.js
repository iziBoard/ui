'use strict';

angular.module('iziUiApp')
.controller('LoginController', function ($scope, $rootScope, AuthService, AUTH_EVENTS) {

  $scope.message = 'This is the login page, should disappear when the user is logged in';
  
  // For testing... remove me later
  $scope.user = {
    email: 'admin@admin.se',
    password: 'admin'
  };

  $scope.login = function (credentials) {
    AuthService.login(credentials).then(function () {
      //console.log('LoginController: login success');
      $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
    }, function () {
      //console.log('LoginController: login failed');
      $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
    });
  };

});
