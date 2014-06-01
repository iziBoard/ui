'use strict';

angular.module('iziUiApp')
.factory('AuthService', function($http, Session, API_URL, USER_ROLES, $log, $rootScope, AUTH_EVENTS) {

  return {
    login: function (credentials) {
      return $http({
        method: 'post',
        url: API_URL + 'auth',
        data: credentials
      })
      .success( function (result) {
        $log.log(result);
      })
      .error( function (result) {
        $log.log(result);
      })
      .then(function (result){
        Session.create(result.data.data.id, result.data.data.persistCode, result.data.data.permissions);
      });
    },
    logout: function () {
      return $http({
        method: 'delete',
        url: API_URL + 'auth/' + Session.id + '?token=' + Session.token
      })
      .error( function (result) {
        $log.log(result);
        Session.destroy();
        $rootScope.$broadcast(AUTH_EVENTS.sessionTimeout);
      }).
      then( function (result) {
        $log.log(result);
        Session.destroy();
        $rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);
      });
    },
    isAuthenticated: function () {
      return !!Session.id && !!Session.token;
    },
    isAuthorized: function (permissions) {
      if( typeof permissions !== 'object'){
        var key = permissions;
        permissions = {};
        permissions[key] = 1;
      }

      if (!angular.isArray(permissions)) {
        permissions = [permissions];
      }
      if( permissions.indexOf(USER_ROLES.all) !== -1 ){
        return true;
      }
      var hasPermission = false;
      for( var i = 0; i < permissions.length; i++ ){
        var keys = Object.keys(permissions[i]);
        for( var j = 0; j < keys.length; j++ ){
          if( !(angular.isUndefined(Session.permissions) || Session.permissions === null) ){
            if( Session.permissions.hasOwnProperty(keys[j]) && Session.permissions[keys[j]] === 1 ){
              hasPermission = true;
            }
          }
        }
      }
      //$log.log('Has permission: ' + (hasPermission || permissions.indexOf(USER_ROLES.all) !== -1));
      return hasPermission;
      //return (this.isAuthenticated() && permissions.indexOf(Session.permissions) !== -1);
    }
  };

});