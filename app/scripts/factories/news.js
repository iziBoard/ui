'use strict';

angular.module('iziUiApp')
.factory('NewsFactory', function($http, API_URL) {

  return {
    create: function(news, successCallback, errorCallback) {
      return $http({
        method: 'post',
        url: API_URL + 'news',
        data: news
      })
      .success(successCallback)
      .error(errorCallback);
    },

    update: function(news, successCallback, errorCallback) {
      return $http({
        method: 'put',
        url: API_URL + 'news/' + news.id,
        data: news
      })
      .success(successCallback)
      .error(errorCallback);
    },

    list: function(successCallback, errorCallback) {
      return $http({
        method: 'get',
        url: API_URL + 'news'
      })
      .success(successCallback)
      .error(errorCallback);
    },

    find: function(id, successCallback, errorCallback) {
      return $http({
        method: 'get',
        url: API_URL + 'news/' + id
      })
      .success(successCallback)
      .error(errorCallback);
    },

    delete: function(id, successCallback, errorCallback) {
      return $http({
        method: 'delete',
        url: API_URL + 'news/' + id
      })
      .success(successCallback)
      .error(errorCallback);
    }
  };
});