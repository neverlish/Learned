(function() {
  'use strict';
  angular
    .module('bikesGallery')
    .config(configure)
    .run(runBlock);

  configure.$inject = ['$urlRouterProvider', '$httpProvider', '$locationProvider'];
  function configure($urlRouterProvider, $httpProvider, $locationProvider) {
    $locationProvider.hashPrefix('!');

    // 브라우저 동기화가 올바르게 작동하려면 이 부분이 필요함
    $httpProvider.defaults.withCredentials = true;
    $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
    $urlRouterProvider
      .otherwise('/');
  }

  runBlock.$inject = ['$rootScope', '$state', '$stateParams'];
  function runBlock($rootScope, $state, $stateParams) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
  }
})();
