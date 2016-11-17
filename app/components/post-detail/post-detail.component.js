angular.module('postDetail')
	.component('postDetail', {
		templateUrl: 'components/post-detail/post-detail.template.html',
		controller: [
			'$routeParams', 
			'$http',
			function postDetailController($routeParams, $http) {
				var self = this;

				self.postId = $routeParams.postId;
				self.orderProp = 'score';
				self.commentBoxShow = true;
				self.parentCommentId = null;

				self.getPost = function(postId) {
					$http.get('http://xitter3.us-west-2.test.expedia.com/post/' + postId)
					.then(function successCallback(res) {
						self.post = res.data;
					}, function errorCallback(err) {
						console.log(err);
					})
				};

				self.vote = function(postId, voteType) {
					var post = _.find(self.posts, function(post) {
						return post.id = postId;
					})

					$http.post('http://xitter3.us-west-2.test.expedia.com/vote/post?postId=' + postId + '&vote=' + voteType)
						.then(function successCallback(res) {
							console.log(res);
							self.getPost(self.postId);
						}, function errorCallback(err) {
							console.log(err);
						})
				};

				self.showCommentBox = function() {
					self.commentBoxShow = false;
				};

				self.getComments = function(postId) {
					$http.get('http://xitter3.us-west-2.test.expedia.com/comments/post/' + postId)
					.then(function successCallback(res) {
						console.log(res)
						self.postComments = res.data;
					}, function errorCallback(err) {
						console.log(err);
					})
				};

				self.voteComment = function(commentId, voteType) {
					$http.post('http://xitter3.us-west-2.test.expedia.com/vote/comment?commentId=' + commentId + "&vote=" + voteType + "&postId=" + self.postId)
						.then(function successCallback(res) {
							console.log(res);
							self.getComments(self.postId);
						}, function errorCallback(err) {
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

					$http.post('http://xitter3.us-west-2.test.expedia.com/comments/post/' + self.postId, comment)
						.then(function successCallback(res) {
							console.log(res);
							self.getComments(self.postId);
						}, function errorCallback(err) {
							console.log(err);
						})
						.then(function finallyCallback(){
							self.parentCommentId = null;
							self.commentInput = '';
							self.commentBoxShow = true;
						})
				}

				//determines whether or not its a main comment or a subcomment
				self.prepareComment = function(parentCommentId) {
					self.parentCommentId = parentCommentId;
					self.showCommentBox();
				}


				self.getPost(self.postId);
				self.getComments(self.postId);
			}
		]
	});