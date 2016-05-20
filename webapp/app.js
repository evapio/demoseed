'use strict';

angular.module('productDemo', [
    'ngRoute',
    'ngMaterial',
    'ngResource',
    'config'
])

.config(
    [
        '$routeProvider',
        function($routeProvider) {
            $routeProvider
                .when('/', {
                    templateUrl: 'products.html',
                    controller: 'ProductsCtrl'
                }).when('/ping', {
                    templateUrl: 'ping.html',
                    controller: 'PingCtrl'
                });

        }
    ]
)

.config(function($mdThemingProvider) {
    $mdThemingProvider.theme('default')
        .primaryPalette('indigo')
        .accentPalette('blue');
})

.factory("ProductsService", function($resource, HOST) {

        return $resource(
            HOST + "/", {}, {
                list: {
                    method: 'GET',
                    isArray: false
                }
            }
        )
    })
    .factory("PingService", function($resource, HOST) {
        return $resource(
            HOST + "/", {}, {
                list: {
                    method: 'GET',
                    isArray: false
                }
            }
        )
    })
