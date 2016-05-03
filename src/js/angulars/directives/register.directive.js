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
            scope.date = new Date();

            scope.setRegister = function setRegister(register, date) {
                serverService.setItems(register, 'register', '/' + dateToStr(date) + '.json');
            };

            scope.$watch('date', function(newValue, oldValue, scope) {
                if (newValue === oldValue) {
                    return;
                }
                scope.fetchDataFor(null, 3, {
                    date: dateToStr(scope.date)
                });
            });

            function dateToStr(date) {
                return date.toISOString().split('T')[0];
            }
        }
    };
}]);
