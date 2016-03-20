angular.module('base')
.controller('baseCtrl', ['PAGES', '$scope', 'serverService', function(PAGES, $scope, serverService){
    $scope.number = 0;
    $scope.PAGES = PAGES;

    $scope.setPage = function setPage (i) {
        $scope.number = i;
        if ($scope.number === 1) {
            serverService.DFRDfetchData(PAGES[1].url).then(function (response) {
                console.log('base.controller.js DFRDfetchData() done', response);
                $scope.news = response.data;
            });
        }
    };



}]);