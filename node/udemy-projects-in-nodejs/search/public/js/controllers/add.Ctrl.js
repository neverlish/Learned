(function() {
  'use strict';

  angular
    .module('app')
    .controller('AddCtrl', AddCtrl);
  
  AddCtrl.$inject = ['Results', '$scope', '$alert', '$cookies'];

  function AddCtrl(Results, $scope, $alert, $cookies) {
    $scope.error = false;
    $scope.formField = null;
    var userId = $cookies.get('userId');

    $scope.addForm = function() {
      var alertSuccess = $alert({
        title: 'Success',
        content: 'New website has been added',
        container: '#alertContainer',
        type: 'success',
        duration: 6
      });

      var add = {
        title: $scope.title,
        url: $scope.url,
        description: $scope.description,
        id: userId
      };

      Results
        .postSite(add)
        .then(function(data) {
          console.log('new site added to db');
          console.log(data);
          $scope.url = '';
          $scope.description = '';
          $scope.title = '';
          alertSuccess.show();
        })
        .catch(function() {
          console.log('website failed to save');
        });
    }
  }
})();
