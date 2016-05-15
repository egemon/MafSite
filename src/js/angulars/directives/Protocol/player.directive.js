angular.module('ProtocolApp')
.directive('player', function () {
    return {
        restrict: 'EA',
        templateUrl: 'pages/directives/player.html',
        controller: 'PlayerCtrl as player',
        scope: {
            number: '=',
            maxFalls: '=',
            roles: '=',
            playerNicks: "="
        }
    };
});
