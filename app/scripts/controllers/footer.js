'use strict';

var SocialInstanceCtrl = function ($scope, $modalInstance, item) {

  if( item ){
    $scope.url = item;
  }else{
    $scope.url = {};
  }

  $scope.socialModalOk = function () {
    $modalInstance.close($scope.url);
  };

  $scope.socialModalCancel = function () {
    $modalInstance.dismiss('cancel');
  };

  $scope.getUrlName = function (url) {
    if( url.indexOf('facebook') !== -1 ) {
      return 'facebook';
    } else if( url.indexOf('github') !== -1 ) {
      return 'github';
    } else if( url.indexOf('google') !== -1 ) {
      return 'google';
    } else if( url.indexOf('linkedin') !== -1 ) {
      return 'linkedin';
    } else if( url.indexOf('instagram') !== -1 ) {
      return 'instagram';
    } else if( url.indexOf('twitter') !== -1 ) {
      return 'twitter';
    } else if( url.indexOf('blogger') !== -1 ) {
      return 'blogger';
    } else if( url.indexOf('digg') !== -1 ) {
      return 'digg';
    } else if( url.indexOf('instagram') !== -1 ) {
      return 'instagram';

    // TODO: Add more...

    } else {
      // Default to 'heart'
      return 'heart';
    }
  };
};

angular.module('iziUiApp')
.controller('FooterController', function ($scope, FooterFactory, TextFactory, UrlFactory, API_URL, $log, $modal) {
  
  $scope.footerTypes = ['text', 'social', 'contact'];

  FooterFactory.list(function (result) {
    $scope.footers = result.data;
  }, function (result) {
    $log.warn(result);
  });

  $scope.newFooter = function (title, type) {
    if( $scope.footers.length < 4 ) {
      var footer = {
        title: title,
        type: type
      };
      FooterFactory.create(footer, function (result) {
        $scope.footers.push(result.data);
      }, function (result) {
        $log.warn(result);
      });
    } else {
//      addAlert({ type: 'warning', msg: 'There can only be 4 footer columns'});
    }
  };

  $scope.saveFooter = function (footer) {
    FooterFactory.update(footer, function (result) {
      $log.info(result);
    }, function (result) {
      $log.warn(result);
    });
  };

  $scope.deleteFooter = function (footer) {
    FooterFactory.delete(footer, function (result) {
      var index = $scope.footers.indexOf(result.data);
      $scope.footers.splice(index,1);
    }, function (result) {
      $log.warn(result);
    });
  };

  $scope.addItem = function (footer) {
    var type = footer.type;
    if ( type === 'text' ) {
      var text = {
        id: footer.id,
        type: 'Footer',
        description: 'My text'
      };
      TextFactory.create(text, function (result) {
        footer.texts.push(result.data);
      }, function (result) {
        $log.warn(result);
      });
    } else if ( type === 'social' ) {
      // TODO: OPEN MODAL
    }
  };

  $scope.deleteText = function (footer, text) {
    TextFactory.delete(text, function (result) {
      var index = footer.texts.indexOf(result.data);
      footer.texts.splice(index,1);
    }, function (result) {
      $log.warn(result);
    });
  };

  $scope.deleteUrl = function (footer, url) {
    UrlFactory.delete(url, function (result) {
      var index = footer.urls.indexOf(result.data);
      footer.urls.splice(index,1);
    }, function (result) {
      $log.warn(result);
    });
  };

  $scope.setFooterType = function (footer, type) {
    footer.type = type;
  };

  $scope.getUrlName = function (url) {
    if( url.indexOf('facebook') !== -1 ) {
      return 'facebook';
    } else if( url.indexOf('github') !== -1 ) {
      return 'github';
    } else if( url.indexOf('google') !== -1 ) {
      return 'google';
    } else if( url.indexOf('linkedin') !== -1 ) {
      return 'linkedin';
    } else if( url.indexOf('instagram') !== -1 ) {
      return 'instagram';
    } else if( url.indexOf('twitter') !== -1 ) {
      return 'twitter';
    } else if( url.indexOf('blogger') !== -1 ) {
      return 'blogger';
    } else if( url.indexOf('digg') !== -1 ) {
      return 'digg';
    } else if( url.indexOf('instagram') !== -1 ) {
      return 'instagram';

    // TODO: Add more...

    } else {
      // Default to 'heart'
      return 'heart';
    }
  };

  $scope.openSocialModal = function (footer, url) {
    // Open modal
    var modalInstance = $modal.open({
      templateUrl: 'views/modals/socialModalContent.html',
      controller: SocialInstanceCtrl,
      resolve: {
        item: function () {
          return url;
        }
      }
    });

    modalInstance.result.then(function (selectedItem) {
      var url = {
        id: footer.id,
        title: selectedItem.title,
        url: selectedItem.url
      };
      UrlFactory.create(url, function (result) {
        footer.urls.push(result.data);
      }, function (result) {
        $log.warn(result);
      });
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };

});