'use strict';

angular.module('iziUiApp')
.controller('ProfileController', function ($scope, UserFactory, Session, $log) {
  
  $scope.message = 'This is the profile page, some interesting information here.';
  
  $scope.profile = UserFactory.find(Session.id, function (result) {
    $log.info(result);
    $scope.user = result.data;
  }, function (result) {
    $log.warn(result);
  });
  
});
