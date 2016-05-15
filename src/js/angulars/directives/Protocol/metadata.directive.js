angular.module('ProtocolApp')
.directive('metadata', function () {
    return {
        restrict: 'EA',
        templateUrl: 'pages/directives/metadata.html',
        controller: 'MetadataCtrl as metadata',
        scope: {
            tables: '=',
            wins: '=',
            playerNicks: "=",
        }
    };
});