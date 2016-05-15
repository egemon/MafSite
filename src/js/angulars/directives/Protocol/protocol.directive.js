angular.module('ProtocolApp')
.directive('protocol', function () {
    return {
        restrict: "E",
        templateUrl: 'pages/directives/protocol.html',
        controller: 'ProtocolCtrl as protocol'
    };
});