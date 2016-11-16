angular.module('postDetail')
	.component('postDetail', {
		templateUrl: 'components/post-detail/post-detail.template.html',
		controller: [
			'$routeParams', 
			'$http',
			function postDetailController($routeParams, $http) {
				var self = this;

				$http.get('phones/' + $routeParams.postId)
				.then(function successCallback(res) {
					self.post = res.data;
				}, function errorCallback(err) {
					console.log(err);
				})
			}
		]
	});