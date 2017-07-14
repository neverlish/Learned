(function() {
  'use strict';

  angular
    .module('app')
    .factory('Auth', Auth);

  Auth.$inject = ['$http'];

  function Auth($http) {
    var loggedIn = false;
    var currentUser = {};

    return {
      register: register,
      login: login,
      isLoggedIn: isLoggedIn,
      getUserStatus: getUserStatus
    }

    function isLoggedIn() {
      if (loggedIn) {
        return true;
      } else {
        return false;
      }
    }

    function getUserStatus() {
      return loggedIn;
    }
    
    function register(user) {
      return $http.post('/users/register', user);
    }

    function login(user) {
      return $http
        .post('/users/login', user)
        .then(function(data) {
          loggedIn = true;
          return data.data;
        })
        .catch(function(data) {
          console.log('error occured');
          loggedIn = false;
        });
    }
  }
})();
