'use strict';

angular.module('iziUiApp')
.controller('AdminController', function ($scope, UserFactory, $log) {
  
  $scope.message = 'This is the admin page.';

  UserFactory.list(function (result) {
    $log.info(result);
    $scope.users = result.data;
  }, function (result) {
    $log.warn(result);
  });

});