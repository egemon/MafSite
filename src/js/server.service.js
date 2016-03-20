angular.module('server')
.service('serverService', ['$http', 'CONFIG', serverService]);

function serverService ($http, CONFIG) {

    serverService.prototype.DFRDfetchData = function(pageUrl, data) {
        return $http.get(CONFIG.BASE_SERVER_URL + pageUrl).then(function (data) {return data} ,this.failCallback);
    };

    serverService.prototype.failCallback = function(err) {
        console.error('server.service.js failCallback()', err);
    };

}
