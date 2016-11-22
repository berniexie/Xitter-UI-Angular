var PostListController = require('./components/post-list/post-list.controller.js');
var PostDetailController = require('./components/post-detail/post-detail.controller.js');

angular.module('XitterApp', [
  'ui.tree',
  'ngRoute',
  'postList',
  'postDetail'
]).config(['$locationProvider', '$routeProvider',
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

PostListController.$inject = ['$scope', '$http'];
angular.module('postList', [])
.component('postList', {
  templateUrl:'post-list/post-list.template.html',
  controller: PostListController
});

PostDetailController.$inject = ['scope', '$http', '$routeParams'];
angular.module('postDetail', ['ngRoute'])
.component('postDetail', {
  templateUrl:'post-detail/post-detail.template.html',
  controller: PostDetailController
});