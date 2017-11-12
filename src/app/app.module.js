(function() {
  'use strict';

  angular.module('UpSafe', 
    ['LoginController', 'ngRoute']
  )
  .run(preAtivador);

  function preAtivador($rootScope, $location) {
    $rootScope.$on('$routeChangeStart', function(event, next, current) {
      console.log(next.authorize);
      if(next.authorize) {
        if(!localStorage.token) {
          event.preventDefault();
          $location.path('#!/login');
        }
      }
    });
  }
  preAtivador.$inject = ['$rootScope', '$location'];

})();