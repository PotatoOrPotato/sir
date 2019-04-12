'use strict';

// signup controller
app.controller('AppController', ['$scope', '$window', function($scope, $window) {
  $scope.username = $window.localStorage["name"]; 
  // $scope.company_type = $window.localStorage["company_type"];
}]);