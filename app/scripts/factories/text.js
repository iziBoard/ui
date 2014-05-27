'use strict';

angular.module('iziUiApp')
.factory('TextFactory', function($http, API_URL) {

  return {
    create: function(text, successCallback, errorCallback) {
      return $http({
        method: 'post',
        url: API_URL + 'texts',
        data: text
      })
      .success(successCallback)
      .error(errorCallback);
    },

    update: function(text, successCallback, errorCallback) {
      return $http({
        method: 'put',
        url: API_URL + 'texts',
        data: text
      })
      .success(successCallback)
      .error(errorCallback);
    },

    list: function(successCallback, errorCallback) {
      return $http({
        method: 'get',
        url: API_URL + 'texts'
      })
      .success(successCallback)
      .error(errorCallback);
    },

    find: function(id, successCallback, errorCallback) {
      return $http({
        method: 'get',
        url: API_URL + 'texts/' + id
      })
      .success(successCallback)
      .error(errorCallback);
    },

    delete: function(id, successCallback, errorCallback) {
      return $http({
        method: 'delete',
        url: API_URL + 'texts/' + id
      })
      .success(successCallback)
      .error(errorCallback);
    }
  };
});