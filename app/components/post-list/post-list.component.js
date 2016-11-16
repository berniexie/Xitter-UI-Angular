angular.module('postList').
	component('postList', {
		templateUrl:'components/post-list/post-list.template.html',
	  controller: function PostListController($http) {
	  	var self = this;
	   	self.name = "XitterApp";
			self.orderProp = 'score';

			// $http.get('')
			// .then(function(res) {
			// 	self.posts = res.data;
			// });

			this.addNew = function() {
				if(this.inputTitle != null && this.inputText != null) {
					this.posts.push({
						id: 0,
						title: this.inputTitle,
						text: this.inputText,
						timeCreate: '',
						score: 5000
					});
				}
			};
		}
	});
