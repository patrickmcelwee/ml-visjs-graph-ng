describe('visjsGraphCtrl', function() {
  var $controller, $q;

  beforeEach(module('ml.visjsGraph'));

  beforeEach(inject(function( _$rootScope_,
                              _$controller_,
                              _$q_,
                              _visjsGraphService_
                            ) {
    $rootScope = _$rootScope_;
    $controller = _$controller_;
    $q = _$q_;
  }));

  // Out of date: this now moved to directive
  it('should call $scope.graphSearch() when it is set', function() {
    var mockResults = {nodes: [], edges: []};
    var uris = ['some-uri.xml', 'some-extra-uri.xml'];
    var scope = $rootScope.$new();
    var mockSearch = jasmine.createSpy('search').and.returnValue($q.when(mockResults));
    scope.uris = uris;
    var controller = $controller('visjsGraphCtrl', {
      $scope: scope
    });
    scope.graphSearch = mockSearch; // defined in directive
    scope.$apply();
    expect(mockSearch).toHaveBeenCalledWith(uris);
  });
});
