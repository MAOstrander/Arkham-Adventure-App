angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $state, $ionicHistory, mainInfoFactory, randomizer, loader) {

  var mainMenu = this;

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  var testData = mainInfoFactory.getMainInfo();
  var secondTestData = mainInfoFactory.getSketchInfo();
  testData.success(function(res) {


    // mainMenu.allCharacters = res.investigators;
    // mainMenu.allAncient = res['ancient ones'];
  })

  secondTestData.success(function(res) {
    console.log("testData2", res);
    mainMenu.allCharacters = res.investigators;
    mainMenu.allAncient = res.ancientOnes;
    mainMenu.test = res;
  })

  mainMenu.allHerald = {
    'Father Dagon': 0,
    'Mother Hydra': 1,
    'Bast': 2
  };

  mainMenu.savedGames = JSON.parse(localStorage.getItem("savedGames")) || {};

  mainMenu.quickPick = function(sourceArray, numPlayers) {
    // var choices = Object.keys(sourceArray).slice(0);
    var choices = [];
    for (var i = 0; i < sourceArray.length; i++) {
      choices[i] = sourceArray[i].name.slice(0);
    }
    var chosen = randomizer.chooseMe(choices, numPlayers);
    return chosen;
  };

  mainMenu.pickCharacters = function(numPlayers) {
    var hero = mainMenu.quickPick(mainMenu.allCharacters, numPlayers);
    alert("Chosen investigator(s): "+hero);
  };

  mainMenu.pickAncientOne = function(){
    var foe = mainMenu.quickPick(mainMenu.allAncient, 1);
    alert("Chosen Ancient One: "+foe);
  }

  mainMenu.pickHerald = function(){
    var herald = mainMenu.quickPick(mainMenu.allHerald, 1);
    alert("Chosen Herald: "+herald);
  }

  mainMenu.quickStart = function(){
    mainMenu.pickCharacters(8);
    mainMenu.pickAncientOne();
    mainMenu.pickHerald();
  }

  mainMenu.newGame = function() {
    // alert("This will eventually start a new game");
    window.location.href='#/app/create';
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


  //Experiments inconclusive, reverting back to 'login' modal instead of 'load game' modal
  //This is example code for a login modal
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/loadgame.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.loadGameFromModal = function(loadThisGame) {
    // console.log("loadThisGame", loadThisGame);
    loader.setCurrentGame(loadThisGame);

    $timeout(function() {
      $ionicHistory.nextViewOptions({
        disableBack: true
      });
      $state.go('app.score');
    }, 500);

    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  }


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

.controller('newGameCtrl', function($scope, mainInfoFactory) {
  var creator = this;
  console.log("Does this double as well?");
  creator.game = {
    name: "",
    expansions: [],
    numPlayers: "1",
    foe: "",
    herald: "",
    players: {
      p1: {
        name: "",
        char: ""
      },
      p2: {
        name: "",
        char: ""
      },
      p3: {
        name: "",
        char: ""
      },
      p4: {
        name: "",
        char: ""
      },
      p5: {
        name: "",
        char: ""
      },
      p6: {
        name: "",
        char: ""
      },
      p7: {
        name: "",
        char: ""
      },
      p8: {
        name: "",
        char: ""
      }
    }
  }

  var gameInfo = mainInfoFactory.getMainInfo();
  gameInfo.success(function(res) {
    creator.allCharacters = res.investigators;
    creator.allAncient = res['ancient ones'];
  })

  creator.saveGame = function(){
    var title = creator.game.name;
    var allGames =  JSON.parse(localStorage.getItem("savedGames")) || {};

    if (allGames.hasOwnProperty(title) === false) {
      allGames[title] = creator.game;
      localStorage.setItem('savedGames', JSON.stringify(allGames));
    } else {
      console.log("you already have a game by this name");
      alert("Save Unsuccessful: You already have a game by this name");
    }
  }
})


.controller('endGameCtrl', function($scope, $state, $ionicHistory, loader) {
  var victory = this;
  victory.playingGame = {name: "None"};
  victory.allCharacters = $scope.$parent.mainMenu.test.investigators;
  victory.allAncient = $scope.$parent.mainMenu.test.ancientOnes;



  if (!loader.getCurrentGame()) {
      $ionicHistory.nextViewOptions({
        disableBack: true
      });
      $state.go('app.home');
  } else {
    victory.playingGame = loader.getCurrentGame();
    victory.terrorLevel = 0;
    console.log("Current Game is:", loader.getCurrentGame());
    console.log("WHAT?", victory.playingGame);
  }

  victory.testPrint = function(test) {
    var score = victory.allAncient[victory.playingGame.foe].doom;
    score -= victory.terrorLevel;

    for (player in test.players) {
      if (test.players[player].char) {
        score -= test.players[player].eldersigns;
        score += test.players[player].gates;
        score += Math.floor(test.players[player].trophies / 3);

        if (test.players[player].hasOwnProperty('lived') ) {
          score += 1;
        }

        if (test.players[player].hasOwnProperty('loan')) {
          score -= 1;
        }

      }
    }
    console.log("Score", score);
    victory.playingGame.score = score;
  };
})


.controller('PickerCtrl', function($scope, randomizer) {
  var picker = this;
  picker.testArray = [];
  picker.playerToChoose = "1";

  picker.playerChoice = function(isChecked, aName){
    if (isChecked) {
      picker.testArray.push(aName);
    } else {
      picker.testArray.splice(picker.testArray.indexOf(aName), 1);
    }
  };

  picker.checkAll = function(){

  };

  picker.fireaway = function(checkedArray){
    var chooseFromThis = checkedArray.slice(0);
    console.log(picker.playerToChoose)
    var testAlert = randomizer.chooseMe(chooseFromThis, picker.playerToChoose);
    alert(testAlert);
  };


});
