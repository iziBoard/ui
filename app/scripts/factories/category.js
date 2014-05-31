'use strict';

angular.module('iziUiApp')
.factory('CategoryFactory', function($http, API_URL) {

  return {
    create: function(category, successCallback, errorCallback) {
      return $http({
        method: 'post',
        url: API_URL + 'categories',
        data: category
      })
      .success(successCallback)
      .error(errorCallback);
    },

    update: function(category, successCallback, errorCallback) {
      return $http({
        method: 'put',
        url: API_URL + 'categories/' + category.id,
        data: category
      })
      .success(successCallback)
      .error(errorCallback);
    },

    list: function(successCallback, errorCallback) {
      return $http({
        method: 'get',
        url: API_URL + 'categories'
      })
      .success(successCallback)
      .error(errorCallback);
    },

    find: function(id, successCallback, errorCallback) {
      return $http({
        method: 'get',
        url: API_URL + 'categories/' + id
      })
      .success(successCallback)
      .error(errorCallback);
    },

    delete: function(id, successCallback, errorCallback) {
      return $http({
        method: 'delete',
        url: API_URL + 'categories/' + id
      })
      .success(successCallback)
      .error(errorCallback);
    }
  };
});