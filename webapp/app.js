'use strict';

angular.module('productDemo', [
    'ngRoute',
    'ngMaterial',
    'ngResource'
])

.config(
    [
        '$routeProvider',
        function($routeProvider) {
            $routeProvider
                .when('/', {
                    templateUrl: 'products.html',
                    controller: 'ProductsCtrl'
                });

        }
    ]
)

.config(function($mdThemingProvider) {
    $mdThemingProvider.theme('default')
        .primaryPalette('indigo')
        .accentPalette('blue');
})

.factory("Disco", function() {

    function getConfig() {
        return "evap-zgqaovaad-eymqyrlba-wlmboxpwl-dev.service.evap:9001"
    }

    return {
        config: getConfig
    }
})

.factory("ProductsService", function($resource, Disco) {
    return $resource(
        'http://' + Disco.config() + "/", {}, {
            list: {
                method: 'GET',
                isArray: false
            }
        }
    )
})