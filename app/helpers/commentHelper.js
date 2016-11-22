var Q = require('q');

var CommentHelper = {
	getComments: function(http, postId) {
		var deferred = Q.defer();
		http.get('http://xitter3.us-west-2.test.expedia.com/comments/post/' + postId)
		.then(function successCallback(res) {
			deferred.resolve(res);
		}, function errorCallback(err) {
			deferred.reject(new Error("Could not get comments for " + postId))
		})	
		return deferred.promise;
	},

	submitComment: function(http, postId, comment) {
		var deferred = Q.defer();
		http.post('http://xitter3.us-west-2.test.expedia.com/comments/post/' + postId, comment)
		.then(function successCallback(res) {
			deferred.resolve(res);
		}, function errorCallback(err) {
			deferred.reject(new Error("Could not submit new Comment"));
		})
		return deferred.promise;
	},

	voteComment: function(http, postId, commentId, voteType) {
		var deferred = Q.defer();
		http.post('http://xitter3.us-west-2.test.expedia.com/vote/comment?commentId=' + commentId + "&vote=" + voteType + "&postId=" + postId)
		.then(function successCallback(res) {
			deferred.resolve(res);
		}, function errorCallback(err) {
			deferred.reject(new Error("Could not vote on comment " + commentId))
		})
		return deferred.promise;
	},

	deleteComment(http, commentId) {
		var deferred = Q.defer();
		http.delete('http://xitter3.us-west-2.test.expedia.com/comments/' + commentId)
		.then(function successCallback(res) {
			deferred.resolve(res);
		}, function errorCallback(err) {
			deferred.reject(new Error("Could not delete comment " + commentId))
		})
		return deferred.promise;
	}
}

module.exports = CommentHelper;