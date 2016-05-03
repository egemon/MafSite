angular.module('base', ['ui.router', 'server', 'ngAnimate', 'templates', 'ProtocolApp','ngCookies', 'autocomplete'],
  ['CONFIG', 'club','PAGES', '$stateProvider', '$urlRouterProvider',
  function generalConfig (CONFIG, club, PAGES, $stateProvider, $urlRouterProvider) {
    CONFIG.BASE_SERVER_URL = club.BASE_SERVER_URL = location.origin + '/';
    var tmplsUrl = CONFIG.TEMPLATES_URL;
    $urlRouterProvider.otherwise('/' + PAGES[0].url);

    for (var i = 0; i < PAGES.length; i++) {
      var page = PAGES[i];
      var url = '/' + page.url;

      // var name = page.name;
      $stateProvider.state(url, {
        url: '/' + page.url,
        templateUrl: tmplsUrl + url + '.html'
      });
    }
  }
]).run(['$rootScope', '$timeout', function generalRun ($rootScope, $timeout) {

    animateLogo($rootScope);

    function animateLogo ($scope) {
        $scope.logoClass = 'animating-started';
        $timeout(function () {
            $scope.logoClass = 'animating-ended';
        }, 1500);
    }
}]);