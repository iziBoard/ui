'use strict';

angular.module('iziUiApp')
.factory('BlogFactory', function($http, API_URL) {

  return {
    create: function(post, successCallback, errorCallback) {
      return $http({
        method: 'post',
        url: API_URL + 'posts',
        data: post
      })
      .success(successCallback)
      .error(errorCallback);
    },

    update: function(post, successCallback, errorCallback) {
      return $http({
        method: 'put',
        url: API_URL + 'posts/' + post.id,
        data: post
      })
      .success(successCallback)
      .error(errorCallback);
    },

    list: function(successCallback, errorCallback) {
      return $http({
        method: 'get',
        url: API_URL + 'posts'
      })
      .success(successCallback)
      .error(errorCallback);
    },

    find: function(id, successCallback, errorCallback) {
      return $http({
        method: 'get',
        url: API_URL + 'posts/' + id
      })
      .success(successCallback)
      .error(errorCallback);
    },

    delete: function(id, successCallback, errorCallback) {
      return $http({
        method: 'delete',
        url: API_URL + 'posts/' + id
      })
      .success(successCallback)
      .error(errorCallback);
    }
  };
});