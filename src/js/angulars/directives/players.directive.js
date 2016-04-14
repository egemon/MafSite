angular.module('base').directive('players', function(){

	return {
		scope: {
			players: "="
		},
		controller: "playersCtrl",
		restrict: 'E',
		templateUrl: 'pages/directives/players.html'
	};
});
