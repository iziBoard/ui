'use strict';

angular.module('iziUiApp')
.factory('UrlFactory', function($http, API_URL) {

  return {
    create: function(url, successCallback, errorCallback) {
      return $http({
        method: 'post',
        url: API_URL + 'urls',
        data: url
      })
      .success(successCallback)
      .error(errorCallback);
    },

    update: function(url, successCallback, errorCallback) {
      return $http({
        method: 'put',
        url: API_URL + 'urls/' + url.id,
        data: url
      })
      .success(successCallback)
      .error(errorCallback);
    },

    list: function(successCallback, errorCallback) {
      return $http({
        method: 'get',
        url: API_URL + 'urls'
      })
      .success(successCallback)
      .error(errorCallback);
    },

    find: function(url, successCallback, errorCallback) {
      return $http({
        method: 'get',
        url: API_URL + 'urls/' + url.id
      })
      .success(successCallback)
      .error(errorCallback);
    },

    delete: function(url, successCallback, errorCallback) {
      return $http({
        method: 'delete',
        url: API_URL + 'url/' + url.id
      })
      .success(successCallback)
      .error(errorCallback);
    }
  };
});