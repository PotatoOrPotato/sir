app.controller('CustomerListCtrl', ['$scope', '$http', function ($scope, $http) {
    $scope.name = '';
    $scope.showflag = true;
    $scope.customers =[];


    function init() {
        $http.get("js/app/customer/customer-list.json").success(function (res) {
            console.log("res:", res);
            //声明变量
            let culist = [];
            //遍历数组
            angular.forEach(res, function(item) {
                if(item.status===0) item.status_label = "未审核";
                if(item.status===1) item.status_label = "禁用";
                if(item.status===2) item.status_label = "启用";
                culist.push(item);
            });
            $scope.customers = culist;
        }).error(function (err) {
            //toaster.pop("error", "加载数据", "失败");
            console.log("res:", "加载数据失败");
        });
    }
    init();


    $scope.enable = function (id) {
        console.log("id=", id);
        // 遍历数组
        angular.forEach($scope.customers, function(item) {
            if(item.id === id) {
                item.status = 2;
                item.status_label = "启用";
            }
        });
    };
    $scope.disable = function(id) {
        angular.forEach($scope.customers, function(item) {
            if(item.id === id) {
                item.status = 1;
                item.status_label = "禁用";
            }
        });
    };
}]);
