angular.module('base')
.controller('baseCtrl', ['PAGES', '$scope', function(PAGES, $scope){
    $scope.PAGES = PAGES;
}]);