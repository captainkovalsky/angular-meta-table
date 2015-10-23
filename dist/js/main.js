var mod = angular.module('app', []);
var cell = {
    value: 'y',
    type: 'boolean'
};

var countryCell = {
    value: [1,2,3],
    type: 'select'
};

var rows = [[cell, countryCell]];

mod.controller('TestController', ['$scope', function ($scope) {
    $scope.rows = rows;
    $scope.isEdit = false;
    $scope.setEdit = function setEdit() {
        $scope.isEdit = true;
    };
}]);

mod.controller('adtCellController', ['$scope', '$parse', '$compile', '$templateCache',
    function ($scope, $parse, $compile, $templateCache) {
        this.getTemplate = function (isEdit, type) {
            var tpl;

            if (isEdit === 'true') {
                tpl = $templateCache.get('booleanEditView');
            } else {
                tpl = $templateCache.get('booleanView');
            }
            return tpl;
        };
    }
]);

mod.directive('adtCell', ['$compile',

    function ($compile) {
        var ENTER_KEY = 13;
        return {
            restrict: 'A',
            scope: true,
            link: link,
            controller: 'adtCellController'
        };

        function link(scope, el, attr, ctrl) {
            attr.$observe('isEdit', updateElementWithEditMode(el, scope, ctrl));
            el.on('keydown', saveCell);
        }

        function saveCell(e) {
            if (e.keyCode === ENTER_KEY) {
                alert('save');
            }
        }

        function updateElementWithEditMode(el, scope, ctrl) {
            return function (isEdit) {
                el.html(ctrl.getTemplate(isEdit));
                $compile(el.contents())(scope);
            };
        }
    }
]);
//sds
