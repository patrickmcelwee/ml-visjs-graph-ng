describe('visjsGraphCtrl', function() {
  var $controller, $q, scope;

  beforeEach(module('ml.visjsGraph'));

  beforeEach(inject(function( $rootScope,
                              _$controller_,
                              _$q_,
                              _visjsGraphService_
                            ) {
    $controller = _$controller_;
    $q = _$q_;

    var mockResults = {nodes: [], edges: []};
    var mockSearch = jasmine.createSpy('search').and.returnValue($q.when(mockResults));
    scope = $rootScope.$new();
    scope.graphSearch = mockSearch; // defined in directive
  }));

  // Out of date: this now moved to directive
  it('should call $scope.graphSearch()', function() {
    var uris = ['some-uri.xml', 'some-extra-uri.xml'];
    scope.uris = uris;
    var controller = $controller('visjsGraphCtrl', {
      $scope: scope
    });
    scope.$apply();
    expect(scope.graphSearch).toHaveBeenCalledWith(uris);
  });

  it('allows override of graphOptions', function() {
    var controller = $controller('visjsGraphCtrl', {
      $scope: scope
    });
    scope.network = {
      setOptions: jasmine.createSpy('setOptions'),
      stabilize: function() {}
    };
    var customOptions = {edges: { color: '#FFFFFF' } };
    scope.customGraphOptions = customOptions;
    scope.$apply();
    expect(controller.graphOptions.edges.color).toBe('#FFFFFF');
    expect(scope.network.setOptions).toHaveBeenCalledWith(customOptions);
  });

  it('allows override and extension of graphEvents', function() {
    var controller = $controller('visjsGraphCtrl', {
      $scope: scope
    });
    var override = jasmine.createSpy('override stabilized');
    var extension = jasmine.createSpy('define hold');
    var customEvents = {stabilized: override, hold: extension};
    scope.customGraphEvents = customEvents;
    scope.$apply();
    expect(controller.graphEvents.stabilized).toBe(override);
    expect(controller.graphEvents.hold).toBe(extension);
  });
});
