'use strict';

angular.module('iziUiApp')
.factory('UserFactory', function($http, API_URL) {

  return {
    postCreate: function(user, successCallback, errorCallback) {
      return $http({
        method: 'post',
        url: API_URL + 'users',
        data: user
      })
      .success(successCallback)
      .error(errorCallback);
    },

    find: function(user, successCallback, errorCallback) {
      return $http({
        method: 'get',
        url: API_URL + 'users/' + user
      })
      .success(successCallback)
      .error(errorCallback);
    },

    list: function(successCallback, errorCallback) {
      return $http({
        method: 'get',
        url: API_URL + 'users'
      })
      .success(successCallback)
      .error(errorCallback);
    }
  };
});