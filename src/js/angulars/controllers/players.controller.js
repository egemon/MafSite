angular.module('base')
.controller('playersCtrl', ['$scope', 'serverService', 'dateFilter', function($scope, serverService, dateFilter){
    var editableField = null;
    var editablePlayer = null;

    $scope.startEdit =  startEdit;
    $scope.blurFocus =  blurFocus;
    $scope.setPlayers =  setPlayers;
    $scope.addBlurListener =  addBlurListener;
    $scope.addNewPlayer =  addNewPlayer;


    function handleEnter(event) {
        if(event.which === 13) {
            blurFocus(event);
        }
    }

    function startEdit($event, player, type) {
        console.log('[players.controller] startEdit()', arguments);
        type = type || 'text';
        var currentTarget = angular.element($event.toElement);
        if (currentTarget.attr('autofocus') === '') {
            return;
        }
        blurFocus($event);
        editableField = angular.element($event.toElement);
        var value = editableField.html().trim();
        if (type === 'date') {
            value = editableField.attr('date');
        }
        console.log('[players.controller] startEdit() value = ', value);
        var input = angular.element('<input type="' + type + '" value="'+value+'" autofocus>');
        input.bind("keydown keypress", handleEnter);
        editablePlayer = player;
        editableField.html('');
        editableField.append(input);
    }

    function blurFocus($event) {
        console.log('blurFocus', arguments);
        var currentTarget = angular.element($event.toElement);
        if (currentTarget.attr('autofocus') === '') {
            return;
        }
        if (editableField && !angular.equals(editableField, currentTarget)) {
            stopEdit();
        }
    }

    function stopEdit () {
        console.log('stopEdit()', arguments);

        var input = editableField.find('input');
        input.unbind("keydown keypress", handleEnter);
        var newVal = input.val();
        if (input.attr('type') === 'date') {
            editableField.attr('date', newVal);
            newVal = dateFilter(newVal);
        }

        editableField.html(newVal);

        var key = editableField.attr('key');
        editablePlayer[key] = newVal;

        editableField = null;
        editablePlayer = null;
    }

    function setPlayers(players) {
        serverService.setPlayers(players);
    }

    function addBlurListener () {
        angular.element(document).on('click', blurFocus);
    }


    function addNewPlayer (user) {
        console.log('[players.controller] addPlayer() ', arguments);
        var newPlayerObj = angular.copy(user);
        $scope.players.data.push(newPlayerObj);
        console.log('$scope.players.data ', $scope.players.data);
    }


    function dateToString(value) {
        console.log('[players.controller] dateToString()', arguments);
        return new Date(value).toLocaleDateString();
    }
}]);