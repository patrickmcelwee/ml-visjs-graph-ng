(function () {

  'use strict';

  angular.module('ml.visjsGraph')
  .directive('mlVisjsGraph', VisjsGraphDirective);

  VisjsGraphDirective.$inject = ['visjsGraphService'];

  function VisjsGraphDirective(visjsGraphService) {
    return {
      restrict: 'E',
      scope: {
        uris: '=',
        graphSearch: '=?',
        graphExpand: '=?'
      },
      templateUrl: '/visjs-graph/visjs-graph.html',
      controller: 'visjsGraphCtrl',
      controllerAs: 'ctrl',
      link: function($scope, element, attrs) {
        if (!attrs.graphSearch) {
          $scope.graphSearch = visjsGraphService.search;
        }
        if (!attrs.graphExpand) {
          $scope.graphExpand = visjsGraphService.expand;
        }
      }
    };
  }

})();
