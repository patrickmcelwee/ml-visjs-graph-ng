(function () {

  'use strict';

  angular.module('ml.visjsGraph')
    .controller('visjsGraphViewCtrl', VisjsGraphViewCtrl);

  VisjsGraphViewCtrl.$inject = ['rootObject', '$scope'];
  function VisjsGraphViewCtrl(rootObject, $scope) {
    var ctrl = this;
    ctrl.items = rootObject;
  }

})();
