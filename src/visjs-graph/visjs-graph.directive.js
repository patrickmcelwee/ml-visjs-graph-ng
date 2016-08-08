(function () {

  'use strict';

  angular.module('ml.visjsGraph')
  .directive('visjsGraph', VisjsGraphDirective);

  function VisjsGraphDirective() {
    return {
      restrict: 'E',
      scope: {
        uris: '=uris'
      },
      templateUrl: '/visjs-graph/visjs-graph.html',
      controller: 'visjsGraphCtrl',
      controllerAs: 'ctrl',
      link: function(scope, element, attrs) {
      }
    };
  }

})();
