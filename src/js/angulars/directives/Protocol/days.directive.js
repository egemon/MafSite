angular.module('ProtocolApp')
.directive('days', function () {
    return {
        restrict: 'E',
        templateUrl: 'pages/directives/days.html',
        controller: 'DaysCtrl as DaysCtrl',
        scope: {
            state: '=',
            days: '=',
            players: '=',
        }
    };
});
