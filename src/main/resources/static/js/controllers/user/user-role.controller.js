app.controller('UserRoleController', ['$scope', '$http', '$state', '$stateParams', 'FileUploader', 'toaster', function ($scope, $http, $state, $stateParams, FileUploader, toaster) {
    $scope.sn = $stateParams.sn;
    $scope.roleArrdesc = [];
    $scope.userRoleArr = [];
    $scope.checkedAll;
    $scope.checked;
    $scope.checkedArr = [];
    /*初始化*/
    (function () {
        loadRole();
        loadRoles();
    }());

    /**
     * 加载用户的角色
     */
    function loadRole() {
        if ($scope.sn == '' || $scope.sn == null) {
            return;
        }
        $http.get($scope.app.apiUrl + "/user/role/" + $scope.sn).success(function (res) {
            if (res.status == 80200) {
                $scope.userRoleArr = res.data;
            }
        })
    }

    function loadRoles() {
        $http.get($scope.app.apiUrl + "/user/roles").success(function(res){
            if (res.status == 80200) {
                $scope.roleArrdesc = res.data;
                angular.forEach($scope.roleArrdesc,function(ele,index) {
                    console.log("aa ele={}",ele);
                    angular.forEach($scope.userRoleArr,function(data){
                        if (ele.sn.toString()==data.toString()){
                            ele.active=true;
                        }
                    })
                })
                $scope.isSelectAll();
            }
        }).error(function (res) {
            console.log("错误提示",res);
        })
    }

    /**
     * 是否全部选择中
     */
    $scope.isSelectAll = function () {
        var flagArr= $scope.roleArrdesc.filter(function (value) { 
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
     * 反选
     */
    $scope.inverse=function () {
        angular.forEach($scope.roleArrdesc,function(ele,index) {
            ele.active=!ele.active;
        })
    }
    /**
     * 全选/全不选
     */
    $scope.selectAll=function () {
        if ($scope.checkedAll) {
            angular.forEach($scope.roleArrdesc,function(ele,index) {
                ele.active=true;
            })
        } else {
            angular.forEach($scope.roleArrdesc,function(ele,index) {
                ele.active=false;
            })
        }
    }
    /**
     * 判断单个是否选中
     */
    $scope.selectOne=function(item){
        item.active=!item.active;
        console.log("单选item={}",item);
        $scope.isSelectAll();
    }

    /**
     * 保存信息
     */
    $scope.save = function () {
        let data = [];
        angular.forEach($scope.roleArrdesc, function (ele, index) {
            if (ele.active) {
                data.push(ele.sn);
            }
        })
        if (data.length < 0) {
            toaster.pop('warn', '警告', '请至少选择一个权限在保存');
        }
        $http.put($scope.app.apiUrl + "/user/allot/" + $scope.sn, data).success(function (res) {
            if (res.status == 80200) {
                $state.go("app.user.list");
            }
        }).error(function (err) {
            console.log(err);
        })
    }
}]);
