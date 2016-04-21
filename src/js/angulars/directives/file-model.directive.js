angular.module('base')
.directive("fileModel", [function () {
    return {
        scope: {
            fileModel: "="
        },
        link: function (scope, element) {
            console.log('[file-model] link:()', arguments);
            element.bind("change", function (changeEvent) {
                console.log('[file-model] element.bind()', arguments);
                var reader = new FileReader();
                reader.onload = function (loadEvent) {
                    console.log('[file-model] reader.onload()', arguments);
                    scope.$apply(function () {
                        scope.fileModel = loadEvent.target.result;
                    });
                };
                reader.readAsDataURL(changeEvent.target.files[0]);
            });
        }
    };
}]);