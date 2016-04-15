angular.module('config')
.constant('CONFIG', {
    TEMPLATES_URL: 'pages',
    BASE_SERVER_URL: 'http://bs-mafiaclub.rhcloud.com/', //http://bs-mafiaclub.rhcloud.com/
    LOGIN_URL: 'login',
    SET_PLAYERS_URL: 'setplayers',
    inputTypes: {
        nick: 'text',
        password: 'password',
        vk: 'url',
        birthday: 'date',
        name: 'text',
        phone: 'tel',
        position: 'text',
        memberLevel: 'number',
        faculty: 'text',
        experiance: 'text'
    }
});