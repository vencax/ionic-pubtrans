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

.controller('DashCtrl', function($scope, TicketSrvc) {
  TicketSrvc.validtickets().success(function(tickets) {
    $scope.tickets = tickets;
  });
})

.controller('BuyCtrl', function($scope, $rootScope, $location, $ionicLoading, $translate, TicketSrvc) {

  $scope.data = [];
  showLoading($ionicLoading, $translate);

  TicketSrvc.list()
  .success(function(data) {
    $scope.data = data;
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
