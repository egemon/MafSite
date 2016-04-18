angular.module('base').directive('contents', function(){

    return {
        scope: {
            contents:"="
        },
        controller: "contentsCtrl as contentsCtr",
        restrict: 'E',
        templateUrl: 'pages/directives/contents.html'
    };
});
