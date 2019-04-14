app.controller('ShopListController',['$scope','$state','$http','$stateParams','toaster',function ($scope,$state,$http,$stateParams,toaster) {
    /**搜索起始页*/
    $scope.now = 1;
    /**每页显示的条数*/
    $scope.page_size = 10;
    /**查询绑定的值*/
    $scope.statusValue = 0;
    /**搜索绑定的条件*/
    $scope.condition = "";
    /**存放的数据*/
    $scope.items;
    //初始化函数
    (function () {
        loadItem(1);
    }());
    function loadItem(page_index) {
        $scope.now = page_index;
        let url = $scope.app.apiUrl + "/shop/page/" + (page_index - 1) + "/" + $scope.page_size;
        $http.get(url).success(function (res) {
            if (res.status = 80200) {
                /**获取数据*/
                $scope.items = res.data.data;
                /**获取总条数*/
                $scope.totals = res.data.total;
                /**获取总页数*/
                $scope.pages = res.data.pages;
                //将总页数放入分组中在页面要遍历页数
                //每次务必都要清空数组
                $scope.pageArray = [];
                //《5=》 12345
                //now 《=3 12345
                // now>= all-3后数 5
                // now-2 now-1 now now+1 now+2
                morePage(res.data.pages, $scope.now);
            }
        }).error(function (err) {
            console.log("获取分页数据出现错误==>>", JSON.stringify(err));
        })
    }
    /**
     *多页情况下，显示分页
     * @param pages
     * @param now
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

    /**
     * 换页
     * @param index
     */
    $scope.changePage = function (index) {
        loadItem(index);
    }
    /**
     * 上一页
     */
    $scope.prePage = function () {
        if ($scope.now > 1) {
            loadItem($scope.now - 1);
        }
    }
    /**
     * 下一页
     */
    $scope.nextPage = function () {
        if ($scope.now < $scope.pages) {
            loadItem($scope.now + 1);
        }
    }
    /**
     * 编辑
     * @param sn
     */
    $scope.edit = function(sn){
        $state.go("app.shop.edit",{sn: sn});
    }
    /**
     * 删除
     * @param sn 数据的唯一标识
     */
    $scope.remove = function (sn) {
        $http.delete($scope.app.apiUrl + '/shop/' + sn).success(function (res) {
            if (res.status === 80200) {
                toaster.pop("success", "删除数据成功");
                loadItem($scope.now);
            }
        }).error(function (err) {
            toaster.pop("error", "删除数据失败");
        })
    }

}])