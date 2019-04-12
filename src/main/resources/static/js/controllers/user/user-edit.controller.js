app.controller('UserEditController', ['$scope', '$http', '$stateParams', '$state', 'toaster', function ($scope, $http, $stateParams, $state, toaster) {
    $scope.sn = $stateParams.sn;
    $scope.name;
    $scope.username;
    $scope.password;
    $scope.nickName;
    $scope.email;
    $scope.mobile;
    $scope.type;
    $scope.companySN;
    $scope.companyArr = [];
    $scope.typeArr = [
        {name: '未定义', value: 0},
        {name: '超级管理员', value: 1},
        {name: '系统管理员', value: 2},
        {name: '公司管理员', value: 3}
    ];

    //初始化公司信息
    (function () {
        loadCompany();
        loadItem();
    }());


    /**
     * 加载公司信息
     */
    function loadCompany() {
        $http.get($scope.app.apiUrl + "/user/company").success(function (res) {
            if (res.status === 80200) {
                $scope.companyArr = res.data;
            }
        }).error(function (err) {
            console.log("获取公司列表错误", JSON.stringify(err));
        });
    }

    /**
     * 加载用户信息
     */
    function loadItem() {
        console.log("sn:" + $scope.sn);
        if ($scope.sn == null || $scope.sn == '') {
            return;
        }
        $http.get($scope.app.apiUrl + "/user/" + $scope.sn).success(function (res) {
            if (res.status === 80200) {
                $scope.username = res.data.username;
                $scope.name = res.data.name;
                $scope.type = res.data.type;
                $scope.nickName = res.data.nickName;
                $scope.mobile = res.data.mobile;
                $scope.email = res.data.email;
                $scope.companySN = res.data.companySN;
            }
        }).error(function (err) {
            console.log("获取用户信息", JSON.stringify(err));
        });
    }

    /**
     * 保存用户信息
     */
    $scope.save = function () {
        let data = {
            username: $scope.username,
            password: $scope.password,
            nickName: $scope.nickName,
            name: $scope.name,
            email: $scope.email,
            mobile: $scope.mobile,
            type: $scope.type,
            companySN: $scope.companySN
        }
        if ($scope.sn == null || $scope.sn == '') {
            $http.post($scope.app.apiUrl + "/user", data).success(function (res) {
                if (res.status === 80200) {
                    $state.go("app.user.list");
                }
            }).error(function (err) {
                console.log("添加用户信息错误", JSON.stringify(err))
            })
        } else {
            let data2 = {
                nickName: $scope.nickName,
                name: $scope.name,
                email: $scope.email,
                mobile: $scope.mobile,
                type: $scope.type,
                companySN: $scope.companySN
            }
            $http.put($scope.app.apiUrl + "/user/" + $scope.sn, data2).success(function (res) {
                if (res.status === 80200) {
                    $state.go("app.user.list");
                }
            }).error(function (err) {
                console.log("更新用户信息失败", JSON.stringify(err))
            })
        }
    }
}])