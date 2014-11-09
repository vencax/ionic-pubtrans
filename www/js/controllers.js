var showLoading = function($ionicLoading, $translate) {
  $translate('LOADING').then(function (translation) {
    $ionicLoading.show({
      template: translation + ' ...'
    });
  });
};

var hideLoading = function($ionicLoading){
  $ionicLoading.hide();
};

angular.module('starter.controllers', [])

.filter('nicedate', function(){
  return function(date) {
    var m = moment(date);
    return m.format('l') + ', ' + m.format('LT');
  };
})

.controller('DashCtrl', function($scope, $timeout, TicketSrvc) {

  $scope.updateRemains = function() {
    var now = moment();
    for(var idx in $scope.tickets) {
      var t = $scope.tickets[idx];
      t.remains = ((t.expires - now) / 60000) | 0;
    }
    $timeout($scope.updateRemains, 60000);
  };

  TicketSrvc.validtickets().success(function(tickets) {
    $scope.tickets = tickets;
    for(var idx in $scope.tickets) {
      var t = $scope.tickets[idx];
      t.expires = moment(t.expires);
    }
    $scope.updateRemains();
  });

})

.controller('BuyCtrl', function($scope, $rootScope, $location, $ionicLoading, $translate, $ionicSlideBoxDelegate, TicketSrvc) {

  $scope.data = [];
  showLoading($ionicLoading, $translate);

  TicketSrvc.list()
  .success(function(data) {
    $scope.data = data;
    $ionicSlideBoxDelegate.update();
    hideLoading($ionicLoading);
  })
  .error(function(err, status){
    hideLoading($ionicLoading);
  });

  $scope.buy = function(ticket) {
    if(ticket.amount > $rootScope.loggedUser.credit) {
      return;
    }
    showLoading($ionicLoading, $translate);
    TicketSrvc.buy(ticket).success(function(data) {
      $rootScope.loggedUser.credit -= ticket.amount;
      $location.path('/');
      hideLoading($ionicLoading);
    }).error(function(err, status){
      if (status === 400) {
        alert('Not enough money!');
      }
      hideLoading($ionicLoading);
    });
  };
})

.controller('HistoryCtrl', function($scope, $ionicLoading, $translate, TicketSrvc) {

  $scope.items = [];
  showLoading($ionicLoading, $translate);

  TicketSrvc.credithistory().success(function(items) {
    $scope.items = items;
    hideLoading($ionicLoading);
  });

})

.controller('AccountCtrl', function($scope, $localstorage) {
  $scope.token = $localstorage.get('token', '');
  $scope.save = function() {
    $localstorage.set('token', this.token);
  };
});
