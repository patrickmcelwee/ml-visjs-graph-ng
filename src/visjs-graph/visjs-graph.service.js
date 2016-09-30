(function () {

  'use strict';

  angular.module('ml.visjsGraph')
    .provider('visjsGraphService', VisjsGraphService);

  function VisjsGraphService() {
        var api = '/v1/resources';
        this.setApi = function(url) {
          api = url;
        };

        this.$get = function($http) {
          var service = {
            search: search,
            expand: expand,
            // merge: merge,
            // addLinks: addLinks,
            // addTriple: addTriple

          };

          function search(ids) {
            return $http.get(api+'/visjs?rs:subject=' + encodeURIComponent(ids[0]))
            .then(
              function(response) {
                return response.data;
              }
            );
          }

          function expand(ids) {
            return $http.get(
              api+'/visjs?rs:expand=true&rs:subject=' + encodeURIComponent(ids[0]))
            .then(
              function (response) {
                return response.data;
              });
          }

          // function merge(primaryId, secondaryId) {
          //   return $http.post(api+'/merge?rs:primaryId=' + primaryId + '&rs:secondaryId=' + secondaryId);
          // }

          // function addLinks(linkData) {
          //   return $http.post(api+'/link', linkData);
          // }

          // function addTriple(triple) {
          //   return $http.post(api+'/visjs', triple);
          // }

          return service;
        };
  }
})();
