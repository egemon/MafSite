angular.module('timer')
.directive('timer', function () {
    return {
        restrict: 'E',
        templateUrl: 'pages/directives/timer.html',
        controller: 'timerCtrl as timer'
    };
});