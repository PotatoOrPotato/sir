angular.module('app')
    .directive('hasPermission', function ($timeout, $parse, $window) {
        return {
            link: function (scope, element, attr) {
                //console.log("attr", attr);
                //console.log("localStorage", $window.localStorage);
                let company_sn = $window.localStorage["company_sn"];
                let user_sn = $window.localStorage["username"];
                let authorities= $window.localStorage["authorities"];
                console.log("authorities权限集合={}",authorities);
                let url = attr.hasPermission;
                //url= GET:/api/v1/company/{company_id}/logistics
                url = url.replace("{company_sn}", company_sn).replace("{user_sn}", user_sn);
                console.log(attr.hasPermission, " => ", url);
                if($window.localStorage["authorities"].indexOf(url) >-1 ? true : false){
                    element.show();
                }else{
                    element.hide();
                }
            }
        };
    });