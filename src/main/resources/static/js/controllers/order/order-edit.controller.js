app.controller('OrderEditController', ['$scope', '$http', '$state', '$stateParams', 'toaster', function ($scope, $http, $state, $stateParams, toaster) {
    $scope.sn = $stateParams.sn;
    $scope.statusArr = [
        {name: '未定义', value: 0},
        {name: '未支付', value: 1},
        {name: '已支付', value: 2},
        {name: '未指派', value: 3},
        {name: '已指派', value: 4}
    ];
    $scope.typeArr = [
        {name: '未定义', value: 0},
        {name: '需求订单', value: 4},
        {name: '商品订单', value: 5}
    ];
    $scope.userSn;
    $scope.users = [];
    $scope.statusValue;
    $scope.statusTitle;
    $scope.typeTitle;
    $scope.typeValue;

    (function () {
        loadItem();
        loadUsers();
    }())

    /**
     * 加载信息
     */
    function loadItem() {
        if ($scope.sn == null || $scope.sn == '') {
            return;
        }
        $http.get($scope.app.apiUrl + "/order/" + $scope.sn).success(function (res) {
            if (res.status == 80200) {
                $scope.statusValue = res.data.statusValue;
                $scope.typeValue = res.data.typeValue;
                $scope.userSn = res.data.userSn;
            }
        })
    }

    /**
     * 加载所有的接单人
     */
    function loadUsers() {
        $http.get($scope.app.apiUrl + "/order/users").success(function (res) {
            if (res.status == 80200) {
                $scope.users = res.data;
            }
        })
    }
    /**
     * 保存或者更新信息
     */
    $scope.save = function () {
        let data = {
            userSn: $scope.userSn,
            typeValue: $scope.typeValue,
            statusValue: $scope.statusValue
        }
        if ($scope.sn == null || $scope.sn == '') {
        } else {
            $http.put($scope.app.apiUrl + "/order/" + $scope.sn, data).success(function (res) {
                if (res.status == 80200) {
                    toaster.pop('success', '更新', '更新成功');
                    $state.go("app.order.list");
                }
            }).error(function (err) {
                toaster.pop('error', '更新', '更新失败');
            })
        }
    }
}])