angular.
  module('XitterApp').
  config(['$locationProvider', '$routeProvider',
    function config($locationProvider, $routeProvider) {
      $locationProvider.hashPrefix('!');

      $routeProvider.
        when('/all', {
          template: '<post-list></post-list>'
        }).
        when('/post/:postId', {
          template: '<post-detail></post-detail>'
        }).
        otherwise('/all');
    }
  ]);