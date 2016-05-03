angular.module('base').directive('register', ['serverService', function(serverService){

    return {
        scope: {
            register:"=data",
            removeItem: '=',
            addItem: '=',
            fetchDataFor: '=',
        },
        restrict: 'E',
        templateUrl: 'pages/directives/register.html',
        link: function (scope) {
            console.log('[register.directive.js] link()', arguments);

            // ========= INIT PART
            restoreDefaults();
            scope.$on('register-request', restoreDefaults);
            scope.$watch('date', function(newValue, oldValue, scope) {
                if (newValue === oldValue) {
                    return;
                }
                scope.fetchDataFor(null, 3, {
                    date: dateToStr(scope.date)
                });
            });

            // ========= METHODS
            scope.setRegister = function setRegister(register, date) {
                for (var i = 0; i < register.length; i++) {
                    if (register[i].nick === null) {
                        register[i].nick = '';
                    }
                    if (register[i].sum === null) {
                        register[i].sum = 0;
                    }
                    if (register[i].debt === null) {
                        register[i].debt = 0;
                    }

                }
                serverService.setItems(register, 'register', '/' + dateToStr(date) + '.json');
            };

            scope.getSum = function getSum() {
                if (!scope.register) {
                    return;
                }
                 return scope.register.data.reduce(function (prev, cur) {
                     return prev + cur.sum;
                 }, 0);
            };

            scope.isValid = function isValid() {
                if (!scope.register) {
                    return;
                }
                return scope.register.data.reduce(function (prev, cur) {
                     return prev && cur.nick;
                 }, true);
            };

            // ====== HELPERS ========

            function dateToStr(date) {
                return date.toISOString().split('T')[0];
            }

            function restoreDefaults() {
                scope.date = new Date();
                serverService.$_fetchData({url:'players'}, 3).then(updateAutocomplete);
            }


            function updateAutocomplete(data) {
                console.log('[register.directive.js] updateAutocomplete()', arguments);
                scope.playerNicks = data.data.map(function(el) {
                    return el.nick;
                });
            }
        }
    };
}]);
