angular.module('base').directive('rating', function(){

    return {
        scope: {
            page:"=",
            fetchDataFor: '='
        },
        controller: "ratingCtrl as ratingCtr",
        restrict: 'E',
        templateUrl: 'pages/directives/rating.html'
    };
});
