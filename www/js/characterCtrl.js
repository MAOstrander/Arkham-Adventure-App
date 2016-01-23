angular.module('starter.characterCtrl', [])

.controller('CharCtrl', function($scope, $stateParams, mainInfoFactory) {
  var chara = this;



  var newCall = mainInfoFactory.getMainInfo();
  newCall.success(function(res) {

    console.log("newCall", res);

    for (var key in res.investigators) {
     if (res.investigators.hasOwnProperty(key)) {
      var obj = res.investigators[key];
       if (obj.id === parseInt($stateParams.id)) {
          chara.loaded = obj;
          console.log("HEY!");
        }
      }
    }

    console.log("chara.loaded", chara.loaded);
    console.log("$stateParams", $stateParams);

    // $scope.$apply();
    chara.fixed = chara.loaded['Fixed Possessions'];
    console.log("chara.fixed", chara.fixed);
  })
});
