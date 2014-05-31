'use strict';

angular.module('iziUiApp')
.controller('PageController', function ($scope, $log, PageFactory, $stateParams) {

  $scope.pageId = $stateParams.pageId;

  PageFactory.find($scope.pageId, function (result) {
    $log.info(result);
    $scope.page = result.data[0];
  }, function (result) {
    $log.warn(result);
  });

  $scope.setPageType = function (type) {
    $scope.page.type = type;
  };

  $scope.setPagePermissions = function (permissions) {
    $scope.page.permissions = permissions;
  };

  $scope.savePage = function (page) {
    PageFactory.update(page, function (result){
      $log.info(result);
    }, function (result){
      $log.warn(result);
    });
  };


});
