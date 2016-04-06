angular.module('server')
.service('serverService', ['$http', 'CONFIG', function serverService ($http, CONFIG) {

    this.player = {
        data: {
            "nick": "",
            "password": "",
            "vk": "",
            "birthday": "",
            "name": "",
            "phone": "",
            "memberLevel": 0,
            "faculty": "",
            "experiance": ""
        }
    };

    serverService.prototype.$_fetchData = function(pageUrl, needMemberLevel) {
        console.log('[server.service] $_fetchData()', arguments);
        return $http.post(CONFIG.BASE_SERVER_URL + pageUrl,
            needMemberLevel ? {
                user: this.player.data.nick,
                password: this.player.data.password
            } : '')
        .catch(failCallback.bind(this));
    };

    serverService.prototype.$_login = function() {
        console.log('[server.service] $_login()', arguments);
        return $http.post(CONFIG.BASE_SERVER_URL + CONFIG.LOGIN_URL, {
            user: this.player.data.nick,
            password: this.player.data.password
        }).catch(failCallback.bind(this))
        .then(handleLogin.bind(this));
    };

    // ========== PRIVATE METHODS
    function failCallback (err) {
        console.log('[server.service.js] failCallback()', err);
        throw {
            status: err.status,
            text: err.statusText
        };
    }

    function handleLogin (response) {
        console.log('[server.service] handleLogin()', arguments);
        var data  = response.data;
        if (data.errorText) {
            alert(data.errorText);
        } else {
            this.player.data = data;
        }
    }
}]);

