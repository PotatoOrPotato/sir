app.controller('RolePermissionController', ['$scope', '$http', '$state', '$stateParams', 'FileUploader', 'toaster', function ($scope, $http, $state, $stateParams, FileUploader, toaster) {
    $scope.sn = $stateParams.sn;
    $scope.permissionArrdesc = [];
    $scope.rolePermissionArr = [];
    $scope.checkedAll;
    $scope.checked;
    $scope.checkedArr = [];
    /*初始化*/
    (function () {
        loadPermission();
        loadPermissions();
        
    }());
    /**
     * 加载用户的角色
     */
    function loadPermission() {
        if ($scope.sn == '' || $scope.sn == null) {
            return;
        }
        $http.get($scope.app.apiUrl + "/role/permission/" + $scope.sn).success(function (res) {
            if (res.status == 80200) {
                $scope.rolePermissionArr = res.data;
            } 
        })
    }

    /**
     * 加载全部的权限
     */
    function loadPermissions(){
        $http.get($scope.app.apiUrl + "/role/permissions",{}).success(function (res) {
            if (res.status == 80200) {
                $scope.permissionArrdesc = res.data;
                angular.forEach($scope.permissionArrdesc,function (ele,index) {
                    angular.forEach($scope.rolePermissionArr,function (data) {
                        if(ele.sn.toString()==data.toString()){
                            ele.active=true;
                        }
                    })
                })
            }
            $scope.isSelectAll();
        })
    }
    /**
     * 全选/全不选
     */
    $scope.selectAll = function () {
        if ($scope.checkedAll) {
            angular.forEach($scope.permissionArrdesc, function (ele, index) {
                ele.active = true;
            })
        } else {
            angular.forEach($scope.permissionArrdesc, function (ele, index) {
                ele.active = false;
            })
        }
    }
    /**
     * 判断是否全部选中
     */
    $scope.isSelectAll=function(){
        var flagArr= $scope.permissionArrdesc.filter(function (value) {
            if(!value.active){
                return value;
            }
        })
        if(flagArr.length>0){
            $scope.checkedAll=false;
        }else{
            $scope.checkedAll=true;
        }
    }
    
    
    /**
     * 判断单个是否选中
     */
    $scope.selectOne = function (item) {
        item.active = !item.active;
        $scope.isSelectAll();
    }

    /**
     * 保存信息
     */
    $scope.save = function () {
        let data = [];
        angular.forEach($scope.permissionArrdesc,function (ele,index) {
            if(ele.active){
                data.push(
                    ele.sn
                )
            }
        })
        $http.put($scope.app.apiUrl + "/role/allot/" + $scope.sn, data).success(function (res) {
            if (res.status == 80200) {
                $state.go("app.role.list");
            }
        }).error(function (err) {
            console.log(err);
        })
    }
}]);
