'use strict';

angular.module('iziUiApp')
.service('Geocoder', function ($rootScope, $localStorage, $log) {

  this.decode = function (addr, callback) {
    var geocoder = new google.maps.Geocoder();

    geocoder.geocode({
      'address': addr
    }, function (results, status) {
      var response = {};
      if( status === google.maps.GeocoderStatus.OK ){
        response = {
          success: true,
          err: null,
          results: results
        };
      }else{
        response = {
          success: false,
          err: new Error('Geocode was not successfor for the following reason: ' + status),
          results: null
        };
      }
      $log.info(response);
      callback(response);
    });
  };

});