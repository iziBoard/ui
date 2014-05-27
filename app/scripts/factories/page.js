'use strict';

angular.module('iziUiApp')
.factory('PageFactory', function($http, API_URL) {

  return {
    create: function(page, successCallback, errorCallback) {
      return $http({
        method: 'post',
        url: API_URL + 'pages',
        data: page
      })
      .success(successCallback)
      .error(errorCallback);
    },

    update: function(page, successCallback, errorCallback) {
      return $http({
        method: 'put',
        url: API_URL + 'pages',
        data: page
      })
      .success(successCallback)
      .error(errorCallback);
    },

    list: function(successCallback, errorCallback) {
      return $http({
        method: 'get',
        url: API_URL + 'pages'
      })
      .success(successCallback)
      .error(errorCallback);
    },

    find: function(id, successCallback, errorCallback) {
      return $http({
        method: 'get',
        url: API_URL + 'pages/' + id
      })
      .success(successCallback)
      .error(errorCallback);
    },

    delete: function(id, successCallback, errorCallback) {
      return $http({
        method: 'delete',
        url: API_URL + 'pages/' + id
      })
      .success(successCallback)
      .error(errorCallback);
    }
  };
});