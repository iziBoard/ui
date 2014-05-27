'use strict';

angular.module('iziUiApp')
.controller('TextController', function ($scope, $rootScope, TextFactory, $log) {

  // This should be fixed for polymorhpism
  $scope.newTextable = function (container, containerType, description) {
    var text = {
      id: container.id,
      type: containerType,
      description: description
    };
    TextFactory.create(text, function (result) {
      $log.info(result);
      $rootScope.selectedPage.texts.push(result.data);
    }, function (result) {
      $log.warn(result);
    });
  };

  $scope.updateText = function (text) {
    TextFactory.update(text, function (result) {
      $log.info(result);
    }, function (result) {
      $log.warn(result);
    });
  };

  $scope.deleteText = function (text) {
    TextFactory.delete(text.id, function (result) {
      $log.info(result);
      var index = $scope.selectedPage.texts.indexOf(text);
      $scope.selectedPage.texts.splice(index,1);
    }, function (result) {
      $log.warn(result);
    });
  };

  $scope.numCombined = '2p3s';

});
