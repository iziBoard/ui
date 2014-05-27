'use strict';

angular.module('iziUiApp')
.controller('FaqController', function ($scope, $rootScope, FaqFactory, $log) {
  
  $scope.newQuestion = function (parent, parentType, title, body) {
    var question = {
      title: title,
      body: body,
      id: parent.id,
      type: parentType
    };

    FaqFactory.create(question, function (result) {
      $log.info(result);
      $rootScope.selectedPage.questions.push(result.data);
    }, function (result) {
      $log.warn(result);
    });
  };

  $scope.saveQuestion = function (question) {
    FaqFactory.update(question, function (result) {
      $log.info(result);
    }, function (result) {
      $log.warn(result);
    });
  };

  $scope.deleteQuestion = function (question) {
    FaqFactory.delete(question.id, function (result) {
      $log.info(result);
      var index = $rootScope.selectedPage.questions.indexOf(question);
      $rootScope.selectedPage.questions.splice(index,1);
    }, function (result) {
      $log.warn(result);
    });
  };

});