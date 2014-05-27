'use strict';

angular.module('iziUiApp')
.controller('MapsController', function ($scope, $rootScope, $log, Geocoder, MarkersFactory, $upload, API_URL) {

  $scope.map = {
    center: {
      latitude: 55.609505,
      longitude: 13.000072
    },
    zoom: 14
  };

  $scope.onFilePost = function ($files, parent, parentType) {
    for( var i = 0; i < $files.length; i++ ){
      var file = $files[i];

      $scope.upload = $upload.upload({
        url: API_URL + 'markers',
        method: 'post',
        data: {id: parent.id, type: parentType},
        file: file
      }).progress(function (evt) {
        $log.info('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
      }).success(function (result) {
        $log.info(result);
      });
    }
  };
  
});
