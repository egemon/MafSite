angular.module('server')
.service('serverService', ['$http', 'CONFIG', '$cookies',
    function serverService ($http, CONFIG, $cookies) {

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
    this.player.data = $cookies.getObject('player-data') || this.player.data;

    serverService.prototype.$_fetchData = function(page, needMemberLevel, data) {
        console.log('[server.service] $_fetchData()', arguments);

        if (needMemberLevel) {
            data = data || {};
        }

        return $http.post(CONFIG.BASE_SERVER_URL + page.url, data)
        .catch(failCallback.bind(this, needMemberLevel))
        .then(handleData.bind(this, page));
    };

    serverService.prototype.$_login = function() {
        console.log('[server.service] $_login()', arguments);

        return $http.post(CONFIG.BASE_SERVER_URL + CONFIG.LOGIN_URL, {
                credentials:{
                    user: this.player.data.nick,
                    password: this.player.data.password
                }
            })
            .catch(failCallback.bind(this))
            .then(handleLogin.bind(this));
    };

    serverService.prototype.setItems = function(items, field) {
        console.log('[server.service] setPlayers()', items);
        var data = {
            field: field,
            data: items
        };

        return $http.post(CONFIG.BASE_SERVER_URL + CONFIG.SET_URL, data)
            .catch(failCallback.bind(this))
            .then(handleData.bind(this, field));
    };

    // ========== PRIVATE METHODS
    function failCallback (needMemberLevel, err) {
        console.log('[server.service] failCallback()', err);
        if (err && err.status === -1) {
            alert('Сервер недоступен. Проверьте интернет соединение и сообщите администратору');
        }
    }

    function handleLogin (response) {
        console.log('[server.service] handleLogin()', arguments);

        var data  = response.data;
        if (data.errorText) {
            alert(data.errorText);
        } else {
            this.player.data = data;
            $cookies.putObject('player-data', this.player.data);
        }
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
            return {
                errorText: response.data.errorText
            };
        } else if(response.data.succesText) {
            alert(response.data.succesText);
        } else {
            angular.element(document.getElementById('view'))
                .css('visibility', 'visible');
            return response.data;
        }
    }
}]);

