angular.module('base')
.controller('baseCtrl', ['PAGES', '$scope', 'serverService', '$timeout',
function(PAGES, $scope, serverService, $timeout) {

    animateLogo();

    $scope.page = 'home';
    $scope.PAGES = PAGES;
    $scope.isOrg = false;



    $scope.login = function login (user, pass) {
        serverService.$_login(user, pass)
        .then(handleLogin);
    };

    $scope.setPage = function setPage (page, n) {
        $scope.page = page;
        if (PAGES[n].needData) {
            fetchDataFor(page)
            .then(handleData.bind(this, page), handleError.bind(this, page));
        }
    };


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

}]);