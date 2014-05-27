'use strict';

angular.module('iziUiApp')
.controller('RegisterController', function ($scope, UserFactory) {
  
  $scope.message = 'This is the registration form, should only be available for guests.';

  $scope.create = function (user) {
    UserFactory.postCreate(user, function (result) {
      console.log('ok');
      console.log(result);
    }, function (result) {
      console.log('fail');
      console.log(result);
    });
  };

});
