angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, TicketSrvc) {
  TicketSrvc.validtickets().success(function(tickets) {
    $scope.tickets = tickets;
  });
})

.controller('BuyCtrl', function($scope, $rootScope, $location, $ionicLoading, TicketSrvc) {
  $scope.show = function() {
    $ionicLoading.show({
      template: 'Loading...'
    });
  };
  $scope.hide = function(){
    $ionicLoading.hide();
  };

  $scope.data = [];
  $scope.show();

  TicketSrvc.list()
  .success(function(data) {
    $scope.data = data;
    $scope.hide();
  })
  .error(function(err, status){
    $scope.hide();
  });

  $scope.buy = function(ticket) {
    $scope.show();
    TicketSrvc.buy(ticket).success(function(data) {
      $rootScope.loggedUser.credit -= ticket.amount;
      $location.path('/');
      $ionicLoading.hide();
    }).error(function(err, status){
      if (status === 400) {
        alert('Not enough money!');
      }
      $ionicLoading.hide();
    });
  };
})

.controller('AccountCtrl', function($scope, $localstorage) {
  $scope.token = $localstorage.get('token', '');
  $scope.save = function() {
    $localstorage.set('token', this.token);
  };
});
