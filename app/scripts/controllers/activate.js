'use strict';

angular.module('iziUiApp')
.controller('ActivateController', function ($scope, UserFactory) {
  
  $scope.message = 'This is the activate page, only for activating inactive users by their special token.';

  $scope.activate = function (credentials) {
    UserFactory.postActivate(credentials, function (result) {
      console.log('ok');
      console.log(result);
    }, function (result) {
      console.log('fail');
      console.log(result);
    });
  };

});
