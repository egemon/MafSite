angular.module('base').controller('contentsCtrl', ['$scope', 'editService',
function($scope, editService) {
    $scope.startEdit = editService.startEdit;
}]);