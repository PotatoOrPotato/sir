app.controller('PermissionEditController', ['$scope', '$http', '$state', '$stateParams', 'toaster', function ($scope, $http, $state, $stateParams, toaster) {

    $scope.sn=$stateParams.sn;
    $scope.title;
    $scope.method;
    $scope.url;
    $scope.type;
    $scope.typeArr = [
        {name: '未定义', value: 0},
        {name: '菜单', value: 1},
        {name: '按钮', value: 2},
        {name: '资源', value: 3},
        {name: '免费资源', value: 4}
    ];
    (function () {
        loadItem();
    }())

    /**
     * 加载信息
     */
    function  loadItem() {
        if($scope.sn==null||$scope.sn==''){
            return;
        }
        $http.get($scope.app.apiUrl+"/permission/"+$scope.sn).success(function (res) {
            if(res.status==80200){
                $scope.title=res.data.title;
                $scope.method=res.data.method;
                $scope.url=res.data.url;
                $scope.type=res.data.type;
            }
        })
    }
    /**
     * 保存或者更新信息
     */
    $scope.save=function () {
        let data={
            title:$scope.title,
            method:$scope.method,
            url:$scope.url,
            type:$scope.type
        }
        if($scope.sn==null||$scope.sn==''){
            $http.post($scope.app.apiUrl+"/permission",data).success(function (res) {
                if(res.status==80200){
                    toaster.pop('success', '添加', '添加成功');
                    $state.go("app.permission.list");
                }
            }).error(function (err) {
                toaster.pop('error', '添加失败', JSON.stringify(err));
            })
        }else{
            $http.put($scope.app.apiUrl+"/permission/"+$scope.sn,data).success(function (res) {
                if(res.status==80200){
                    toaster.pop('success', '更新', '更新成功');
                    $state.go("app.permission.list");
                }
            }).error(function (err) {
                toaster.pop('error','更新','更新失败');
            })
        }
    }
}])