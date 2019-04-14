app.controller('ShopEditController', ['$scope', '$http', '$state', '$stateParams', 'toaster', 'FileUploader', function ($scope, $http, $state, $stateParams, toaster, FileUploader) {

    $scope.sn = $stateParams.sn;
    $scope.bigImage = $scope.app.mediaUrl + '/admin/img/270x270.png';
    $scope.bigImageUploader;
    $scope.statusChecked;
    $scope.disable;
    $scope.title;
    $scope.image;//图片地址
    $scope.url;
    $scope.type;
    $scope.price;
    $scope.originalPrice;
    $scope.status;
    $scope.superior;
    $scope.content;
    $scope.typeValue;
    $scope.categorySn;
    $scope.category = [];
    $scope.typeArr = [
        {name: '未定义', value: 0},
        {name: '商城', value: 1},
        {name: '用户', value: 2}
    ];
    (function () {
        loadItem();
        loadCategory();
    }())
    /**
     * 加载信息
     */
    function loadItem() {
        if ($scope.sn == null || $scope.sn == '') {
            return;
        }
        $http.get($scope.app.apiUrl + "/shop/" + $scope.sn).success(function (res) {
            if (res.status == 80200) {
                $scope.title = res.data.title;
                $scope.bigImage = $scope.app.mediaDisplayUrl + res.data.smallImage;
                $scope.image = res.data.smallImage;
                $scope.url = res.data.url;
                $scope.typeValue=res.data.typeValue;
                $scope.content=res.data.content;
                $scope.price=res.data.price;
                $scope.originalPrice=res.data.originalPrice;
                $scope.categorySn=res.data.categorySn;
                // 获取状态
                if (res.data.status == 1) {
                    $scope.statusChecked = true;
                    $scope.status = 1;
                } else {
                    $scope.statusChecked = false;
                    $scope.status = 0;
                }
            }
        })
    }
    /**
     * 加载顶级分类
     */
    function loadCategory() {
        $http.get($scope.app.apiUrl+'/shop/category').success(function (res) {
            if(res.status==80200){
                $scope.category=res.data;
            }
        })
    }
    /**
     * 保存或者更新信息
     */
    $scope.save = function () {
        let data = {
            title: $scope.title,
            image: $scope.image,
            status: $scope.status,
            price:$scope.price,
            originalPrice:$scope.originalPrice,
            url: $scope.url,
            content:$scope.content,
            categorySn: $scope.categorySn == "0" ? '' : $scope.categorySn,
            type: $scope.typeValue
        }
        if ($scope.sn == null || $scope.sn == '') {
            $http.post($scope.app.apiUrl + "/shop/create", data).success(function (res) {
                if (res.status == 80200) {
                    toaster.pop('success', '添加', '添加成功');
                    $state.go("app.shop.list");
                }
            }).error(function (err) {
                toaster.pop('error', '添加失败', JSON.stringify(err));
            })
        } else {
            $http.put($scope.app.apiUrl + "/shop/" + $scope.sn, data).success(function (res) {
                if (res.status == 80200) {
                    toaster.pop('success', '更新', '更新成功');
                    $state.go("app.shop.list");
                }
            }).error(function (err) {
                toaster.pop('error', '更新', '更新失败');
            })
        }
    }

    //监听是否禁用
    $scope.listedStatus = function ($event) {
        var checked = $event.target;
        if (checked.checked) {
            $scope.status = (checked.id, 1);
        } else {
            $scope.status= (checked.id, 0);
        }
    }

    // 富文本编译器
    $scope.checkImageLink = function () {
        console.log('Editor content:', $scope.tinymceModel);
        var count = $scope.tinymceModel,
            imgREG = /<img.*?(?:>|\/>)/gi,
            srcREG = /src=[\'\"]?([^\'\"]*)[\'\"]?/i,
            arr = count.match(imgREG);
        console.log("arr =", arr);
        if (arr == null) return;
        for (var i = 0, len = arr.length; i < len; i++) {
            var src = arr[i].match(srcREG);
            if (src[1].indexOf('../media/image/') > -1) break;
            if (src[1]) {
                console.log(src[1]);
                $scope.tinymceModel = $scope.tinymceModel.replace(src[1], 'img/default.gif" width="400');
                uploadImgUrl(src[1]);
            }
        }
    }
    $scope.tinymceModel = '在这里输入...';

    $scope.getContent = function () {
        console.log('Editor content:', $scope.tinymceModel);
    };

    $scope.setContent = function () {
        $scope.tinymceModel = 'Time: ' + (new Date());
    };
    // 粘贴富文本编辑器的回调
    $scope.tinymceOptions = {
        plugins: 'paste link image code',
        toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code',
    };

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