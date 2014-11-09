// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', [
  'ionic', 'starter.controllers', 'starter.services', 'ionic.utils',
  'pascalprecht.translate'
])

.run(function($ionicPlatform, $rootScope, $timeout, TicketSrvc) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

    $rootScope.loggedUser = {
      id: 111,
      name: 'Gandalf'
    };

    var update = function() {
      TicketSrvc.credit($rootScope.loggedUser).success(function(credit){
        $rootScope.loggedUser.credit = credit;
      });
      $timeout(update, 10000);
    };

    update();

  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

    // setup an abstract state for the tabs directive
    .state('tab', {
      url: "/tab",
      abstract: true,
      templateUrl: "templates/tabs.html"
    })

    // Each tab has its own nav history stack:

    .state('tab.dash', {
      url: '/dash',
      views: {
        'tab-dash': {
          templateUrl: 'templates/tab-dash.html',
          controller: 'DashCtrl'
        }
      }
    })

    .state('tab.buy', {
      url: '/buy',
      views: {
        'tab-buy': {
          templateUrl: 'templates/tab-buy.html',
          controller: 'BuyCtrl'
        }
      }
    })

    .state('tab.history', {
      url: '/history',
      views: {
        'tab-history': {
          templateUrl: 'templates/tab-history.html',
          controller: 'HistoryCtrl'
        }
      }
    })

    .state('tab.account', {
      url: '/account',
      views: {
        'tab-account': {
          templateUrl: 'templates/tab-account.html',
          controller: 'AccountCtrl'
        }
      }
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/dash');

})

.config(['$translateProvider', function ($translateProvider) {
  $translateProvider.translations('en', {
    'TITLE': 'Hello',
    'LOADING': 'This is a paragraph',
    'HOME': 'Hom',
    'BUY': 'Buy',
    'SETTINGS': 'Settings',
    'VALID_TICKETS': 'Valid tickets',
    'NO_VALID_TICKETS': 'You have no valid ticket!',
    'HISTORY': 'History'
  });

  $translateProvider.translations('cs', {
    'TITLE': 'Hallo',
    'LOADING': 'Nahrávám',
    'HOME': 'Domů',
    'BUY': 'Nákup',
    'SETTINGS': 'Nastavení',
    'CREDIT': 'Kredit',
    'VALID_TICKETS': 'Platné jízdenky',
    'NO_VALID_TICKETS': 'Nemáte žádné platné jízdenky!!',
    'HISTORY': 'Historie'
  });

  $translateProvider.preferredLanguage('cs');
  moment.locale('cs');
}]);

angular.module('ionic.utils', [])

.factory('$localstorage', ['$window', function($window) {
  return {
    set: function(key, value) {
      $window.localStorage[key] = value;
    },
    get: function(key, defaultValue) {
      return $window.localStorage[key] || defaultValue;
    },
    setObject: function(key, value) {
      $window.localStorage[key] = JSON.stringify(value);
    },
    getObject: function(key) {
      return JSON.parse($window.localStorage[key] || '{}');
    }
  }
}]);
