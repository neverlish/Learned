(function() {
  'use strict';

  angular
    .module('app')
    .controller('RegisterCtrl', RegisterCtrl);
  
  RegisterCtrl.$inject = ['$scope', '$state', '$alert', 'Auth'];

  function RegisterCtrl($scope, $state, $alert, Auth) {
    $scope.error = false;

    $scope.register = function(form) {
      var user = {
        username: $scope.username,
        password: $scope.password,
        password2: $scope.password2,
        email: $scope.email
      }

      Auth
        .register(user)
        // .success(function() { // deprecated
        .then(function() {
          console.log('User registered successfully');
          $state.go('login');
          $alert({
            title: 'Congratulations',
            content: 'Your account has been created. ' + 'You may now login',
            placement: 'top-right',
            container: '.alertContainer',
            type: 'success',
            duration: 6
          })
        })
        // .error(function() { // deprecated
        .catch(function() {
          $scope.error = true;
          $scope.errorMessage = 'Something went wrong'
        });
        
    }
  }
})();
