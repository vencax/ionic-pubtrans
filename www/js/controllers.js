angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {
})

.controller('BuyCtrl', function($scope, Friends) {
  $scope.friends = Friends.all();
})

.controller('AccountCtrl', function($scope) {
  $scope.token = '';
});
