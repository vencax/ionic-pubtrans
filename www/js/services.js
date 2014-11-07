angular.module('starter.services', [])

.factory('TicketSrvc', function($http) {
  // these routes map to stubbed API endpoints in config/server.js
  // var host = 'http://localhost:8000';
  var host = 'https://mhdtabor.herokuapp.com';

  return {
    list: function() {
      return $http.get(host + '/api/tickets');
    },

    buy: function(ticket) {
      return $http.post(host + '/api/buy/' + ticket.id);
    },

    isvalid: function(id) {
      return $http.get(host + '/api/valid/' + id);
    },

    validtickets: function() {
      return $http.get(host + '/api/valid');
    },

    credithistory: function() {
      return $http.get(host + '/api/credit/history');
    },

    credit: function(user) {
      return $http.get(host + '/api/credit/' + user.id);
    }
  };
});
