'use strict';

angular.module('iziUiApp')
.controller('PostController', function ($scope, BlogFactory, $log, $stateParams, $http, API_URL) {

  $scope.postId = $stateParams.postId;

  BlogFactory.find($scope.postId, function (result) {
    $log.info(result);
    $scope.post = result.data;
  }, function (result) {
    $log.warn(result);
  });


  $scope.addImage = function (post, dropfile) {
    var image = {
      id: post.id,
      type: 'Blogpost',
      originalName: '',
      name: '',
      ext: '',
      filename: '',
      thumbnail: '',
      file: dropfile
    };

    $http.post(API_URL + 'imageable', image).success(function (data) {
      post.images.push(image);
    });
  };

  $scope.addText = function (post) {
    var text = {
      id: post.id,
      type: 'Blogpost',
      description: 'My text'
    };

    $http.post(API_URL + 'texts', text).success(function (data) {
      post.texts.push(data);
    });
  };

  $scope.savePost = function (post) {
    BlogFactory.update(post, function (result) {
      $log.info(result);
    }, function (result) {
      $log.warn(result);
    });
  };

  $scope.getBlogitems = function (post) {
    var items = [];

    if( typeof post !== 'undefined' ){
      items = items.concat(post.images);
      items = items.concat(post.texts);
    }

    items.sort(compare);

    return items;
  };

  function compare(a,b) {
    if (a.created_at < b.created_at){
      return -1;
    }
    if (a.created_at > b.created_at){
      return 1;
    }
    return 0;
  }

});