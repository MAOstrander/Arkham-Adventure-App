// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.factories', 'starter.researchCtrls'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html'
  })
    .state('app.home', {
      url: '/home',
      views: {
        'menuContent': {
          templateUrl: 'templates/home.html'
        }
      }
    })

    .state('app.research', {
      url: '/research',
      views: {
        'menuContent': {
          templateUrl: 'templates/Research.html',
        }
      }
    })

    .state('app.create', {
      url: '/create',
      views: {
        'menuContent': {
          templateUrl: 'templates/createGame.html'
        }
      }
    })

    .state('app.choose', {
      url: '/choose',
      views: {
        'menuContent': {
          templateUrl: 'templates/choose.html',
          controller: 'PickerCtrl'
        }
      }
    })

    .state('app.score', {
      url: '/score',
      views: {
        'menuContent': {
          templateUrl: 'templates/score.html'
        }
      }
    })

    .state('app.single', {
      url: '/research/:id',
      views: {
        'menuContent': {
          templateUrl: 'templates/character.html',
        }
      }
    })

    .state('app.ancient', {
      url: '/research/ancient/:id',
      views: {
        'menuContent': {
          templateUrl: 'templates/ancientOne.html',
        }
      }
    });


  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/home');
});
