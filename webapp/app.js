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

.run(function($rootScope, Disco) {
    Disco.lookup("evap-zgqaovaad-eymqyrlba-wlmboxpwl-dev.service.evap:9001")
        .then(function(data) {
            $rootScope.apiServer = data
        })

})


.factory("DiscoConfig", function() {

    if (location.hostname.indexOf("service.evap") > -1) {
        var disco_host = "consul.service.evap:8500"
    } else {
        var disco_host = "disco.evap.io:8500"
    }

    return {
        host: disco_host
    }

})

.factory("DiscoService", function($resource, DiscoConfig) {

    return $resource("http://" + DiscoConfig.host + "/v1/catalog/service/:service", {
        service: '@service'
    }, {
        get: {
            method: 'GET',
            isArray: true
        }
    })
})


.factory("Disco", function(DiscoService, $q) {

    function lookup(key) {
        var service = key.split('.')[0]
        var deferred = $q.defer()

        DiscoService.get({ service: service })
            .$promise
            .then(function(data) {
                if (data[0]) {
                    var resource = data[0]

                    console.log(resource)

                    deferred.resolve({
                        host: resource.ServiceAddress,
                        port: resource.ServicePort,
                        hostAndPort: resource.ServiceAddress + ":" + resource.ServicePort
                    })
                }
            })

        return deferred.promise
    }

    return {
        lookup: lookup
    }
})

.factory("ProductsService", function($resource, $rootScope) {

    return $resource(
        'http://' + $rootScope.apiServer.hostAndPort + "/", {}, {
            list: {
                method: 'GET',
                isArray: false
            }
        }
    )
})
