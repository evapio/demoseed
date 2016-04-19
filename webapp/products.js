'use strict';

angular.module('productDemo')

.controller('ProductsCtrl', function($scope, ProductsService) {

    $scope.products = []

    ProductsService.get()
        .$promise
        .then(function(data) {
            var it, results = [];
            for (var j = 0; j < data.products.length; j++) {
                it = {}
                it.product = data.products[j]
                it.span = { row: 1, col: 1 };

                switch (j + 1) {
                    case 1:
                        it.background = "red";
                        it.span.row = it.span.col = 2;
                        break;
                    case 2:
                        it.background = "green";
                        break;
                    case 3:
                        it.background = "darkBlue";
                        break;
                    case 4:
                        it.background = "blue";
                        it.span.col = 2;
                        break;
                    case 5:
                        it.background = "yellow";
                        it.span.row = it.span.col = 2;
                        break;
                    case 6:
                        it.background = "pink";
                        break;
                    case 7:
                        it.background = "darkBlue";
                        break;
                    case 8:
                        it.background = "purple";
                        break;
                    case 9:
                        it.background = "deepBlue";
                        break;
                    case 10:
                        it.background = "lightPurple";
                        break;
                    case 11:
                        it.background = "yellow";
                        break;
                }
                results.push(it);
            }

            $scope.products = results
            console.log($scope.products)
        })

})