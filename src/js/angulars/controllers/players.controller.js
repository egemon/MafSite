angular.module('base')
.controller('playersCtrl',
['$scope', 'CONFIG', 'editService','serverService', 'dateFilter',
function($scope, CONFIG, editService,  serverService, dateFilter) {

    this.inputTypes = CONFIG.inputTypes;


    $scope.setPlayers = setPlayers;
    $scope.addNewPlayer = addNewPlayer;
    $scope.removeItem = removeItem;
    $scope.addPresent = addPresent;
    $scope.startEdit = editService.startEdit;

    function setPlayers(players) {
        serverService.setPlayers(players);
    }

    function addNewPlayer (user) {
        console.log('[players.controller] addPlayer() ', arguments);
        var newPlayerObj = angular.copy(user);
        _emptyUser(user);
        newPlayerObj.birthday =  dateFilter(newPlayerObj.birthday, 'yyyy-MM-dd');
        $scope.players.data.push(newPlayerObj);
    }

    function removeItem (players, player) {
        var i = players.indexOf(player);
        players.splice(i,1);
    }

    function _emptyUser(user) {
        for(var key in user){
            user[key] = "";
        }
    }

    function addPresent (presents, newPresent) {
        console.log('[edit.service] addPresents()', arguments);
        presents.push(newPresent);
    }

}]);