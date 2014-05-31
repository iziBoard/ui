'use strict';

angular.module('iziUiApp')
.factory('FooterFactory', function($http, API_URL) {

  return {
    create: function(footer, successCallback, errorCallback) {
      return $http({
        method: 'post',
        url: API_URL + 'footers',
        data: footer
      })
      .success(successCallback)
      .error(errorCallback);
    },

    update: function(footer, successCallback, errorCallback) {
      return $http({
        method: 'put',
        url: API_URL + 'footers/' + footer.id,
        data: footer
      })
      .success(successCallback)
      .error(errorCallback);
    },

    list: function(successCallback, errorCallback) {
      return $http({
        method: 'get',
        url: API_URL + 'footers'
      })
      .success(successCallback)
      .error(errorCallback);
    },

    find: function(footer, successCallback, errorCallback) {
      return $http({
        method: 'get',
        url: API_URL + 'footers/' + footer.id
      })
      .success(successCallback)
      .error(errorCallback);
    },

    delete: function(footer, successCallback, errorCallback) {
      return $http({
        method: 'delete',
        url: API_URL + 'footers/' + footer.id
      })
      .success(successCallback)
      .error(errorCallback);
    }
  };
});