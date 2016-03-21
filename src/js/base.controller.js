angular.module('base')
.controller('baseCtrl', ['PAGES', '$scope', 'serverService', function(PAGES, $scope, serverService) {
    $scope.page = 'home';
    $scope.PAGES = PAGES;

    $scope.setPage = function setPage (page, n) {
        $scope.page = page;
        if (PAGES[n].needData) {
            makeRequestFor(page).then(handleData.bind(this, page), handleError.bind(this, page));
        }
    };




    function makeRequestFor(page) {
        return serverService.DFRDfetchData(page);
    }

    function handleData(page, response) {
        if (!response) {
            return;
        }
        console.log('base.controller.js DFRDfetchData() done', response);
        $scope[page] = response.data;
    }

    function handleError(page, err) {
        $scope.err = err;
    }

}]);