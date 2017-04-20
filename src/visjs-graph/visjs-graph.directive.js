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
        graphExpand: '=?',
        physics: '=?',
        layout: '=?',
        customGraphOptions: '=?graphOptions',
        customGraphEvents: '=?graphEvents',
        network: '=?',
        items: '=?'
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

        if (!attrs.physics) {
          $scope.physicsEnabled = true;
          $scope.physics = 'forceAtlas2Based';
        } else if (attrs.physics === 'false') {
          $scope.physicsEnabled = false;
          $scope.physics = 'forceAtlas2Based';
        } else {
          $scope.physicsEnabled = true;
          $scope.userDefinedPhysics = true;
        }

        if (!attrs.layout) {
          $scope.layout = 'standard';
        }
      }
    };
  }

})();
