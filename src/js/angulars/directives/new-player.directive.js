angular.module('base').directive('newPlayer', function(){

    return {
        scope: {
            player: "=sample",
            players:"="
        },
        controller: "newPlayerCtrl as newPlayer",
        restrict: 'A',
        templateUrl: 'pages/directives/new-player.html'
    };
});
