var Q = require('q');
var postHelper = require('../../helpers/postHelper');
var commentHelper = require('../../helpers/commentHelper');

 var PostDetailController = function ($scope, $http, $routeParams) {
	var self = this;

	self.postId = $routeParams.postId;
	self.orderProp = 'score';
	self.commentBoxShow = true;
	self.parentCommentId = null;

	self.getPost = function() {
		postHelper.getPost($http, self.postId)
		.then(function(res) {
			self.post = res.data;
			$scope.$apply();
		})
		.fail(function(err) {
			console.log(err);
		})
	};

	self.votePost = function(postId, voteType) {
		postHelper.vote($http, postId, voteType)
		.then(function(res) {
			self.getPost(self.postId);
			$scope.$apply();
		})
		.fail(function(err) {
			console.log(err);
		})
	};

	self.showCommentBox = function() {
		self.commentBoxShow = false;
	};

	self.getComments = function() {
		commentHelper.getComments($http, self.postId)
		.then(function(res) {
			self.postComments = res.data;
			$scope.$apply();
		})
		.fail(function(err) {
			console.log(err);
		})
	};

	self.voteComment = function(commentId, voteType) {
		commentHelper.voteComment($http, self.postId, commentId, voteType)
		.then(function(res) {
			self.getComments();
			$scope.$apply();
		})
		.fail(function(err) {
			console.log(err);
		})
	};

	//if the parentCommendId is null, that means 
	self.submitComment = function() {
		if (self.commentInput === '') {
			return;
		}

		var comment = {
			text: self.commentInput,
			parentCommentId: self.parentCommentId
		}

		commentHelper.submitComment($http, self.postId, comment)
		.then(function(res) {
			self.getComments();

			self.parentCommentId = null;
			self.commentInput = '';
			self.commentBoxShow = true;
			self.commentStatus = 'Comment Posted!';
		})
		.fail(function(err) {
			console.log(err);
			self.commentStatus = 'Comment Posting Failed!';
		})
	}

	//determines whether or not its a main comment or a subcomment
	self.prepareComment = function(parentCommentId) {
		self.parentCommentId = parentCommentId;
		self.showCommentBox();
	}

	self.deleteComment = function(commentId) {
		commentHelper.deleteComment($http, commentId)
		.then(function(res) {
			self.getComments();
		})
		.fail(function(err) {
			console.log(err);
		})
	}

	self.deletePost = function() {
		postHelper.deletePost($http, self.postId)
		.then(function(res) {
			window.location.replace('/#!/all')
		})
		.fail(function(err) {
			console.log(err);
		})
	}

	self.getPost();
	self.getComments(self.postId);
};

module.exports = PostDetailController;