var Q = require('q');

var PostHelper = {
	pullPosts: function(http) {
		var deferred = Q.defer();
		http.get('http://xitter3.us-west-2.test.expedia.com/base')
		.then(function successCallback(res) {
			deferred.resolve(res);
		}, function errorCallback(err) {
			deferred.reject(new Error("Error getting posts"));
		});
		return deferred.promise;
	},

	addNewPost: function(http, newPost) {
		var deferred = Q.defer();
		http.post('http://xitter3.us-west-2.test.expedia.com/post', newPost)
		.then(function successCallback(res) {
			deferred.resolve(res);
		}, function errorCallback(err) {
			deferred.reject(new Error("Failed to post new post"));
		})
		return deferred.promise;
	},

	getPost: function(http, postId) {
		var deferred = Q.defer();
		http.get('http://xitter3.us-west-2.test.expedia.com/post/' + postId)
		.then(function successCallback(res) {
			deferred.resolve(res);
		}, function errorCallback(err) {
			deferred.reject(new Error("Failed to retrieve post " + postId));
		})	
		return deferred.promise;
	},

	vote: function(http, postId, voteType) {
		var deferred = Q.defer();
		http.post('http://xitter3.us-west-2.test.expedia.com/vote/post?postId=' + postId + '&vote=' + voteType)
		.then(function successCallback(res) {
			deferred.resolve(res);
		}, function errorCallback(err) {
			deferred.reject(new Error("Failed to vote on post " + postId));
		})
		return deferred.promise;
	},

	deletePost(http, postId) {
		var deferred = Q.defer();
		http.delete('http://xitter3.us-west-2.test.expedia.com/post/' + postId)
		.then(function successCallback(res) {
			deferred.resolve(res);
		}, function errorCallback(err) {
			deferred.reject(new Error("Failed to delete post " + postId))
		})
		return deferred.promise;
	}
}

module.exports = PostHelper;