'use strict';

angular.module('iziUiApp')
.controller('NavController', function ($scope, $log, PageFactory, ProductFactory, BlogFactory) {

  PageFactory.list(function (result) {
    $log.info(result);
    $scope.pages = result.data;
  }, function (result) {
    $log.warn(result);
  });

  ProductFactory.list(function (result) {
    $log.info(result);
    $scope.products = result.data;
  }, function (result) {
    $log.warn(result);
  });

  BlogFactory.list(function (result) {
    $log.info(result);
    $scope.posts = result.data;
  }, function (result) {
    $log.warn(result);
  });

});
