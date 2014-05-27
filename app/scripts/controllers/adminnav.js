'use strict';

angular.module('iziUiApp')
.controller('AdminNavController', function ($scope, $log, PageFactory, $rootScope, ProductFactory) {

  $scope.createPage = function () {
    var page = {
      type: $rootScope.pageTypes[0],
      title: 'my title',
      heading: 'my heading',
      description: 'my description'
    };
    PageFactory.create(page, function (result) {
      $log.info('Page created');
      $log.info(result);
      $scope.pages.push(result.data);
    }, function (result) {
      $log.warn('Page not created');
      $log.warn(result);
    });
  };

  $scope.deletePage = function (page) {
    PageFactory.delete(page.id, function (result) {
      $log.info('Page ' + page.id + 'deleted');
      $log.info(result);
    }, function (result) {
      $log.warn('Page not deleted');
      $log.warn(result);
    });
  };

  $scope.createProduct = function () {
    var product = {
      type: $rootScope.productTypes[0],
      title: 'my product',
      heading: 'my product heading',
      description: 'my product descriptiuon'
    };
    ProductFactory.create(product, function (result) {
      $log.info(result);
      //$scope.products.push(result.data);
    }, function (result) {
      $log.warn(result);
    });
  };

  $scope.deleteProduct = function (product) {
    ProductFactory.delete(product.id, function (result) {
      $log.info(result);
    }, function (result) {
      $log.warn(result);
    });
  };

});
