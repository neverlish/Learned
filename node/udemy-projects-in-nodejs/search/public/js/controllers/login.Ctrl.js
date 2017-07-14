(function() {
  'use strict';

  angular
    .module('app')
    .controller('LoginCtrl', LoginCtrl);
  
  LoginCtrl.$inject = ['$scope', 'Auth', '$state', '$cookies'];

  function LoginCtrl($scope, Auth, $state, $cookies) {
    $scope.error = false;

    $scope.login = function() {
      var user = {
        username: $scope.username,
        password: $scope.password
      }
      Auth
        .login(user)
        .then(function(data) {
          console.log('log in successful');
          $cookies.put('user', data.user.username);
          $cookies.put('userId', data.user._id);
          $state.go('add');
        })
        .catch(function() {
          console.log('Error logging in');
          $scope.error = true;
          $scope.errorMessage = 'Something went wrong';
        });
    }
  }
})();
