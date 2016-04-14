angular.module('base').controller('newPlayerCtrl', ['$scope',
function($scope) {
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

    this.data = {};

    this.addPlayer = addPlayer;

    // ========= METHODS =======
    function addPlayer() {
        var newPlayerObj = angular.copy(this.data);
        $scope.players.push(newPlayerObj);
        this.data = {};
    }

}]);