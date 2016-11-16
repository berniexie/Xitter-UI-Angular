app.controller("MainController", function($scope){
	$scope.inputTitle = "";
	$scope.inputText = "";
	$scope.posts = [
		{id: 0, title: "title1", text: "text1"},
		{id: 1, title: "title2", text: "text2"},
		{id: 2, title: "title3", text: "text3"},
		{id: 3, title: "title4", text: "text4"}
	];

	$scope.addNew = function() {
		if($scope.inputTitle != null && $scope.inputText != null) {
			$scope.posts.push({
				id: 0,
				title: $scope.inputTitle,
				text: $scope.inputText
			})
		}
	}
});