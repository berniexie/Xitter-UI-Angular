var Q = require('q');
var postHelper = require('../../helpers/postHelper');

var PostListController = function ($scope, $http) {
	var self = this;
	self.name = "XitterApp";
	self.orderProp = 'score';

	self.pullPosts = function() {
		postHelper.pullPosts($http)
		.then(function(res) {
			self.posts = res.data;
			$scope.$apply();
		})
		.fail(function(error) {
			console.log(error);
		});
	};

	self.addNew = function() {
		if(self.inputTitle != null && self.inputText != null) {
			var newPost = 
			{
				title: self.inputTitle,
				text: self.inputText
			};

			postHelper.addNewPost($http, newPost)
			.then(function(res) {
				self.pullPosts();
				self.inputTitle = '';
				self.inputText = '';
				self.postStatus = 'Post successful!';
			})
			.fail(function(err) {
				console.log(err);
				self.postStatus = 'Post failed!';
			})
		}
	};

	self.vote = function(postId, voteType) {
		postHelper.vote($http, postId, voteType)
		.then(function(res) {
			self.pullPosts();
		})
		.fail(function(err) {
			console.log(err);
		})
	};

	//Pull images for the first time
	self.pullPosts();
	$(document).ready(function() {
	  $('select').material_select();
	});
};

module.exports = PostListController;
