angular.module('base')
.controller('baseCtrl', ['PAGES', '$scope', 'serverService', '$timeout', '$window', '$location',
function(PAGES, $scope, serverService, $timeout, $window, $location) {

    animateLogo();

    console.log('$window', $window);
    var page = $location.path().slice(1);
    setPage(page, isDataNeededFor(page));
    $scope.PAGES = PAGES;
    $scope.isOrg = false;

    $scope.login = login;
    $scope.setPage = setPage;
    $scope.openNewTab =  openNewTab;

    // ===== public methods
    function login (user, pass) {
        serverService.$_login(user, pass)
        .then(handleLogin);
    }

    function setPage (page) {
        $scope.page = page;
        if (isDataNeededFor(page)) {
            fetchDataFor(page)
            .then(handleData.bind(this, page), handleError.bind(this, page));
        }
    }

    function openNewTab (url) {
        if (url) {
            $window.open(url, '_blank');
        }
    }

    // ===== private mehtods

    function animateLogo () {
        $scope.logoClass = 'animating-started';
        $timeout(function () {
            $scope.logoClass = 'animating-ended';
        }, 1500);
    }

    function fetchDataFor (page) {
        return serverService.$_fetchData(page);
    }

    function handleData (page, response) {
        if (!response) {
            return;
        }
        console.log('base.controller.js $_fetchData() done', response);
        $scope[page] = response.data;
    }

    function handleError (page, err) {
        $scope.err = err;
    }

    function handleLogin (response) {
        if (response.data === 'Не правильный пароль!') {
            alert(response.data);
        } else {
            window.location.pathname = response.data;
        }
    }

    function isDataNeededFor (page) {
        console.log('page', page);
        console.log('PAGES', PAGES);
        for (var i = 0; i < PAGES.length; i++) {
            var el = PAGES[i];
            if (el.url == page) {
                return el.needData;
            }
        }
    }

}]);