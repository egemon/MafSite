angular.module('base').directive('newPlayer', function(){

    return {
        scope: {
            fields:"=",
            addPlayer: "&"
        },
        controller: "newPlayerCtrl as newPlayer",
        restrict: 'A',
        templateUrl: 'pages/directives/new-player.html'
    };
});
