'use strict';

angular.module('iziUiApp')
.controller('ProductController', function ($scope, $log, ProductFactory, $stateParams, $rootScope) {

  $scope.productId = $stateParams.productId;

  ProductFactory.find($scope.productId, function (result) {
    $log.info(result);
    $scope.product = result.data;
    $rootScope.selectedPage = result.data; // Both product and page are using this... hopefully shouldn't cause problem
  }, function (result) {
    $log.warn(result);
  });

  $scope.setProductType = function (type) {
    $scope.product.type = type;
  };

  $scope.setProductermissions = function (permissions) {
    $scope.product.permissions = permissions;
  };

  $scope.saveProduct = function (page) {
    ProductFactory.update(page, function (result){
      $log.info(result);
    }, function (result){
      $log.warn(result);
    });
  };


});
