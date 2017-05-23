(function(module) {
try {
  module = angular.module('ml.visjsGraph');
} catch (e) {
  module = angular.module('ml.visjsGraph', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/visjs-graph/visjs-graph.html',
    '<div class="row"><div class="col-md-12" style="border: 1px solid lightgrey;"><div class="components-container"><div><vis-network class="object-graph col-md-12" data="ctrl.graphData" options="ctrl.graphOptions" events="ctrl.graphEvents"></vis-network><div class="checkbox ml-visjs-control"><label><input type="checkbox" ng-model="physicsEnabled"> Enable Physics</label> <span ng-show="physicsEnabled"><label for="physicsSelect">Physics:</label><select name="physicsSelect" ng-model="physics"><option value="barnesHut">barnesHut</option><option value="forceAtlas2Based">forceAtlas2Based</option><option value="repulsion">repulsion</option><option value="hierarchicalRepulsion">hierarchicalRepulsion</option></select></span> <label for="layout">Layout:</label><select name="layout" ng-model="layout"><option value="standard">Standard</option><option value="hierarchyTop">Hierarchy - Top</option><option value="hierarchyBottom">Hierarchy - Bottom</option><option value="hierarchyLeft">Hierarchy - Left</option><option value="hierarchyRight">Hierarchy - Right</option></select></div><div class="pull-right" id="graph-popover"></div></div></div></div></div>');
}]);
})();
