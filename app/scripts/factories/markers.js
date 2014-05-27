'use strict';

angular.module('iziUiApp')
.factory('MarkersFactory', function($http, API_URL) {

  return {
    create: function(marker, successCallback, errorCallback) {
      return $http({
        method: 'post',
        url: API_URL + 'markers',
        data: marker
      })
      .success(successCallback)
      .error(errorCallback);
    },

    update: function(marker, successCallback, errorCallback) {
      return $http({
        method: 'put',
        url: API_URL + 'markers',
        data: marker
      })
      .success(successCallback)
      .error(errorCallback);
    },

    list: function(successCallback, errorCallback) {
      return $http({
        method: 'get',
        url: API_URL + 'markers'
      })
      .success(successCallback)
      .error(errorCallback);
    },

    find: function(id, successCallback, errorCallback) {
      return $http({
        method: 'get',
        url: API_URL + 'markers/' + id
      })
      .success(successCallback)
      .error(errorCallback);
    },

    delete: function(id, successCallback, errorCallback) {
      return $http({
        method: 'delete',
        url: API_URL + 'markers/' + id
      })
      .success(successCallback)
      .error(errorCallback);
    }
  };
});