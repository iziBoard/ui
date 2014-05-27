'use strict';

angular.module('iziUiApp')
.controller('CategoryController', function ($scope, CategoryFactory) {
  
  CategoryFactory.list(function (result) {
    $scope.categories = result.data;  
  }, function (result) {
    $log.warn($result);
  });
  
  $scope.tags = [];
});