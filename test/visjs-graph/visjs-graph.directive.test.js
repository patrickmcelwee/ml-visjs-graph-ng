describe('ml-visjs-graph directive', function () {
  var $compile,
      $rootScope,
      $q,
      visjsGraphService;

  // Mock out the controller, which results in a completely isolated
  // directive test - no integration with controller tested, except
  // controller name
  beforeEach(function () {
    module('ml.visjsGraph', function($controllerProvider, $provide) {
      $controllerProvider.register('visjsGraphCtrl', function($scope) {
        $scope.init =
          jasmine.createSpy('controllerInit');
      });

      $provide.service('visjsGraphService', function($q) {
        var mockPromise = $q.when(['item1', 'item2']);
        this.search = jasmine.createSpy('search');
        this.expand = jasmine.createSpy('expand');
      });
    });

    inject(function(_$compile_, _$rootScope_, _$q_, _visjsGraphService_){
      $compile = _$compile_;
      $rootScope = _$rootScope_;
      $q = _$q_;
      visjsGraphService = _visjsGraphService_;
    });
  });

  it('Replaces <ml-visjs-graph> with the network visualization', function() {
    var element = $compile('<ml-visjs-graph uris="[]"></ml-visjs-graph>')($rootScope);
    $rootScope.$digest();
    expect(element.html()).toContain('<vis-network'); // angular-visjs directive
  });

  it('sets graphSearch to visjsGraphService.search by default', function() {
    var element = $compile('<ml-visjs-graph uris="[]"></ml-visjs-graph>')($rootScope);
    $rootScope.$digest();
    expect(element.isolateScope().graphSearch).toBe(visjsGraphService.search);
  });

  it('sets graphSearch to user-defined function', function() {
    scope = $rootScope.$new();
    scope.fakeSearch =
      jasmine.createSpy('fakeSearch').and.returnValue($q.when([]));
    var element = $compile('<ml-visjs-graph uris="[]" graph-search="fakeSearch"></ml-visjs-graph>')(scope);
    scope.$digest();
    expect(element.isolateScope().graphSearch).toBe(scope.fakeSearch);
  });

  it('sets graphExpand to visjsGraphService.expand by default', function() {
    var element = $compile('<ml-visjs-graph uris="[]"></ml-visjs-graph>')($rootScope);
    $rootScope.$digest();
    expect(element.isolateScope().graphExpand).toBe(visjsGraphService.expand);
  });

  it('sets graphExpand to user-defined function', function() {
    scope = $rootScope.$new();
    scope.fakeExpand =
      jasmine.createSpy('fakeExpand').and.returnValue($q.when([]));
    var element = $compile('<ml-visjs-graph uris="[]" graph-expand="fakeExpand"></ml-visjs-graph>')(scope);
    scope.$digest();
    expect(element.isolateScope().graphExpand).toBe(scope.fakeExpand);
  });

});
