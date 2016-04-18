angular.module('server')
.service('editService', ['$http', 'CONFIG', 'dateFilter',
function editService ($http, CONFIG, dateFilter) {

    var editableField = null;
    var editablePlayer = null;


    angular.element(document).on('click', blurFocus);

    function handleEnter(event) {
        if(event.which === 13) {
            blurFocus(event);
        }
    }

    function startEdit($event, player, type) {
        console.log('[edit.service] startEdit()', arguments);

        type = type || 'text';
        var currentTarget = angular.element($event.toElement);
        console.log('currentTarget', currentTarget);
        if (currentTarget.attr('autofocus') === '') {
            return;
        }
        blurFocus($event);
        editableField = angular.element($event.toElement);
        console.log('editableField', editableField);
        var value = editableField.html().trim();

        if (type === 'date') {
            value = editableField.attr('date');
        }
        console.log('value', value);
        var input = angular.element('<input type="' + type + '" value="'+value+'" autofocus>');
        input.bind("keydown keypress", handleEnter);
        editablePlayer = player;
        editableField.html('');
        editableField.append(input);
    }

    function blurFocus($event) {
        console.log('[edit.service] blurFocus', arguments);

        var currentTarget = angular.element($event.toElement);
        if (currentTarget.attr('autofocus') === '') {
            return;
        }
        if (editableField && !angular.equals(editableField, currentTarget)) {
            stopEdit();
        }
    }

    function stopEdit () {
        console.log('[edit.service] stopEdit()', arguments);

        var input = editableField.find('input');
        input.unbind("keydown keypress", handleEnter);
        var newVal = input.val();


        if (input.attr('type') === 'date') {
            editableField.attr('date', newVal);
            newVal = dateFilter(newVal);
        }

        editableField.html(newVal);

        var key = editableField.attr('key');
        var iterator = editableField.attr('iterator');
        var clue = editableField.attr('clue');
        console.log('iterator = ', iterator);
        if (iterator) {
            if (clue) {
                editablePlayer[key][iterator][clue] = newVal;
            } else {
                editablePlayer[key][iterator] = newVal;
            }
        } else {
            editablePlayer[key] = newVal;
        }

        editableField = null;
        editablePlayer = null;
    }


    return {
        startEdit:  startEdit,
        blurFocus:  blurFocus
    };

}]);