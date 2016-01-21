angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, mainInfoFactory) {

  var mainMenu = this;

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  var testData = mainInfoFactory.getMainInfo();
  testData.success(function(res) {

    console.log("testData", res);

    mainMenu.allCharacters = res.investigators;
    mainMenu.allAncient = res['ancient ones'];
  })

  mainMenu.allHerald = {
    'Father Dagon': 0,
    'Mother Hydra': 1,
    'Bast': 2
  };

  function chooseMe(checkedArray, numChoices) {
    var chosenPlayers = [];
    var random;

    for (var i = 0; i < numChoices; i++){
    // Get a random index from the array of checked investigators
    random = Math.floor(Math.random()* checkedArray.length);

    // Store which investigator that is
    // chosenPlayers[i] = checkedArray[random].name;
    chosenPlayers[i] = checkedArray[random];

    //Use splice to remove chosen player from selected array for next player
    checkedArray.splice(random, 1);
    }

    return chosenPlayers;
  }

  mainMenu.pickCharacters = function(numPlayers) {
      var charChoices = [];
      for (var each in mainMenu.allCharacters) {
        charChoices.push(each);
      }
    var chosen = chooseMe(charChoices, numPlayers);
    alert("Chosen investigator(s): "+chosen);
  };

  mainMenu.pickAncientOne = function(){
    var foeChoices = [];
    for (var each in mainMenu.allAncient) {
      foeChoices.push(each);
    }

    var chosen = chooseMe(foeChoices, 1);
    alert("Chosen Ancient One: "+chosen);
  }

  mainMenu.pickHerald = function(){
    var heraldChoice = [];
    console.log("mainMenu.allHerald", mainMenu.allHerald);
    for (var each in mainMenu.allHerald) {
      console.log("ea", each.name);
      heraldChoice.push(each);
    }

    var chosen = chooseMe(heraldChoice, 1);
    alert("Chosen Herald: "+chosen);
  }

  mainMenu.quickStart = function(){
    mainMenu.pickCharacters(8);
    mainMenu.pickAncientOne();
    mainMenu.pickHerald();
  }

  mainMenu.newGame = function() {
    alert("This will eventually start a new game");
  }
  mainMenu.oldGame = function() {
    alert("This will eventually allow you to continue your oldGame");
  }

  mainMenu.rollDice = function(numDice) {
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


  //This is example code for a login modal
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });


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
  //END login modal example code

})

.controller('ResearchCtrl', function($scope) {

})

.controller('CharCtrl', function($scope, $stateParams) {
  console.log("WHAT DOES IT LOOK LIKE WHEN I ARRIVE", $stateParams);
  console.log("mainMenu.allCharacters", $scope.$parent.mainMenu.allCharacters);
   $scope.where = $stateParams.id;
});
