var PostHelper = {
	pullPosts: function(http, posts) {
		http.get('http://xitter3.us-west-2.test.expedia.com/base')
			.then(function successCallback(res) {
				console.log(res);
				posts = res.data;
			}, function errorCallback(err) {
				console.log(err);
			});
		}

	},
	getPost: function(http) {

	},
	vote: function(http) {

	}
}