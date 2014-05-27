'use strict';

angular.module('iziUiApp')
.factory('ImageFactory', function($http, API_URL) {

  return {
    create: function(image, successCallback, errorCallback) {
      return $http({
        method: 'post',
        url: API_URL + 'imageables',
        data: image
      })
      .success(successCallback)
      .error(errorCallback);
    }

  };
});