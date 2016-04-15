angular.module('base').controller('newPlayerCtrl', ['$scope',
function() {
    this.types = {
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
    };

    this.data = {
        presents: [],
        honours: []
    };

}]);