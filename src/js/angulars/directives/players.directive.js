angular.module('base').directive('players', function(){

	return {
		scope: {
			players: "="
		},
		controller: "playersCtrl as playersCtr",
		restrict: 'E',
		templateUrl: 'pages/directives/players.html'
	};
});
