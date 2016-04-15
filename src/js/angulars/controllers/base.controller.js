angular.module('base')
.controller('baseCtrl',
['PAGES', '$scope', 'serverService', '$timeout', '$window', '$location',
function(PAGES, $scope, serverService, $timeout, $window, $location) {

    var pageUrl = $location.path().slice(1);
    var firstPage = findPageByUrl(pageUrl) || PAGES[0];
    setPage(firstPage);
    $scope.PAGES = PAGES;
    $scope.isOrg = false;
    $scope.user = serverService.player;

    $scope.login = login;
    $scope.setPage = setPage;
    $scope.openNewTab =  openNewTab;

    // ===== public methods
    function login (user) {
        console.log('[base.controller] login()', arguments);

        serverService.$_login(user);
    }

    function setPage (page) {
        console.log('[base.controller] setPage()', arguments);

        $scope.page = page;
        if (page.needData) {
            fetchDataFor(page, page.needMemberLevel);
        }
    }

    function openNewTab (url) {
        console.log('[base.controller] openNewTab()', arguments);

        if (url) {
            $window.open(url, '_blank');
        }
    }

    // ===== private mehtods

    function fetchDataFor (page, needMemberLevel) {
        console.log('[base.controller] fetchDataFor()', arguments);

        return serverService.$_fetchData(page, needMemberLevel)
            .catch(handleError.bind(this, page))
            .then(attchDataToScope.bind(this, $scope, page));
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

    function attchDataToScope ($scope, page, response) {
        console.log('[base.controller] attchDataToScope()', arguments);

        if (response.errorText) {
            $location.path(setPage(PAGES[0]));
        } else {
            $scope[page.url] = response;
        }
    }
}]);