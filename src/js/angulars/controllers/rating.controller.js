angular.module('base').controller('ratingCtrl', ['$scope', 'CONFIG','serverService',
function($scope, CONFIG) {
    var today = new Date();
    this.filterFields = CONFIG.filterFields;

    this.periodType = 'month';
    this.currentPeriodTypes = this.filterFields[this.periodType].value;
    this.period = getObjByValue(+today.toISOString().split('T')[0].split('-')[1], this.currentPeriodTypes);
    this.year = getObjByValue(today.getUTCFullYear(), this.filterFields.year.value);



    this.getRating = getRating;

    $scope.$on('rating-request', restoreDefaults.bind(this));

    // ====== METHODS =========
    function getRating () {
        $scope.fetchDataFor($scope.page, 0, {
            periodType: this.periodType,
            period: this.periodType === 'year' ? '' : this.period.value,
            year: this.year.value
        });
    }

    // ======= PRIVATE ==========

    function getObjByValue(value, array) {
        for (var i = 0; i < array.length; i++) {
            if (array[i].value == value) {
                return array[i];
            }
        }
    }

    var defaults = {
        periodType: this.periodType,
        period: this.period,
        year: this.year
    };

    function restoreDefaults() {
        this.periodType = defaults.periodType;
        this.currentPeriodTypes = this.filterFields[this.periodType].value;
        this.period = defaults.period;
        this.year = defaults.year;
    }

}]);