app.controller('CompanyEditController', ['$scope', '$http', '$state', '$stateParams', 'toaster', function ($scope, $http, $state, $stateParams, toaster) {
    /**公司标识*/
    $scope.sn = $stateParams.sn;
    /**公司名称*/
    $scope.companyName;
    /**公司地址*/
    $scope.address;
    /**公司类型*/
    $scope.type;
    /**公司管理员账号*/
    $scope.username;
    /**公司管理员密码*/
    $scope.password;
    /**公司管理员姓名*/
    $scope.name;
    /**手机号*/
    $scope.mobile;
    /**公司类型*/
    $scope.typeArr = [
        {name: "未定义", value: 0},
        {name: "总公司", value: 1},
        {name: "分公司", value: 2}
    ];
    /**
     * 初始化信息
     */
    (function () {
        loadCompany();
    }());

    /**
     * 获取公司信息
     * @param sn
     */
    function loadCompany() {
        if ($scope.sn == '' || $scope.sn == null) {
            return;
        }
        $http.get($scope.app.apiUrl + "/company/" + $scope.sn).success(function (res) {
            if (res.status == 80200) {
                $scope.companyName = res.data.companyName;
                $scope.address = res.data.address;
                $scope.detail = res.data.detail;
                $scope.type = res.data.type;
            }
        }).error(function (err) {
            console.log("公司信息编辑失败==>>" + JSON.stringify(err));
        })
    }

    $scope.save = function () {
        let data = {
            'companyName': $scope.companyName,
            'address': $scope.address,
            'type': $scope.type,
            'username': $scope.username,
            'password': $scope.password,
            'name': $scope.name,
            'mobile': $scope.mobile
        }
        console.log("data= ", data);
        if ($scope.sn == '' || $scope.sn == null) {
            $http.post($scope.app.apiUrl + "/company", data).success(function (res) {
                if (res.status === 80200) {
                    $state.go('app.company.list');
                }
            }).error(function (err) {

            })
        } else {
            $http.put($scope.app.apiUrl + "/company/" + $scope.sn, data).success(function (res) {
                if (res.status === 80200) {
                    $state.go('app.company.list');
                }
            }).error(function (err) {
                console.log("更新公司信息失败", JSON.stringify(err))
            })
        }
    }
}])