angular.module('base')
.controller('playersCtrl', ['$scope', 'serverService', function($scope, serverService){
    var editableField = null;
    var editablePlayer = null;

    $scope.startEdit =  startEdit;
    $scope.blurFocus =  blurFocus;
    $scope.setPlayers =  setPlayers;
    $scope.addBlurListener =  addBlurListener;

    function handleEnter(event) {
        if(event.which === 13) {
            blurFocus(event);
        }
    }

    function startEdit($event, player) {
        console.log('startEdit', arguments);
        var currentTarget = angular.element($event.toElement);
        if (currentTarget.attr('autofocus') === '') {
            return;
        }
        blurFocus($event);
        editableField = angular.element($event.toElement);
        var input = angular.element('<input type="text" value="'+editableField.html().trim()+'" autofocus>');
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
        angular.element(document).one('click', blurFocus);
    }
}]);