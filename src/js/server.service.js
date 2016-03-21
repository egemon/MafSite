angular.module('server')
.service('serverService', ['$http', 'CONFIG', serverService]);

function serverService ($http, CONFIG) {

    serverService.prototype.DFRDfetchData = function(pageUrl, data) {
        return $http.post(CONFIG.BASE_SERVER_URL + pageUrl).catch(this.failCallback);
    };

    serverService.prototype.failCallback = function(err) {
        console.log('server.service.js failCallback()', err);
        throw {
            status: err.status,
            text: err.statusText
        };
    };

}
