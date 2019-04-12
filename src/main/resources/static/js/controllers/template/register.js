app.controller('RegisterCtrl', ['$scope', '$http', 'toaster', '$state','$window', function ($scope, $http, toaster, $state,$window) {



    /**用户名 */
    $scope.username;
    /**密码 */
    $scope.password="123456";
    /**确认密码 */
    $scope.confirm_password="123456";
    /**姓名 */
    $scope.fullname="合伙人测试1";
    /**手机号 */
    $scope.mobile="13600001000";
    /**下拉列表公司类型 */
    $scope.type;
    /**公司名字列表 */
    $scope.companys;
    /**公司名称 */
    $scope.company = "天元陆兵";
    $scope.company_name="";
    /**公司id */
    $scope.company_id;
    /**公司信息 */
    $scope.types = [];
    /** 手机号唯一性标志位*/
    $scope.uniqueflag = false;
    /**公司新增标志位 */
    $scope.addflag = false;
    $scope.unique;
    /**用户角色 */
    $scope.userRoleList =[];
    /**用户角色绑定 */
    $scope.role;
    /**获取合伙人数组 */
    $scope.partners =[];
    /**绑定的合伙人的公司id */
    $scope.partner_id;
    $scope.company_type =$window.localStorage['company_type'];
    // 1$scope.form.mobile.$error = {};
    // {
    //     "status":80200,
    //     "message":"success",
    //     "data":[
    //         {"title":"天元陆兵","code":1},
    //         {"title":"合伙人","code":2},
    //         {"title":"OEM","code":3},
    //         {"title":"连锁","code":4},
    //         {"title":"项目客户","code":5},
    //         {"title":"供应商","code":6},
    //         {"title":"车主","code":7},
    //         {"title":"会员","code":8},
    //         {"title":"城市分公司","code":9}
    //     ]
    // }

    /**自定义过滤器的样势
    app.filter('odditems',function(){
        return function(inputArray){
            var array = [];
            for(var i=0;i<inputArray.length;i++){
                if(i%2!==0){
                    array.push(inputArray[i]);
                }
            }
            return array;
        }
    });
     */
    init();
    /**
     * 获取公司类型
     */
    function init() {

        getCompanyTypeList();
        getUseRoleList();

    }

    /**
     *  获取用户角色列表
     */
    function getUseRoleList(){
        $http.get($scope.app.apiUrl+"/user/role/list").success(function(res){
            console.log("userrole =",res);
            if(res.status == 80200){
                console.log("获取用户角色列表成功");
               
                $scope.userRoleList = res.data;

                $scope.role = res.data[0].id;
            }
        }).error(function(err){
            console.log("获取用户角色列表失败");
        })

    }
    /**
     *  选择公司类型
     */
    $scope.selectCompanyType = function(){
        getCompanyByType();
    }
    /**
     *  获取公司类型列表
     */
    function getCompanyTypeList() {
        console.log("res=", $scope.app.apiUrl);
        $http.get($scope.app.apiUrl + "/company/type/list").success(function (res) {
            //$http.get("js/app/register/register.json",{timeout:3000}).success(function (res) {
            console.log("res=", res);
            let company_type = [];
            if (res.status != 80200) {
                toaster.pop("error", "加载数据", "失败");
                return;
            }
            //过滤掉天元陆兵、车主、会员信息
            angular.forEach(res.data, function (item) {
                if (item.title != '车主' && item.title != '会员') {
                    company_type.push(item);
                }
            });

            $scope.types = company_type;
            console.log("types=", $scope.types);
            //刷新页面时默认选中第一个
            $scope.type = $scope.types[0].code;
            console.log("type=", $scope.type);
            //以下代码为了达到联动效果而加，目前没有好思路解决
            getCompanyByType();
        }).error(function (err) {
            console.log("res:", "加载数据失败", err);
            toaster.pop("error", "加载数据", "失败");
        });
    }
    /**
     * 根据公司类型获取公司名称列表
     */
    function getCompanyByType() {
        console.log("$scope.type = ",$scope.type);
        $http.get($scope.app.apiUrl + "/company/type/" + $scope.type).success(function (res) {
            console.log("checkres:", res);
            if (res.status != 80200) {
                toaster.pop("error", "Tip", "公司名称未获取到");
                return;
            } else {
                $scope.companys = res.data;
                //默认选中第一个
                $scope.company_id = res.data[0].id;
                console.log("companys = ", $scope.companys);
            }

        });

    }
    /**
     * 获取项目客户隶属公司的列表
     */
    function getCompanyListBycustomer(){
        $http.get($scope.app.apiUrl + "/company/type/partner").success(function(res){
            if(res.status == 80200){
                console.log("res = ",res);
                // 获取合伙人数组
                $scope.partners = res.data;
                // 默认值
                $scope.partner_id = res.data[0].company_id;
            }
        });
    }
    /**
    * 根据公司类型获取公司类别
    */
    $scope.selectCompanyType = function () {
        getCompanyByType();
        // 获取项目客户隶属公司的列表
        getCompanyListBycustomer();
    }
    /**
     * 用户注册 创建公司和用户
     */
    $scope.register = function (flag) {
        console.log("flag", flag, $scope.cname);
        if (flag) {
            //创建公司名称和用户
            console.log($scope.company_name);
            let data = {
                company_type: $scope.type,
                company_name: $scope.company_name,
                username: $scope.mobile,
                password: $scope.password,
                name: $scope.fullname,
                mobile: $scope.mobile,
                role: $scope.role,
                company_superior: $scope.partner_id,
            }
            console.log("Register:", data);
            $http.post($scope.app.apiUrl + "/company", data).success(function (res) {
                console.log("url=",$scope.app.apiUrl + "/company")
                console.log("Register:", res);
                if (res.status != 80200) {
                    toaster.pop("error", "加载数据", "失败");
                    return;
                } else {
                    $state.go("app.member");
                }

            }).error(function (err) {
                console.log("res:", "加载数据失败");
                toaster.pop("error", "加载数据", "失败");
            });

        } else {
            //公司名称已存在只创建用户
            let data = {
                username: $scope.mobile,
                password: $scope.password,
                name: $scope.fullname,
                mobile: $scope.mobile,
                role:$scope.role
            }
            console.log("Register:", data);
            $http.post($scope.app.apiUrl + "/company/" + $scope.company_id + "/user", data).success(function (res) {
                console.log("url=",$scope.app.apiUrl + "/company/" + $scope.company_id + "/user")
                console.log("Register:", res);
                if (res.status != 80200) {
                    toaster.pop("error", "加载数据", "失败");
                    return;
                } else {
                    $state.go("app.member");
                }

            }).error(function (err) {
                console.log("res:", "加载数据失败");
                toaster.pop("error", "加载数据", "失败");
            });
        }
    };
    /**
     *  检查手机号是否已经存在
     */
    // $scope.checkMobileIsExit = function(){
    //     $scope.form.mobile.$invalid = true;
    //     console.log("checkMobileIsExit:", $scope.form.$error);
    //     // $scope.form.$error.mobile={};
    //     // $scope.form.$error.required.push({$viewValue:'abcd'});
    //     // $scope.form.$error.= {result:true};
    //     // $scope.form.$error={};
    //     $scope.form.mobile.$invalid = {};
    //     $http.get($scope.app.apiUrl+"/user/verify/username/"+$scope.mobile).success(function (res) {
    //         console.log("checkres:", res);
    //         if(res.status === 400){
    //             // $error.unique = true;
    //             // $scope.form.$error.mobile = {result:true};
    //             // $scope.form.mobile.$invalid = true;
    //             // $scope.form.$error.required.push({$viewValue:'abcd'});
    //             // toaster.pop("error","Tip","用户名已存在！");
    //         //    $scope.unique = false;
    //             // return;
    //         }

    //     });
    // };

    /**
     * 新增公司名称
     */
    $scope.addNewCompany = function () {
        $scope.addflag = true;
        $scope.company = "";
    }
    /**
     * 取消新增公司名称
     */
    $scope.cancleAddNewCompany = function () {
        $scope.addflag = false;
    }
}]);