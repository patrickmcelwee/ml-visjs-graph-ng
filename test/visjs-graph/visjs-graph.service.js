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
      visjsGraphService.search(['/1.xml']);
      httpBackend.flush();
      httpBackend.verifyNoOutstandingExpectation();
      httpBackend.verifyNoOutstandingRequest();
    });

    it('works for >1 uris, taking only the first', function() {
      httpBackend.expectGET('/v1/resources/visjs?rs:subject=/1.xml').respond();
      visjsGraphService.search(['/1.xml', '/2.xml']);
      httpBackend.flush();
      httpBackend.verifyNoOutstandingExpectation();
      httpBackend.verifyNoOutstandingRequest();
    });
  });

  describe('expand', function() {
    it('works for a single uri', function() {
      httpBackend.expectGET('/v1/resources/visjs?rs:expand=true&rs:subject=/1.xml').respond();
      visjsGraphService.expand(['/1.xml']);
      httpBackend.flush();
      httpBackend.verifyNoOutstandingExpectation();
      httpBackend.verifyNoOutstandingRequest();
    });

    // TODO: handle multiple URIs in a better way
    it('works for >1 uris, taking only the first', function() {
      httpBackend.expectGET('/v1/resources/visjs?rs:expand=true&rs:subject=/1.xml').respond();
      visjsGraphService.expand(['/1.xml', '/2.xml']);
      httpBackend.flush();
      httpBackend.verifyNoOutstandingExpectation();
      httpBackend.verifyNoOutstandingRequest();
    });
  });
});
