'use strict';

app.controller('SigninFormController', ['$scope', '$http', '$state', '$window', function ($scope, $http, $state, $window) {
  $scope.user = {
    username: '',
    password: ''
  };
  $scope.authError = null;
  function init() {
    $window.localStorage["access_token"] = "";
  }
  init();

  $scope.login = function () {
    $scope.authError = null;
    // Try to login
    var data = {
      username: $scope.user.username,
      password: $scope.user.password
    }
    console.log("data=", data);
    $http.post($scope.app.apiUrl + "/auth/jwt", data).success(function (res) {
      console.log(res);
      if (res.status === 80200) {
        $window.localStorage["access_token"] = res.data.access_token;
        $window.localStorage["company_sn"] = res.data.company_sn;
        $window.localStorage["name"] = res.data.name;
        $window.localStorage["company_type"] = res.data.company_type;
        $window.localStorage["company_name"] = res.data.company_name;
        $window.localStorage["username"] = res.data.username;
        $window.localStorage["authorities"] = res.data.authorities;
        $window.localStorage["roles"] = res.data.roles;


        // let auths = JSON.parse(res.data.authorities);
        // let authorities = [];
        // for (var i = 0; i < auths.length; i++) {
        //   console.log("authority=", auths[i]);
        //   console.log("url", auths[i].method + ":" + auths[i].url);
        //   authorities.push(auths[i].method + ":" + auths[i].url);
        // }
        // $window.localStorage["authorities"] = authorities;
        $state.go('app.dashboard-v1');
      }
    })
      .error(function (err) {
        console.log(err);
      });;

    $scope.logout = function () {
      console.log("logout");
    }
  };
  function login(username, password) {
    var data = {
      "username": username,
      "password": password
    }
    $http.post($scope.app.apiUrl + "/auth/jwt", data).success(function (res) {
      if (res.status === 80200) {
        $window.localStorage["access_token"] = res.data.access_token;
        $window.localStorage["company_id"] = res.data.company_id;
        $window.localStorage["name"] = res.data.name;
        $window.localStorage["company_type"] = res.data.company_type;
        $window.localStorage["company_name"] = res.data.company_name;
        $window.localStorage["username"] = res.data.username;
        $window.localStorage["roles"] = res.data.roles;

        // let auths = JSON.parse(res.data.authorities);
        // let authorities = [];
        // for (var i = 0; i < auths.length; i++) {
        //   console.log("authority=", auths[i]);
        //   console.log("url", auths[i].method + ":" + auths[i].url);
        //   authorities.push(auths[i].method + ":" + auths[i].url);
        // }
        // $window.localStorage["authorities"] = authorities;
        $state.go('app.dashboard-v1');
      }
    }).error(function (err) {
      console.log(err);
    });
  }
}]);
