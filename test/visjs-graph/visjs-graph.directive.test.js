describe('visjs-graph directive', function () {
  var $compile,
      $rootScope;

  // Mock out the controller, which results in a completely isolated
  // directive test - no integration with controller tested, except
  // controller name
  beforeEach(function () {
    module('ml.visjsGraph', function($controllerProvider) {
      $controllerProvider.register('visjsGraphCtrl', function() {
      });
    });
  });

  beforeEach(inject(function(_$compile_, _$rootScope_){
    $compile = _$compile_;
    $rootScope = _$rootScope_;
  }));

  it('Replaces <visjs-graph> with the network visualization', function() {
    var element = $compile('<ml-visjs-graph></ml-visjs-graph>')($rootScope);
    $rootScope.$digest();
    expect(element.html()).toContain('<vis-network'); // angular-visjs directive
  });

});
