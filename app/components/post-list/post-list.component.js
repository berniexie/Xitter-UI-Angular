angular.module('postList').
	component('postList', {
		templateUrl:'components/post-list/post-list.template.html',
	  controller: [
		  '$http',
		  function PostListController($http) {
		  	var self = this;
		   	self.name = "XitterApp";
				self.orderProp = 'score';

				self.pullImages = function() {
					$http.get('http://xitter3.us-west-2.test.expedia.com/base')
					.then(function successCallback(res) {
						console.log(res);
						self.posts = res.data;
					}, function errorCallback(err) {
						console.log(err);
					});
				}

				self.addNew = function() {
					if(self.inputTitle != null && self.inputText != null) {
						var newPost = 
						{
							id: 0,
							title: self.inputTitle,
							text: self.inputText,
							timeCreate: '',
							score: 0
						};

						$http.post('http://xitter3.us-west-2.test.expedia.com/post', newPost)
						.then(function successCallback(res) {
							console.log(res);
							self.pullImages;
						}, function errorCallback(err) {
							console.log(err);
						})
					}
				};

				//Pull images for the first time
				self.pullImages();
			}
		]
	});
