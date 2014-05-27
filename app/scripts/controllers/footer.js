'use strict';

angular.module('iziUiApp')
.controller('FooterController', function ($scope, UserFactory, $http, API_URL, $log, $modal) {
  
  $scope.footerTypes = ['text', 'social', 'contact'];

  $http.get(API_URL + 'footers').success( function (data, status, headers, config) {
    $scope.footers = data;
  }).error(function (data, status, headers, config) {
    $log.warn(data);
  });

  $scope.newFooter = function (title, type) {
    if( $scope.footers.length < 4 ) {
      var footer = {
        title: title,
        type: type
      }
      $http.post(API_URL + 'footer', footer).success( function (data, status, headers, config) {
        $scope.footers.push( data );
      }).error( function (data, status, headers, config) {
        delToken();
        for (var i=0; i<data.messages.length; i++){ 
          addAlert({ type: data.type, msg: data.messages[i] });
        }
      });
    } else {
      addAlert({ type: 'warning', msg: "There can only be 4 footer columns"});
    }
  }

  $scope.saveFooter = function (footer) {
    $http.put(API_URL + 'footer', footer);
  }

  $scope.deleteFooter = function (footer) {
    var index = $scope.footers.indexOf(footer);
    $scope.footers.splice(index,1); 
    $http.delete(API_URL + 'footer/'+footer.id);
  }

  $scope.addItem = function (footer) {
    console.log( footer );
    var type = footer.type;
    if ( type == 'text' ) {
      var text = {
        id: footer.id,
        type: 'Footer',
        description: 'My text'
      };

      $http.post(API_URL + 'texts', text).success(function (data, status, headers, config) {
        footer.texts.push(data);
      }).error( function (data, status, headers, config) {
        console.log(data);
      });
    } else if ( type == 'social' ) {
      // TODO: OPEN MODAL
    }
  }

  $scope.deleteText = function (footer, text) {
    $http.delete(API_URL + 'texts/'+text.id).success( function (data, status, headers, config) {
      var index = footer.texts.indexOf(text);
      footer.texts.splice(index,1); 
    }).error( function (data, status, headers, config) {
      console.log(data);
    });
  }

  $scope.deleteUrl = function (footer, url) {
    $http.delete(API_URL + 'url/'+url.id).success( function (data, status, headers, config) {
      var index = footer.urls.indexOf(url);
      footer.urls.splice(index,1); 
    }).error( function (data, status, headers, config) {
      console.log(data);
    });
  }

  $scope.setFooterType = function (footer, type) {
    footer.type = type;
  }

  $scope.getUrlName = function (url) {
    if( url.indexOf('facebook') != -1 ) {
      return 'facebook';
    } else if( url.indexOf('github') != -1 ) {
      return 'github';
    } else if( url.indexOf('google') != -1 ) {
      return 'google';
    } else if( url.indexOf('linkedin') != -1 ) {
      return 'linkedin';
    } else if( url.indexOf('instagram') != -1 ) {
      return 'instagram';
    } else if( url.indexOf('twitter') != -1 ) {
      return 'twitter';
    } else if( url.indexOf('blogger') != -1 ) {
      return 'blogger';
    } else if( url.indexOf('digg') != -1 ) {
      return 'digg';
    } else if( url.indexOf('instagram') != -1 ) {
      return 'instagram';

    // TODO: Add more...

    } else {
      // Default to 'heart'
      return 'heart';
    }
  }

  $scope.openSocialModal = function (footer, url) {
    // Open modal
    var modalInstance = $modal.open({
      templateUrl: 'packages/wetcat/board/templates/socialModalContent.html',
      controller: SocialInstanceCtrl,
      resolve: {
        item: function () {
          return url;
        }
      }
    });

    modalInstance.result.then(function (selectedItem) {
      console.log('resulkt');
      //console.log(selectedItem);
      var url = {
        id: footer.id,
        title: selectedItem.title,
        url: selectedItem.url
      }

      $http.post('url', url).success( function (data, status, headers, config) {
        footer.urls.push(data);
      }).error( function (data, status, headers, config) {
        console.log('error');
        console.log(data);
      });
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };8

});