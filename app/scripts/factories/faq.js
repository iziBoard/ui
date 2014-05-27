'use strict';

angular.module('iziUiApp')
.factory('FaqFactory', function($http, API_URL) {

  return {
    create: function(faq, successCallback, errorCallback) {
      return $http({
        method: 'post',
        url: API_URL + 'questions',
        data: faq
      })
      .success(successCallback)
      .error(errorCallback);
    },

    update: function(faq, successCallback, errorCallback) {
      return $http({
        method: 'put',
        url: API_URL + 'questions',
        data: faq
      })
      .success(successCallback)
      .error(errorCallback);
    },

    list: function(successCallback, errorCallback) {
      return $http({
        method: 'get',
        url: API_URL + 'questions'
      })
      .success(successCallback)
      .error(errorCallback);
    },

    find: function(id, successCallback, errorCallback) {
      return $http({
        method: 'get',
        url: API_URL + 'questions/' + id
      })
      .success(successCallback)
      .error(errorCallback);
    },

    delete: function(id, successCallback, errorCallback) {
      return $http({
        method: 'delete',
        url: API_URL + 'questions/' + id
      })
      .success(successCallback)
      .error(errorCallback);
    }
  };
});