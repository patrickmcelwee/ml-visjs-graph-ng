describe('visjsGraphService', function() {
  var visjsGraphService, httpBackend;

  beforeEach(module('ml.visjsGraph'));

  beforeEach(inject(function(_visjsGraphService_, $httpBackend) {
    visjsGraphService = _visjsGraphService_;
    httpBackend = $httpBackend;
  }));

  describe('search', function() {

    it('works for a single uri', function() {
      httpBackend.expectGET('/v1/resources/visjs?rs:subject=/1.xml').respond();
      visjsGraphService.search('/1.xml');
      httpBackend.flush();
      httpBackend.verifyNoOutstandingExpectation();
      httpBackend.verifyNoOutstandingRequest();
    });
  });
});
