angular.module('app')
  .directive('ensureUnique', function($http) {
    return {
      require: 'ngModel',
      link: function (scope, elem, attrs, ctrl) {
          scope.$watch(attrs.ngModel, function (value) {
              if (!value) return;
              $http({
                  method: 'GET',
                  url: scope.app.host+"/user/verify/username/"+value,
              }).success(function (data) {
                  if(data.status === 80200) {
                    ctrl.$setValidity('unique', true);
                  } else {
                    ctrl.$setValidity('unique', false);
                  }
              }).error(function (data) {
                  ctrl.$setValidity('unique', false);
              })
          })
      }
    }
  });