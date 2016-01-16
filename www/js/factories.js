angular.module('starter.factories', [])

.factory('mainInfoFactory', function($http) {

    var mainInfo = $http.get('./data/Horror.json').success(function(response) {
      console.log("response", response);
        return response.data;
    });

    var factory = {}; // define factory object

    factory.getMainInfo = function() { // define method on factory object

      console.log("mainInfo", mainInfo);
        return mainInfo; // returning data that was pulled in $http call

    };

    return factory; // returning factory to make it ready to be pulled by the controller

});
