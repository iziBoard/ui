'use strict';

angular
  .module('iziUiApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngStorage',
    'ui.router',
    'ui.bootstrap',
    'angularFileUpload',
    'placeholders',
    'google-maps',
    'iziFilters'
  ])

  .constant('API_URL', 'http://api.izi.local/')

  .constant('AUTH_EVENTS', {
    loginSuccess: 'auth-login-success',
    loginFailed: 'auth-login-failed',
    logoutSuccess: 'auth-logout-success',
    sessionTimeout: 'auth-session-timeout',
    notAuthenticated: 'auth-not-authenticated',
    notAuthorized: 'auth-not-authorized'
  })

  .constant('USER_ROLES', {
    all: '*',
    admin: {admin:1},
    user: {user:1}
  })

  .config(function ($stateProvider, $urlRouterProvider, USER_ROLES) {

    $urlRouterProvider.otherwise('/');

    // Public routes
    $stateProvider
      .state('public', {
        abstract: true,
        template: '<ui-view/>',
        data: {
          authorizedRoles: [USER_ROLES.all]
        }
      })
      .state('public.home', {
        url: '/',
        templateUrl: 'views/public.html',
        controller: 'MainController'
      })
      .state('public.login', {
        url: '/login',
        templateUrl: 'views/login.html',
        controller: 'LoginController'
      })
      .state('public.register', {
        url: '/register',
        templateUrl: 'views/register.html',
        controller: 'RegisterController'
      });

    $stateProvider
      .state('pages', {
        abstract: true,
        template: '<ui-view/>',
        data: {
          authorizedRoles: [USER_ROLES.all]
        }
      })
      .state('pages.details', {
        url: '/pages/:pageId',
        templateUrl: 'views/pages/page.html',
        controller: 'PageController'
      });

    $stateProvider
      .state('products', {
        abstract: true,
        template: '<ui-view />',
        data: {
          authorizedRoles: [USER_ROLES.all]
        }
      })
      .state('products.details', {
        url: '/products/:productId',
        templateUrl: 'views/products/product.html',
        controller: 'ProductController'
      });

    $stateProvider
      .state('blog', {
        url: '/blog/',
        templateUrl: 'views/blogs/blog.html',
        controller: 'BlogController',
        data: {
          authorizedRoles: [USER_ROLES.all]
        }
      })
      .state('blog.details', {
        views: {
          'details@blog': {
            templateUrl: 'views/blogs/details.html',
            controller: 'PostController'
          }
        },
        url: ':postId'
      });

    // User routes
    $stateProvider
      .state('user', {
        abstract: true,
        template: '<ui-view/>',
        data: {
          authorizedRoles: [USER_ROLES.user]
        }
      })
      .state('user.profile', {
        url: '/profile',
        templateUrl: 'views/user/profile.html',
        controller: 'ProfileController'
      });

    // Admin routes
    $stateProvider
      .state('admin', {
        abstract: true,
        template: '<ui-view/>',
        data: {
          authorizedRoles: [USER_ROLES.admin]
        }
      })
      .state('admin.home', {
        url: '/admin',
        templateUrl: 'views/admin/home.html',
        controller: 'AdminController'
      });
  })

/*
Not needed it seems
  .config(['$httpProvider', function ($httpProvider) {
      $httpProvider.defaults.useXDomain = true;
      delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }
  ])
*/
/*
Not needed it seems
  .config(['$sceDelegateProvider', function($sceDelegateProvider) {
      $sceDelegateProvider.resourceUrlWhitelist(['self', /^https?:\/\/(api\.)?joblan.local/]);
    }
  ])
*/

  .config(function ($httpProvider) {
    $httpProvider.interceptors.push(['$injector',
      function ($injector) {
        return $injector.get('AuthInterceptor');
      }
    ]);
  })

  .run(function ($rootScope, AUTH_EVENTS, USER_ROLES, AuthService, Session, $log, $state, Geocoder) {
      $rootScope.currentUser = null;
      $rootScope.userRoles = USER_ROLES;
      $rootScope.isAuthorized = AuthService.isAuthorized;
      $rootScope.isAuthenticated = AuthService.isAuthenticated;
      $rootScope.logout = AuthService.logout;

      $rootScope.pageTypes = ['front', 'text', 'news', 'carousel', 'maps', 'faq'];
      $rootScope.pagePermissions = ['*', 'user', 'admin'];

      $rootScope.productsEnabled = true;
      $rootScope.blogsEnabled = true;

      $rootScope.productTypes = ['typ1', 'typ2'];

      $rootScope.geocoder = Geocoder;
      Session.restore();

      $rootScope.$on('$stateChangeStart', function (event, next) {
        var permissions = next.data.authorizedRoles;
        if(!AuthService.isAuthenticated()){
          $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
          if(!AuthService.isAuthorized(permissions)){
            event.preventDefault();
            $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
          }else{
            $log.info('Permitted but not logged in');
          }
        }else{
          if(!AuthService.isAuthorized(permissions)){
            event.preventDefault();
            $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
          }else{
            $log.info('Permitted and logged in');
          }
        }
      });

      $rootScope.$on(AUTH_EVENTS.loginSuccess, function (data) {
        $log.info('Event: loginSuccess');
        if(!AuthService.isAuthorized(USER_ROLES.admin)){
          $state.go('user.profile');
        }else{
          $state.go('admin.home');
        }

        $log.log(data);
      });

      $rootScope.$on(AUTH_EVENTS.loginFailed, function (data) {
        $log.info('Event: loginFailed');
        $log.log(data);
      });

      $rootScope.$on(AUTH_EVENTS.logoutSuccess, function (data) {
        $log.info('Event: logoutSuccess');
        $state.go('public.home');

        $log.log(data);
      });

      $rootScope.$on(AUTH_EVENTS.sessionTimeout, function (data) {
        $log.info('Event: sessionTimeout');
        $state.go('public.login');
        $log.log(data);
      });

      $rootScope.$on(AUTH_EVENTS.notAuthenticated, function (data) {
        $log.info('Event: notAuthenticated');
        $log.log(data);
      });

      $rootScope.$on(AUTH_EVENTS.notAuthorized, function (data) {
        $log.info('Event: notAuthorized');
        $state.go('public.login');
        $log.log(data);
      });
    }
  );