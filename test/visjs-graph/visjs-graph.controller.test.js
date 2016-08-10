describe('visjsGraphCtrl', function() {
  var $controller, visjsGraphService;

  beforeEach(module('ml.visjsGraph'));

  beforeEach(inject(function( _$rootScope_,
                              _$controller_,
                              _$q_,
                              _visjsGraphService_
                            ) {
    $rootScope = _$rootScope_;
    $controller = _$controller_;
    $q = _$q_;
    visjsGraphService = _visjsGraphService_;
  }));

  // TODO: handle multiple URIs in a better way
  it('should call visjsGraphService.search() with first uri', function() {
    var mockPromise = $q.when();
    spyOn(visjsGraphService, 'search').and.returnValue(mockPromise);
    var scope = $rootScope.$new();
    scope.uris = ['some-uri.xml', 'some-extra-uri.xml'];
    var controller = $controller('visjsGraphCtrl', {
      $scope: scope,
      visjsGraphService: visjsGraphService,
      $state: {} // TODO: remove this dependency on angular-ui-router
    });
    expect(visjsGraphService.search).toHaveBeenCalledWith('some-uri.xml');
  });
});
