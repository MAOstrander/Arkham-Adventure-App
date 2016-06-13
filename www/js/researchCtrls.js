angular.module('starter.researchCtrls', [])

.controller('CharCtrl', function($scope, $stateParams, mainInfoFactory) {
  var chara = this;

  var heroCall = mainInfoFactory.getMainInfo();
  heroCall.success(function(res) {

    for (var key in res.investigators) {
     if (res.investigators.hasOwnProperty(key)) {
      var obj = res.investigators[key];
       if (obj.id === parseInt($stateParams.id)) {
          chara.loaded = obj;
        }
      }
    }

  })
})


.controller('AncientCtrl', function($scope, $stateParams, mainInfoFactory) {
  var foe = this;

  var foeCall = mainInfoFactory.getMainInfo();
  foeCall.success(function(res) {

    for (var key in res['ancient ones']) {
     if (res['ancient ones'].hasOwnProperty(key)) {
      var obj = res['ancient ones'][key];
       if (obj.id === parseInt($stateParams.id)) {
          foe.loaded = obj;
        }
      }
    }

  })
});
