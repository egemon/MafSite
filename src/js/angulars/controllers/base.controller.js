angular.module('base')
.controller('baseCtrl', ['PAGES', '$scope', 'serverService', '$timeout', '$window', '$location',
function(PAGES, $scope, serverService, $timeout, $window, $location) {

    animateLogo();

    var pageUrl = $location.path().slice(1);
    var page = findPageByUrl(pageUrl);
    setPage(page);
    $scope.PAGES = PAGES;
    $scope.isOrg = false;
    $scope.user = serverService.player;
    console.log('$scope.user.memberLevel', $scope.user.memberLevel);

    $scope.login = login;
    $scope.setPage = setPage;
    $scope.openNewTab =  openNewTab;

    // ===== public methods
    function login () {
        serverService.$_login();
    }

    function setPage (page) {
        console.log('[baseCtrl] setPage()', arguments);
        $scope.page = page;

        if (page.needData || page.needMemberLevel) {
            fetchDataFor(page, page.needMemberLevel)
            .then(handleData.bind(this, page));
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

    function fetchDataFor (page, needMemberLevel) {
        console.log('[base.controller] fetchDataFor()', arguments);
        return serverService.$_fetchData(page.url, needMemberLevel).catch(handleError.bind(this, page));
    }

    function handleData (page, response) {
        console.log('[base.controller] handleData()', arguments);
        if (!response) {
            return;
        }
        $scope[page.url] = response.data;
    }

    function handleError (page, err) {
        console.log('[base.controller] handleError()', arguments);
        $scope.err = err;
    }

    function findPageByUrl(url) {
        console.log('[base.controller] findPageByUrl()', arguments);
        for (var i = 0; i < PAGES.length; i++) {
            var el = PAGES[i];
            if (el.url == url) {
                return el;
            }
        }
    }

}]);