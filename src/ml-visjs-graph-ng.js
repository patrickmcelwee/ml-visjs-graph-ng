(function () {
  'use strict';
  
  angular.module('ml.visjsGraph', [
    'ngVis',
    'ui.bootstrap',
    'ui.router'
  ])
  .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('root.visjs-graph', {
        url: '/visjs-graph/*id',
        controller: 'visjsGraphViewCtrl',
        controllerAs: 'ctrl',
        templateUrl: '/visjs-graph/templates/container.html',
        resolve: {
          rootObject: function(visjsGraphService,$stateParams) {
            return visjsGraphService.search($stateParams.id).then(function(resp) {
              return resp.data;
            });
          }
        }
      });
  }

})();
