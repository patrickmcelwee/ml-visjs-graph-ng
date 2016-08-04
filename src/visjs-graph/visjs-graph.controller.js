(function () {

  'use strict';

  angular.module('ml.visjsGraph')
    .controller('visjsGraphCtrl', VisjsGraphCtrl);

  VisjsGraphCtrl.$inject = ['visjsGraphService', '$scope', '$state', '$window', '$uibModal', 'VisDataSet'];

  function VisjsGraphCtrl(visjsGraphService, $scope, $state, $window, $uibModal, VisDataSet) {
    var ctrl = this;
    var items = $scope.items;
    var nodes, edges;
    var nodeMap = {};

    // TODO: Do we need this?
    ctrl.newTriple = {};
    ctrl.tripleModal = null;
    ctrl.label = (items.nodes[0].label) ? items.nodes[0].label : 'this node';

    $window.scrollTo(0, 0);

    ctrl.graphData = {
      nodes: null,
      edges: null
    };

    if (items) {
      // Add nodes to nodeMap
      for (var i=0; i < items.nodes.length; i++) {
        nodeMap[items.nodes[i].id] = items.nodes[i];
      }

      nodes = new VisDataSet(items.nodes);
      edges = new VisDataSet(items.links);
    }
    else {
      nodes = new VisDataSet([]);
      edges = new VisDataSet([]);
    }

    // provide the data in the vis format
    ctrl.graphData.nodes = nodes;
    ctrl.graphData.edges = edges;

    $('ul.nav-tabs a').on('click', function (e) {
      ctrl.network.fit();
    });

    ctrl.physicsEnabled = true;
    ctrl.physics = 'forceAtlas2Based';
    ctrl.layoutSelect = 'standard';

    ctrl.graphOptions = {
      layout: {
        hierarchical: false,
        // hierarchical: { direction: 'LR'},
        randomSeed: 2,
        improvedLayout: true // omitted by default
      },
      interaction: {
        navigationButtons: true
      },
      height: '600px',
      manipulation: {
        enabled: false,
        initiallyActive: false,
        addNode: false,
        deleteNode: false,
        deleteEdge: false,
        editEdge: false,
        addEdge: function(edgeData, callback) {
          if (edgeData.from === edgeData.to) {
            // NOOP
          }
          else {
            ctrl.linkData.primaryId = edgeData.from;
            ctrl.linkData.secondaryId = edgeData.to;
            ctrl.linkData.linkType = 'newLink';
            ctrl.addLink(edgeData);
          }
        },
      },
      locales: {
        en: {
          addEdge: 'Add Relationship / Merge',
          edit: 'Edit',
          del: 'Delete selected',
          back: 'Back',
          addNode: 'Add Node',
          editNode: 'Edit Node',
          editEdge: 'Edit Edge',
          addDescription: 'Click in an empty space to place a new node.',
          edgeDescription: 'Click on a node and drag the relationship to another node to connect or merge them.',
          editEdgeDescription: 'Click on the control points and drag them to a node to connect to it.',
          createEdgeError: 'Cannot link edges to a cluster.',
          deleteClusterError: 'Clusters cannot be deleted.',
          editClusterError: 'Clusters cannot be edited.'
        }
      },
      groups: {
        'http://xmlns.com/foaf/0.1/Person': {
          color: {
            highlight: {
              background: 'white',
              border: '#860082'
            },
            background: 'white',
            border: 'black'
          },
          image: 'bower_components/ml-visjs-graph-ng/dist/images/person.png'
        }
      },
      nodes: {
        size: 30,
        borderWidth: 2,
        shadow: true,
        borderWidthSelected: 6,
        shape: 'circularImage',
        image: 'bower_components/ml-visjs-graph-ng/dist/images/generic.png',
        color: {
          highlight: {
            background: 'white',
            border: '#860082'
          },
          background: 'white',
          border: 'black'
        },
        font: {
          size: 12
        },
      },
      physics: {
        enabled: ctrl.physicsEnabled,

        // built-in default
        // barnesHut: {
        //   gravitationalConstant: -2000,
        //   centralGravity: 0.3,
        //   springLength: 95,
        //   springConstant: 0.04,
        //   damping: 0.09,
        //   avoidOverlap: 0
        // },
        // OBI default
        // barnesHut: {
        //   gravitationalConstant : -8000,
        //   centralGravity: 0.5,
        //   springLength: 150,
        //   springConstant: 0.04,
        //   damping: 1.0,
        //   avoidOverlap: 1
        // },
        // GJo tweaks
        barnesHut: {
          gravitationalConstant : -8000,
          centralGravity: 0.1,
          springLength: 200,
          springConstant: 0.04,
          damping: 0.5,
          avoidOverlap: 0
        },

        // built-in default
        // forceAtlas2Based: {
        //   gravitationalConstant: -50,
        //   centralGravity: 0.01,
        //   springLength: 100,
        //   springConstant: 0.08,
        //   damping: 0.4,
        //   avoidOverlap: 0
        // },
        // GJo tweaks
        forceAtlas2Based: {
          gravitationalConstant: -200,
          centralGravity: 0.01,
          springLength: 100,
          springConstant: 0.08,
          damping: 0.4,
          avoidOverlap: 0
        },

        // built-in default
        // repulsion: {
        //   centralGravity: 0.2,
        //   springLength: 200,
        //   springConstant: 0.05,
        //   nodeDistance: 100,
        //   damping: 0.09
        // },
        // GJo tweaks
        repulsion: {
          centralGravity: 0.1,
          springLength: 200,
          springConstant: 0.05,
          nodeDistance: 200,
          damping: 0.09
        },
        hierarchicalRepulsion: {
          centralGravity: 0.0,
          springLength: 100,
          springConstant: 0.01,
          nodeDistance: 120,
          damping: 0.09
        },
        maxVelocity: 150, // default 50
        minVelocity: 6, // default 0.1
        solver: ctrl.physics, // default barnesHut
        stabilization: {
          enabled: true,
          iterations: 1000,
          updateInterval: 100,
          onlyDynamicEdges: false,
          fit: true
        },
        timestep: 0.5,
        adaptiveTimestep: true
      },
      edges: {
        color: '#860082',
        width: 2,
        shadow: true,
        arrows: {
          to: {
            enabled: true,
            scaleFactor: 0.75
          }
        },
        font: {
          size: 10,
          align: 'top'
        },
        smooth: {
          type: 'curvedCW',
          roundness: 0.1
        }
      }
    };

    ctrl.graphEvents = {
      onload: function(network) {
        ctrl.network = network;
      },
      // Right-click for a redirect to the detail page for a node
      oncontext: function(params) {
        var coordinates = params.pointer.DOM;
        var targetNode = ctrl.network.getNodeAt(coordinates);
        if (targetNode) {
         if(ctrl.getNodeLabel(targetNode).charAt(0) !== '/') {
            $state.go('root.view', {'uri': targetNode + '.xml'});
          }
        }

        return params.event.preventDefault();
      },
      doubleClick: function(params) {
        var nodeUri = params.nodes[0];
        visjsGraphService.expand(nodeUri).then(ctrl.updateGraph);
      },
      afterDrawing: function(ctx) {
        var radius = 10;
        var selectedNode = null;
        var selectedData = ctrl.network.getSelectedNodes();
        if (selectedData && selectedData.length > 0) {
          selectedNode = selectedData[0];
        }

        var nodeIds = ctrl.getNodeIds();
        var nodePosition = ctrl.network.getPositions(nodeIds);
        if (nodePosition) {
          for (var i=0; i < nodeIds.length; i++) {
            var nodePos = nodePosition[ nodeIds[i] ];
            if (nodePos) {
              var tmpNode = ctrl.getNode(nodeIds[i]);
              if (tmpNode && tmpNode.linkCount && tmpNode.linkCount > 0) {
                if (tmpNode.linkCount >= 100 && tmpNode.linkCount < 1000) {
                  radius = 15;
                }
                else if (tmpNode.linkCount >= 1000) {
                  radius = 20;
                }
                else {
                  radius = 10;
                }

                ctx.strokeStyle = 'white';
                ctx.fillStyle = '#828600';
                ctx.lineWidth = 1;
                ctx.circle(nodePos.x - 20, nodePos.y - 20, radius);
                ctx.fill();
                ctx.stroke();

                // Text info
                ctx.font = '8pt Lucida';
                ctx.strokeText(tmpNode.linkCount, nodePos.x - 20, nodePos.y - 24);
              }

              // If this node is selected, add background to label
              if (selectedNode === nodeIds[i]) {
                ctx.font = 'bold 12px Arial';
                var width = ctx.measureText(tmpNode.label).width + 40;
                var xOffset = width / 2;

                ctx.beginPath();
                ctx.rect(nodePos.x - xOffset, nodePos.y + 30, width, 30);
                ctx.fillStyle = '#860082';
                ctx.fill();

                ctx.strokeStyle = 'white';
                ctx.fillStyle = 'white';
                ctx.fillText(tmpNode.label, nodePos.x, nodePos.y + 40);
              }
            }
          }
        }
      }
    };

    ctrl.linkData = {};

    $scope.$watch('ctrl.physicsEnabled', function(newValue, oldValue) {
      if (newValue !== oldValue) {
        ctrl.physicsUpdated();
      }
    });

    $scope.$watch('ctrl.physics', function(newValue, oldValue) {
      if (newValue !== oldValue) {
        ctrl.physicsUpdated();
      }
    });

    $scope.$watch('ctrl.layoutHierarchy', function(newValue, oldValue) {
      if (newValue !== oldValue) {
        ctrl.layoutUpdated();
      }
    });

    $scope.$watch('ctrl.layoutSelect', function(newValue, oldValue) {
      if (newValue !== oldValue) {
        ctrl.layoutUpdated();
      }
    });

    ctrl.getNodeLabel = function(nodeId) {
      var label = nodeMap[nodeId].label;
      return label;
    };

    ctrl.getNode = function(nodeId) {
      return nodeMap[nodeId];
    };

    ctrl.getNodeIds = function() {
      var nodes = [];
      for (var key in nodeMap) {
        nodes.push( nodeMap[key].id );
      }

      return nodes;
    };

    ctrl.updateGraph = function(data) {
      if (data && data.data) {
        items = data.data;
      }
      else {
        items = data;
      }

      // Add nodes to nodeMap
      if (items && items.nodes) {
        for (var i=0; i < items.nodes.length; i++) {
          nodeMap[items.nodes[i].id] = items.nodes[i];
        }

        ctrl.refreshGraph();
      }
    };

    ctrl.refreshGraph = function() {
      if (nodes) {
        nodes.update(items.nodes);
      }

      if (edges) {
        edges.update(items.links);
      }
    };

    // ctrl.addLink = function(data) {
    //   // Only draw the link if lands on a node.
    //   if (data !== null) {
    //     var primaryNode = ctrl.getNode(ctrl.linkData.primaryId);
    //     var secondaryNode = ctrl.getNode(ctrl.linkData.secondaryId);

    //     // Only give the option to merge if nodes are the same type.
    //     if (primaryNode.group === secondaryNode.group) {
    //       $uibModal({
    //         scope: $scope,
    //         template: '/src/visjs-graph/templates/link-type-selection.html',
    //         title: 'Create new link',
    //         show: true
    //       });
    //     }
    //     else {
    //       ctrl.linkData.linkType = 'newLink';
    //       $uibModal({
    //         scope: $scope,
    //         template: '/src/vis-graph/templates/edit-link-name.html',
    //         title: 'Create new link',
    //         show: true
    //       });
    //     }
    //   }
    // };

    ctrl.physicsUpdated = function() {
      ctrl.network.setOptions({ physics: {
        enabled: ctrl.physicsEnabled,
        solver: ctrl.physics
      }});
    };

    ctrl.layoutUpdated = function() {
      var options = {
        edges: {
        smooth: {
          type: 'curvedCW',
          roundness: 0.1
        }
        }
      };
      if (ctrl.layoutSelect === 'standard') {
        options.layout = {
          hierarchical: false
        };
      }
      else if (ctrl.layoutSelect === 'hierarchyTop') {
        ctrl.physics = 'hierarchicalRepulsion';
        options.layout = {
          hierarchical: {
            direction: 'UD',
            sortMethod: 'directed'
          }
        };
      }
      else if (ctrl.layoutSelect === 'hierarchyBottom') {
        ctrl.physics = 'hierarchicalRepulsion';
        options.layout = {
          hierarchical: {
            direction: 'DU',
            sortMethod: 'directed'
          }
        };
      }
      else if (ctrl.layoutSelect === 'hierarchyLeft') {
        ctrl.physics = 'hierarchicalRepulsion';
        options.layout = {
          hierarchical: {
            direction: 'LR',
            sortMethod: 'directed'
          }
        };
      }
      else {
        ctrl.physics = 'hierarchicalRepulsion';
        options.layout = {
          hierarchical: {
            direction: 'RL',
            sortMethod: 'directed'
          }
        };
      }

      var physicsOptions = {
        physics: {
          enabled: ctrl.physicsEnabled,
          solver: ctrl.physics
        }
      };

      // Set options for layout
      ctrl.network.setOptions(options);

      //
      // Set options for physics
      //
      // NOTE:  Needed second call to <setOptions> because the physics
      //        settings were being overwritten based on layout setting.
      //
      ctrl.network.setOptions(physicsOptions);
    };
  }

})();
