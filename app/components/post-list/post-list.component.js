angular.module('postList').
	component('postList', {
		templateUrl:'components/post-list/post-list.template.html',
	  controller: [
		  '$http',
		  function PostListController($http) {
		  	var self = this;
		   	self.name = "XitterApp";
				self.orderProp = 'score';

				self.pullPosts = function() {
					$http.get('http://xitter3.us-west-2.test.expedia.com/base')
					.then(function successCallback(res) {
						self.posts = res.data;
					}, function errorCallback(err) {
						console.log(err);
					});
				}

				self.addNew = function() {
					if(self.inputTitle != null && self.inputText != null) {
						var newPost = 
						{
							title: self.inputTitle,
							text: self.inputText
						};

						$http.post('http://xitter3.us-west-2.test.expedia.com/post', newPost)
						.then(function successCallback(res) {
							self.pullPosts();
						}, function errorCallback(err) {
							console.log(err);
						})
					}
				};

				self.vote = function(postId, voteType) {
					var post = _.find(self.posts, function(post) {
						return post.id = postId;
					})

					$http.post('http://xitter3.us-west-2.test.expedia.com/vote/post?postId=' + postId + '&vote=' + voteType)
						.then(function successCallback(res) {
							self.pullPosts();
						}, function errorCallback(err) {
							console.log(err);
						})
				};

				//Pull images for the first time
				self.pullPosts();
			}
		]
	});
