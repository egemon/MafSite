angular.module('base')
.controller('baseCtrl',
['PAGES', '$scope', 'serverService', '$timeout', '$window', '$location',
function(PAGES, $scope, serverService, $timeout, $window, $location) {

    animateLogo();

    var editableField = null;
    var editablePlayer = null;
    var pageUrl = $location.path().slice(1);
    var page = findPageByUrl(pageUrl) || PAGES[0];
    setPage(page);
    $scope.PAGES = PAGES;
    $scope.isOrg = false;
    $scope.user = serverService.player;

    $scope.login = login;
    $scope.setPage = setPage;
    $scope.openNewTab =  openNewTab;
    $scope.startEdit =  startEdit;
    $scope.blurFocus =  blurFocus;
    $scope.setPlayers =  setPlayers;




    // ===== public methods
    function login (user) {
        serverService.$_login(user);
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
        return serverService.$_fetchData(page.url, needMemberLevel)
            .catch(handleError.bind(this, page));
    }

    function handleData (page, response) {
        console.log('[base.controller] handleData()', arguments);
        if (!response) {
            return;
        }
        if (response.data.errorText) {
            angular.element(document.getElementById('view'))
                .css('visibility', 'hidden');
            alert(response.data.errorText);
            $location.path(setPage(PAGES[0]));
        } else {
            $scope[page.url] = response.data;
            angular.element(document.getElementById('view'))
                .css('visibility', 'visible');
        }
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

    function handleEnter(event) {
        if(event.which === 13) {
            blurFocus(event);
        }
    }

    function startEdit($event, player) {
        console.log('startEdit', arguments);
        var currentTarget = angular.element($event.toElement);
        if (currentTarget.attr('autofocus') === '') {
            return;
        }
        blurFocus($event);
        editableField = angular.element($event.toElement);
        var input = angular.element('<input type="text" value="'+editableField.html().trim()+'" autofocus>');
        input.bind("keydown keypress", handleEnter);
        editablePlayer = player;
        editableField.html('');
        editableField.append(input);
    }

    function blurFocus($event) {
        console.log('blurFocus', arguments);
        var currentTarget = angular.element($event.toElement);
        if (currentTarget.attr('autofocus') === '') {
            return;
        }
        if (editableField && !angular.equals(editableField, currentTarget)) {
            stopEdit();
        }
    }

    function stopEdit () {
        console.log('stopEdit()', arguments);

        var input = editableField.find('input');
        input.unbind("keydown keypress", handleEnter);
        var newVal = input.val();
        editableField.html(newVal);

        var key = editableField.attr('key');
        editablePlayer[key] = newVal;

        editableField = null;
        editablePlayer = null;
    }

    function setPlayers(players) {
        serverService.setPlayers(players);
    }



}]);