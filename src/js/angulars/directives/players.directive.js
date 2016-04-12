angular.directive('players', ['', function(){

	return {
		scope: {
			players: "&players"
		}, 
		controller: "playersCtrl",
		restrict: 'E',
		templateUrl: 'pages/directives/players.html'
	};
}]);