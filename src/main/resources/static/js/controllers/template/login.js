'use strict';

/* Controllers */
  // signin controller
app.controller('SigninFormController', ['$scope', '$http', '$state', '$window', function($scope, $http, $state, $window) {
    $scope.user = {
      username: '18614034313',
      password: '123456'
    };
    $scope.authError = null;
    $scope.login = function() {
      $scope.authError = null;
      // Try to login
      var data = {
        username: $scope.user.username,
        password: $scope.user.password
      }
      console.log("data=", data);
      $http.post($scope.app.apiUrl+"/auth/jwt", data).success(function (res) {
        console.log(res);
        if(res.status === 80200) {
          $window.localStorage["access_token"] = res.data.access_token;
          $state.go('app.dashboard-v1');
        }
      })
      .error(function (err) {
        console.log(err);
      });;
    };
  }])
;
