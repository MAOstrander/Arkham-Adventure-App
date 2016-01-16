angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, mainInfoFactory) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.allCharacters = [
    { title: 'Amanda Sharpe', id: 0 },
    { title: 'Ashcane Pete', id: 1 },
    { title: 'Bob Jenkins', id: 2 },
    { title: 'Carolyn Fern', id: 3 },
    { title: 'Darrell Simmons', id: 4 },
    { title: 'Dexter Drake', id: 5 },
    { title: 'Gloria Goldberg', id: 6 },
    { title: 'Harvey Walters', id: 7 },
    { title: 'Jenny Barnes', id: 8 },
    { title: 'Joe Diamond', id: 9 },
    { title: 'Kate Winthrop', id: 10 },
    { title: 'Mandy Thompson', id: 11 },
    { title: 'Michael McGlen', id: 12 },
    { title: 'Monterey Jack', id: 13 },
    { title: 'Sister Mary', id: 14 },
    { title: 'Vincent Lee', id: 15 }
  ];
  $scope.allAncient = [
    { title: 'Azathoth', id: 0 },
    { title: 'Cthulu', id: 1 },
    { title: 'Hastur', id: 2 },
    { title: 'Ithaqua', id: 3 },
    { title: 'Nyarlathotep', id: 4 },
    { title: 'Shub-Niggurath', id: 5 },
    { title: 'Yig', id: 6 },
    { title: 'Yog-Sothoth', id: 7 }
  ];
  $scope.allHerald = [
    { title: 'Father Dagon', id: 0 },
    { title: 'Mother Hydra', id: 1 },
    { title: 'Bast', id: 2 }
  ];

  function chooseMe(checkedArray, numChoices) {
    var chosenPlayers = [];
    var random;

    for (var i = 0; i < numChoices; i++){
    // Get a random index from the array of checked investigators
    random = Math.floor(Math.random()* checkedArray.length);

    // Store which investigator that is
    chosenPlayers[i] = checkedArray[random].title;

    //Use splice to remove chosen player from selected array for next player
    checkedArray.splice(random, 1);
    }

    return chosenPlayers;
  }

  $scope.pickCharacters = function(numPlayers) {
    var chosen = chooseMe($scope.allCharacters, numPlayers);
    alert(chosen);
  };

  $scope.pickAncientOne = function(){
    var chosen = chooseMe($scope.allAncient, 1);
    alert("Chosen Ancient One: "+chosen);
  }

  $scope.pickHerald = function(){
    var testData = mainInfoFactory.getMainInfo();
    testData.success(function(res) {

    console.log("testData", res);
    var investigators = res.investigators;
    var amandaHome = investigators['Amanda Sharpe'].home;
    alert(amandaHome);
    })
    var chosen = chooseMe($scope.allHerald, 1);
    // alert("Chosen Herald: "+chosen);
  }

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.newGame = function() {
    alert("This will eventually start a new game");
  }
  $scope.oldGame = function() {
    alert("This will eventually allow you to continue your oldGame");
  }

  $scope.rollDice = function(numDice) {
    if (numDice === undefined) {
      numDice = 1;
    }
    var random = [];
    for (var i =0; i < numDice; i++){
      random[i] = Math.ceil(Math.random()*6);
    }
    alert("You rolled "+numDice+" and got the following: " + random);
    //return random;
  };

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('ResearchCtrl', function($scope) {

})

.controller('CharCtrl', function($scope, $stateParams) {
   $scope.where = $stateParams.id;
});
