angular.module('starter.factories', [])

.factory('mainInfoFactory', function($http) {

    var mainInfo = $http.get('./data/Horror.json').success(function(response) {
      // console.log("response", response);
        return response.data;
    });

    var factory = {}; // define factory object

    factory.getMainInfo = function() { // define method on factory object
      // console.log("mainInfo", mainInfo);
        return mainInfo; // returning data that was pulled in $http call

    };

    return factory; // returning factory to make it ready to be pulled by the controller

})

.factory('randomizer', function() {

  var factory = {}; // define factory object

  factory.chooseMe = function(checkedArray, numChoices) {
    var chosenPlayers = [];
    var random;

    for (var i = 0; i < numChoices; i++){
      // Get a random index from the array of checked investigators
      random = Math.floor(Math.random()* checkedArray.length);

      // Store which investigator that is
      chosenPlayers[i] = checkedArray[random];

      //Use splice to remove chosen player from selected array for next player
      checkedArray.splice(random, 1);
    }

    return chosenPlayers;
  }

  return factory; // returning factory to make it ready to be pulled by the controller

});
