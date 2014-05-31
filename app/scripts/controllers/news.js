'use strict';


// Please note that $modalInstance represents a modal window (instance) dependency.
// It is not the same as the $modal service used above.

var NewsInstanceCtrl = function ($scope, $modalInstance, $http, item) {

  if( item ){
    $scope.newsitem = item;
  }else{
    $scope.newsitem = {};
  }

  $scope.newsModalOk = function () {
    $modalInstance.close($scope.newsitem);
  };

  $scope.newsModalCancel = function () {
    $modalInstance.dismiss('cancel');
  };

  function twoDigits(d) {
    if(0 <= d && d < 10){
      return '0' + d.toString();
    }
    if(-10 < d && d < 0){
      return '-0' + (-1*d).toString();
    }
    return d.toString();
  }

  Date.prototype.toMysqlFormat = function () {
    return this.getUTCFullYear() + '-' + twoDigits(1 + this.getUTCMonth()) + '-' + twoDigits(this.getUTCDate()) + ' ' + twoDigits(this.getUTCHours()) + ':' + twoDigits(this.getUTCMinutes()) + ':' + twoDigits(this.getUTCSeconds());
  };
};


angular.module('iziUiApp')
.controller('NewsController', function ($scope, NewsFactory, $log, $http, $modal) {

  $scope.orderProp = 'created_at';
  $scope.quantity = 3;
  $scope.orderType = true; //false = ASC, true = DESC

  NewsFactory.list(function (result) {
    $scope.news = result.data;
  }, function (result) {
    $log.warn(result);
  });

  $scope.openNewsModal = function (news){
    var modalInstance = $modal.open({
      templateUrl: 'views/modals/newsModalContent.html',
      controller: NewsInstanceCtrl,
      resolve: {
        item: function () {
          return news;
        }
      }
    });

    modalInstance.result.then(function (selectedItem) {
      if( $scope.news.indexOf(selectedItem) === -1 ){
        // If news doesn't exist, splice and POST
        var d = new Date().toMysqlFormat();
        selectedItem.created_at = d;
        $scope.news.splice(0, 0, selectedItem);
        if( $scope.news.length > 3 ){
          $scope.news.pop();
        }
        NewsFactory.create(selectedItem, function (result) {
          $log.info(result);
        }, function (result) {
          $log.warn(result);
        });
      }else{
        NewsFactory.update(selectedItem, function (result) {
          $log.info(result);
        }, function (result) {
          $log.warn(result);
        });
      }

    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };

  $scope.deleteNews = function (news) {
    NewsFactory.delete(news.id, function (result) {
      var index = $scope.news.indexOf(result.data);
      $scope.news.splice(index, 1);
    }, function (result) {
      $log.warn(result);
    });
  };

});