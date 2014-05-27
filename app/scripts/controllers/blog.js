'use strict';

angular.module('iziUiApp')
.controller('BlogController', function ($scope, BlogFactory, $log) {
  
  BlogFactory.list(function (result) {
    $scope.posts = result.data;
  }, function (result) {
    $log.warn(result);
  });

  $scope.createPost = function () {
    var post = {
      title: 'My blog post'
    };
    BlogFactory.create(post, function (result) {
      $scope.posts.push(result.data);
    }, function (result) {
      $log.warn(result);
    });
  };

});