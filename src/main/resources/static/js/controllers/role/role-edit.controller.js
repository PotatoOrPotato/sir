app.controller('RoleEditController', ['$scope', '$http', '$state', '$stateParams', 'toaster', function ($scope, $http, $state, $stateParams, toaster) {
    
    $scope.sn=$stateParams.sn;
    $scope.title;
    (function () {
       loadItem(); 
    }())

    /**
     * 加载角色信息
     */
    function  loadItem() {
        if($scope.sn==null||$scope.sn==''){
            return;
        }
        $http.get($scope.app.apiUrl+"/role/"+$scope.sn).success(function (res) {
            if(res.status==80200){
                $scope.title=res.data.title;
            }
        })
    }
    /**
     * 保存或者更新角色信息
     */
    $scope.save=function () {
        let data={
            title:$scope.title
        }
        if($scope.sn==null||$scope.sn==''){
            $http.post($scope.app.apiUrl+"/role",data).success(function (res) {
                if(res.status==80200){
                    toaster.pop('success', '添加', '添加成功');
                    $state.go("app.role.list");
                }
            }).error(function (err) {
                toaster.pop('error', '添加失败', JSON.stringify(err));
            })
        }else{
            $http.put($scope.app.apiUrl+"/role/"+$scope.sn,data).success(function (res) {
                if(res.status==80200){
                    toaster.pop('success', '更新', '更新成功');
                    $state.go("app.role.list");
                }
            }).error(function (err) {
                toaster.pop('error','更新','更新失败');
            })
        }
    }
}])