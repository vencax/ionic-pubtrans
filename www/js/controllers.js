angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, TicketSrvc) {
  TicketSrvc.validtickets().success(function(tickets) {
    $scope.tickets = tickets;
  });
})

.controller('BuyCtrl', function($scope, $rootScope, $location, TicketSrvc) {
  $scope.data = [];
  TicketSrvc.list().success(function(data) {
    $scope.data = data;
  });

  $scope.buy = function(ticket) {
    TicketSrvc.buy(ticket).success(function(data) {
      $rootScope.loggedUser.credit -= ticket.amount;
      $location.path('/');
    }).error(function(err, status){
      if (status === 400) {
        alert('Not enough money!');
      }
    });
  };
})

.controller('AccountCtrl', function($scope, $localstorage) {
  $scope.token = $localstorage.get('token', '');
  $scope.save = function() {
    $localstorage.set('token', this.token);
  };
});
