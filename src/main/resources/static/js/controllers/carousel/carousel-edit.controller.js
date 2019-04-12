app.controller('CarouselEditController', ['$scope', '$http', '$state', '$stateParams', 'toaster', 'FileUploader', function ($scope, $http, $state, $stateParams, toaster, FileUploader) {
    $scope.sn = $stateParams.sn;
    $scope.bigImage = $scope.app.mediaUrl + '/admin/img/600x600.png';
    $scope.bigImageUploader;
    $scope.statusChecked;
    $scope.disable;
    $scope.title;
    $scope.image;//图片地址
    $scope.url;
    $scope.idx;
    $scope.content;
    $scope.sortArr=[1,2,3,4,5,6,7,8,9,10];
    (function () {
        loadItem();
    }())

    /**
     * 加载信息
     */
    function loadItem() {
        if ($scope.sn == null || $scope.sn == '') {
            return;
        }
        $http.get($scope.app.apiUrl + "/carousel/" + $scope.sn).success(function (res) {
            if (res.status == 80200) {
                $scope.title = res.data.title;
                $scope.bigImage = $scope.app.mediaDisplayUrl + res.data.image;
                $scope.image = res.data.image;
                $scope.url = res.data.url;
                $scope.idx=res.data.indexes;
                $scope.content=res.data.content;
                // 获取状态
                if (res.data.disable == 1) {
                    $scope.statusChecked = true;
                    $scope.disable = 1;
                } else {
                    $scope.statusChecked = false;
                    $scope.disable = 0;
                }

            }
        })
    }

    //监听是否禁用
    $scope.listedStatus = function ($event) {
        var checked = $event.target;
        if (checked.checked) {
            $scope.disable = (checked.id, 1);
        } else {
            $scope.disable= (checked.id, 0);
        }
    }
    /**
     * 保存或者更新信息
     */
    $scope.save = function () {
        let data = {
            title: $scope.title,
            image: $scope.image,
            url: $scope.url,
            indexes: $scope.idx,
            content:$scope.content,
            disable:$scope.disable
        }
        if ($scope.sn == null || $scope.sn == '') {
            $http.post($scope.app.apiUrl + "/carousel/create", data).success(function (res) {
                if (res.status == 80200) {
                    toaster.pop('success', '添加', '添加成功');
                    $state.go("app.carousel.list");
                }
            }).error(function (err) {
                toaster.pop('error', '添加失败', JSON.stringify(err));
            })
        } else {
            $http.put($scope.app.apiUrl + "/carousel/" + $scope.sn, data).success(function (res) {
                if (res.status == 80200) {
                    toaster.pop('success', '更新', '更新成功');
                    $state.go("app.carousel.list");
                }
            }).error(function (err) {
                toaster.pop('error', '更新', '更新失败');
            })
        }
    }

    // 12.上传图片的url
    function uploadImgUrl(data) {
        $http.post($scope.app.apiUrl + '/media/image/download', data).success(function (res) {
            if (res.status == 80200) {
                console.log("上传图片成功");
                // 上传成功的回调
                $scope.tinymceModel = $scope.tinymceModel.replace('img/default.gif" width="400', $scope.app.mediaUrl + res.data);
            }
        }).error(function (err) {
            console.log("上传图片失败");
        });
    }

    // 5.文件上传响应代码段
    var bigImageUploader = $scope.bigImageUploader = new FileUploader({url: $scope.app.apiUrl + '/media/qiNiuCloudImage'});
    bigImageUploader.onAfterAddingFile = function (fileItem) {
        $scope.bigImage = "img/default.gif";
        bigImageUploader.uploadAll();
    };
    bigImageUploader.onSuccessItem = function (fileItem, response, status, headers) {
        console.log("response=", response);
        $scope.bigImage = $scope.app.mediaDisplayUrl + response.data;
        $scope.image = response.data;
    };
}])