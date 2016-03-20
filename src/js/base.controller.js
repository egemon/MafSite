angular.module('base')
.controller('baseCtrl', ['PAGES', '$scope', function(PAGES, $scope){
    $scope.number = 0;

    $scope.setPage = function setPage (i) {
        $scope.number = i;
    };
    $scope.PAGES = PAGES;
}]);