angular.module('base')
.config(['CONFIG', 'PAGES', '$stateProvider', '$urlRouterProvider', '$locationProvider',
  function(CONFIG, PAGES, $stateProvider, $urlRouterProvider, $locationProvider) {
  var tmplsUrl = CONFIG.TEMPLATES_URL;
  $locationProvider.html5Mode(true);
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
}]);