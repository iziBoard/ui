'use strict';

angular.module('iziUiApp')
.factory('ProductFactory', function($http, API_URL) {

  return {
    create: function(product, successCallback, errorCallback) {
      return $http({
        method: 'post',
        url: API_URL + 'products',
        data: product
      })
      .success(successCallback)
      .error(errorCallback);
    },

    update: function(product, successCallback, errorCallback) {
      return $http({
        method: 'put',
        url: API_URL + 'products',
        data: product
      })
      .success(successCallback)
      .error(errorCallback);
    },

    list: function(successCallback, errorCallback) {
      return $http({
        method: 'get',
        url: API_URL + 'products'
      })
      .success(successCallback)
      .error(errorCallback);
    },

    find: function(id, successCallback, errorCallback) {
      return $http({
        method: 'get',
        url: API_URL + 'products/' + id
      })
      .success(successCallback)
      .error(errorCallback);
    },

    delete: function(id, successCallback, errorCallback) {
      return $http({
        method: 'delete',
        url: API_URL + 'products/' + id
      })
      .success(successCallback)
      .error(errorCallback);
    }
  };
});