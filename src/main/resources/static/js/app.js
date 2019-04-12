'use strict';
angular.module('app', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngSanitize',
    'ngTouch',
    'ngStorage',
    'ui.router',
    'ui.bootstrap',
    'ui.utils',
    'ui.load',
    'ui.jq',
    'oc.lazyLoad',
    'pascalprecht.translate',
    'ui.tinymce'
])
.factory('HttpInterceptor',
            ['$q', '$log', '$injector', '$window',
    function ($q,   $log,   $injector, $window) {
        return {
            //凡与后台交互的地方都要先执行如下代码判断access_token
            //如果后台返回的状态是403说明用户的请求不携带access_token,直接跳转到用户登陆界面
            'request': function (config) {
                if (config.url.indexOf("http://")==0) {
                    let log = "HTTP >>>["+config.method+"] "+config.url;
                    if (config.data) log += " "+JSON.stringify(config.data);
                    $log.info(log);
                }
                if ($window.localStorage["access_token"]) {
                    // config.headers.Authorization = 'Bearer ' + $cookies.get('access_token');
                    config.headers.Authorization = 'Bearer ' + $window.localStorage["access_token"];
                }
                return config;
            },
            // 'requestError': function(request) {
            //     console.log("requestError");
            //     return $q.reject(request);
            // },
            'response': function(response) {
                //$log.info("HTTP RSP: ", response);
                // $log.info("HTTP <<<[status] =",response.status);
                if (response.data.status) {
                    $log.info("HTTP <<<["+response.status+"] "+JSON.stringify(response.data));
                }
                return response;
            },
            'responseError': function (rejection) {
                // console.log("responseError");
                // if (rejection.status === 401) {
                //     //跳转到用户登陆界面
                //     $injector.get('$state').go('admin.signin');
                // }
                // if(rejection.status === 403){
                //     //toaster.pop("error", "加载数据", "权限不够");
                //     $injector.get('$state').go('admin.signin');
                // }
                // if (rejection.status === 401 && rejection.data && rejection.data.error) {
                //     // $injector.get('account').reset();
                //     switch (rejection.data.error.code) {
                //         case 'NOT_LOGGED_IN':
                //             // 跳转到登录页
                //             $injector.get('$state').go('access.signin'); break;
                //         case 'NO_AUTHORITY':
                //             var state = $injector.get('$state');
                //             if ($state.current.name !== 'main') {
                //                 // 跳转到首页
                //                 $state.go('main', {}, { reload: 'main' });
                //             }
                //     }
                // }
                //
                // if (rejection.status === 404 && rejection.data && rejection.data.error && rejection.data.error.code === 'USER_NOT_FOUND') {
                //     $injector.get('$state').go('signIn');
                // }

                return $q.reject(rejection);
            }
        }
    }
])
.directive('verifyUsername', ['$http', function($http) {
    return {
      require: 'ngModel',
      link: function(scope, ele, attrs, c) {
        scope.$watch(attrs.ngModel, function() {
          $http({
            method: 'POST',
            url: scope.app.host+'/user/verify/username/' + attrs.username
            // data: {'field': attrs.ensureUnique}
          }).success(function(data, status, headers, cfg) {
            c.$setValidity('unique', data.isUnique);
          }).error(function(data, status, headers, cfg) {
            c.$setValidity('unique', false);
          });
        });
      }
    }
  }]);
// .factory("localStorage", [
//     '$window', function($window) {
//         return {
//             set: function (key, value) {
//                 $window.localStorage[key] = value;
//             },
//             get: function (key, defaultValue) {
//                 return $window.localStorage[key] || defaultValue;
//             },
//             setObject: function (key, value) {
//                 $window.localStorage[key] = JSON.stringify(value);
//             },
//             getObject: function (key) {
//                 return JSON.parse($window.localStorage[key] || '{}');
//             }
//         }
//     }
// ]);



