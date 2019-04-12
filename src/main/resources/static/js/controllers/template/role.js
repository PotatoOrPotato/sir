app.controller('RoleCtrl', ['$scope', '$http', function ($scope, $http) {

    $scope.orders = [];
    $scope.statusFlag = false;
    /**搜索起始页 */
    $scope.now = 1;
    /**每页显示条数 */
    $scope.page_size = 10;
    /**订单列表*/
    $scope.roleList = [];
    /**查询绑定值 */
    $scope.statusValue = 0;
    /**搜索绑定的条件 */
    $scope.condition = "";
    /**判断搜索是否有输入的状态标志 */
    $scope.searchStatus = true;

    function init() {

        getPage(1);
    }
    init();
    //判断搜索框是否为空
    function InputIsEmpty() {
        if ($scope.condition == "") {
            $scope.searchStatus = false;
        } else {
            $scope.searchStatus = true;
        }
    }
    $scope.changeContent = function () {

        InputIsEmpty();
    }
    /**
     *  获取分页信息
     * @param {*} page_index 
     */
    function getPage(page_index) {

        console.log("statusValue=", $scope.statusValue)

        $scope.now = page_index;
        $scope.ordersList = [];

        let url = $scope.app.apiUrl + "/user/role?page_idx=" + (page_index - 1) + "&page_size=" + $scope.page_size + "";
        // if ($scope.statusValue != 0) {
        //     url = $scope.app.apiUrl + "/order/status/" + $scope.statusValue + "?&page_idx=" + (page_index - 1) + "&page_size=" + $scope.page_size + "";
        // }
        // if ($scope.condition !== "") {
        //     url = $scope.app.apiUrl + "/order/search/" + $scope.condition + "?page_idx=" + (page_index - 1) + "&page_size=" + $scope.page_size + "";
        // }
        console.log("url=", url);
        $http.get(url).success(function (res) {
            console.log("res:", res);
            if (res.status == 80200) {
                //获取总条数
                $scope.totals = res.data.total;
                //获取总页数
                $scope.pages = res.data.pages;
                //将总页数放入数组中在页面要遍历页数
                //每次务必都要清空数组
                $scope.pageArray = [];
                morePage(res.data.pages, $scope.now);
                $scope.roleList = res.data.data;
                // angular.forEach(res.data.data, function (item) {
                //     getOrderStatus(item);
                // })
            }
        }).error(function (err) {
            console.log("请求失败")
        });
    }
    /**
     * 获取订单状态
     * @param {*} item 
     */
    function getOrderStatus(item) {
        let i = item;
        switch (item.status) {
            case 1:
                item.status_lable = '未审核';
                break;
            case 2:
                item.status_lable = '已取消';
                break;
            case 3:
                item.status_lable = '未审核';
                break;
            case 4:
                item.status_lable = '已取消';
                break;
            case 5:
                item.status_lable = '未审核';
                break;
            case 6:
                item.status_lable = '已取消';
                break;
            case 7:
                item.status_lable = '已审核';
                break;
            case 8:
                item.status_lable = '未完全发货';
                break;
            case 9:
                item.status_lable = '已完全发货';
                break;
            case 10:
                item.status_lable = '已取消';
                break;
            case 11:
                item.status_lable = '已完成';
                break;
            case 12:
                item.status_lable = '未支付';
                break;
            case 13:
                item.status_lable = '已支付';
                break;
            default:
                item.status_lable = '未定义';
                break;
        }
        $scope.ordersList.push(i);
        //console.log("ordersList",$scope.ordersList);
    }
    /**
    * 多页情况下，显示分页
    * @param {*} pages 
    * @param {*} now 
           // 《5 =》 12345
                    // now 《=3 12345
                    // now >= all - 3 后数5
                    // now-2 now-1 now now+1 now+2
    */
    function morePage(pages, now) {
        if (pages <= 5) {
            for (var i = 1; i <= pages; i++) {

                $scope.pageArray.push(i);
            }
        } else {
            if (now <= 3) {
                for (var i = 1; i <= 5; i++) {
                    $scope.pageArray.push(i);
                }
            } else if (now >= pages - 3) {
                for (var i = pages - 4; i <= pages; i++) {
                    $scope.pageArray.push(i);
                }

            } else {
                $scope.pageArray.push(now - 2);
                $scope.pageArray.push(now - 1);
                $scope.pageArray.push(now);
                $scope.pageArray.push(now + 1);
                $scope.pageArray.push(now + 2);
            }
        }

    }
    //3.换页
    $scope.changePage = function (index) {
        getPage(index);
    }
    /**
    * 上一页
    */
    $scope.prePage = function () {
        if ($scope.now > 1) {
            getPage($scope.now - 1);
        }
    }
    /**
     * 下一页
     */
    $scope.nextPage = function () {
        if ($scope.now < $scope.pages) {
            getPage($scope.now + 1);
        }
    }
    /**
     *  订单详情
     * @param {*} sn 
     */
    $scope.detail = function (sn) {
        $state.go("app.order.detail", { sn: sn });
    };
    /**
     *  订单审核
     * @param {*} sn 
     */
    $scope.checkOrder = function (sn) {
        angular.forEach($scope.orders, function (item) {
            if (item.sn === sn) {
                item.status = 1;
                item.status_lable = "已审核";
            }
        });

        if (sn === $scope.sn) {
            $scope.status = 1;
        }
    };
    //1.获取商品分类列表
    function getProductCategoryList() {
        $http.get($scope.app.apiUrl + "").success(function (res) {

        }).error(function (err) {

        })
    };
    /**
     *  根据状态查询订单
     */
    $scope.checkOrderByStatus = function () {
        getPage(1);

    }
    /**
     *  根据title查询订单
     */
    $scope.searchOrderByTitle = function () {
        getPage(1);
    }



}]);
app.controller('CreateRoleCtrl', ['$scope', '$http', '$state', function ($scope, $http, $state) {

    /**角色名称 */
    $scope.title;

    function createRole() {
        let data = {
            title: $scope.title
        }
        $http.post($scope.app.apiUrl + "/user/role", data).success(function (res) {
            if (res.status == 80200) {
                console.log("创建角色成功")
                $state.go('app.role.manage');
            }

        }).error(function (err) {
            console.log("创建角色失败")

        });
    }

    $scope.save = function () {
        createRole();
    }
    $scope.cancle = function () {
        $state.go('app.role.manage');
    }
}]);