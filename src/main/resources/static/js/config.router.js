'use strict';
angular.module('app')
    .run(
        ['$rootScope', '$state', '$stateParams',
            function ($rootScope, $state, $stateParams) {
                $rootScope.$state = $state;
                $rootScope.$stateParams = $stateParams;
            }
        ]
    )
    .config(
        ['$stateProvider', '$urlRouterProvider', 'JQ_CONFIG', 'MODULE_CONFIG',
            function ($stateProvider, $urlRouterProvider, JQ_CONFIG, MODULE_CONFIG) {
                var layout = "tpl/template/app.html";
                if (window.location.href.indexOf("material") > 0) {
                    layout = "tpl/blocks/material.layout.html";
                    $urlRouterProvider
                        .otherwise('/app/dashboard-v3');
                } else {
                    $urlRouterProvider
                        .otherwise('/app/dashboard-v1');
                }
                $stateProvider
                    .state('app', {
                        abstract: true,
                        url: '/app',
                        templateUrl: layout,
                        resolve: load(['js/controllers/template/app.controller.js'])
                    })
                        
                    /**公司管理开始*/
                    .state('app.company', {
                        url: '/company',
                        template: '<div ui-view class="fade-in-up"></div>'
                    })
                    //列表
                    .state('app.company.list', {
                        url: '/list',
                        templateUrl: 'tpl/company/company-list.html',
                        resolve: load(['toaster', 'js/controllers/company/company-list.controller.js'])
                    })
                    //编辑
                    .state('app.company.edit', {
                        param: {'sn': null},
                        url: '/edit/:sn',
                        templateUrl: 'tpl/company/company-edit.html',
                        resolve: load(['toaster', 'js/controllers/company/company-edit.controller.js'])
                    })
                    /**公司管理结束*/

                    /**用户管理开始*/
                    .state('app.user', {
                            url: '/user',
                            template: '<div ui-view class="fade-in-up"></div>'
                        }
                    )
                    //列表
                    .state('app.user.list', {
                        url: '/list',
                        templateUrl: 'tpl/user/user-list.html',
                        resolve: load(['toaster', 'angularFileUpload', 'js/controllers/user/user-list.controller.js'])
                    })
                    //编辑
                    .state('app.user.edit', {
                        param: {'sn': null},
                        url: '/edit/:sn',
                        templateUrl: 'tpl/user/user-edit.html',
                        resolve: load(['toaster', 'angularFileUpload', 'js/controllers/user/user-edit.controller.js'])
                    })
                    //分配角色
                    .state('app.user.role', {
                        param: {'sn': null},
                        url: '/role/:sn',
                        templateUrl: 'tpl/user/user-role.html',
                        resolve: load(['toaster', 'angularFileUpload', 'js/controllers/user/user-role.controller.js'])
                    })

                    //用户详情
                    .state('app.user.detail', {
                        param: {'sn': null},
                        url: '/detail/:sn',
                        templateUrl: 'tpl/user/user-detail.html',
                        resolve: load(['toaster', 'angularFileUpload', 'js/controllers/user/user-detail.controller.js'])
                    })
                    /**用户管理结束*/

                    /**角色管理开始*/
                    .state('app.role', {
                        url: '/role',
                        template: '<div ui-view class="fade-in-up"></div>',
                    })
                    //列表
                    .state('app.role.list', {
                        url: '/list',
                        templateUrl: 'tpl/role/role-list.html',
                        resolve: load(['toaster', 'angularFileUpload', 'js/controllers/role/role-list.controller.js'])
                    })
                    //角色-权限
                    .state('app.role.permission', {
                        param: {'sn': null},
                        url: '/permission/:sn',
                        templateUrl: 'tpl/role/role-permission.html',
                        resolve: load(['toaster', 'angularFileUpload', 'js/controllers/role/role-permission.controller.js'])
                    })
                    //编辑
                    .state('app.role.edit', {
                        param: {'sn': null},
                        url: '/edit/:sn',
                        templateUrl: 'tpl/role/role-edit.html',
                        resolve: load(['toaster', 'angularFileUpload', 'js/controllers/role/role-edit.controller.js'])
                    })
                    /**角色管理结束*/


                    /**权限管理开始*/
                    .state('app.permission', {
                        url: '/permission',
                        template: '<div ui-view class="fade-in-up"></div>',
                    })
                    //列表
                    .state('app.permission.list', {
                        url: '/list',
                        templateUrl: 'tpl/permission/permission-list.html',
                        resolve: load(['toaster', 'angularFileUpload', 'js/controllers/permission/permission-list.controller.js'])
                    })
                    //编辑
                    .state('app.permission.edit', {
                        param: {'sn': null},
                        url: '/edit/:sn',
                        templateUrl: 'tpl/permission/permission-edit.html',
                        resolve: load(['toaster', 'angularFileUpload', 'js/controllers/permission/permission-edit.controller.js'])
                    })
                    /**权限管理结束*/
                    // .state('app.login', {
                    //     url: '/login',
                    //     templateUrl: 'tpl/login/login.html',
                    //     resolve: load(['js/controllers/login/login.js'])
                    // })
                    
                      /**评价管理开始*/
                    .state('app.evaluate', {
                        url: '/evaluate',
                        template: '<div ui-view class="fade-in-up"></div>',
                    })
                    //列表
                    .state('app.evaluate.list', {
                        url: '/list',
                        templateUrl: 'tpl/evaluate/evaluate-list.html',
                        resolve: load(['toaster', 'angularFileUpload', 'js/controllers/evaluate/evaluate-list.controller.js'])
                    })
                    //编辑
                    .state('app.evaluate.edit', {
                        param: {'sn': null},
                        url: '/edit/:sn',
                        templateUrl: 'tpl/evaluate/evaluate-edit.html',
                        resolve: load(['toaster', 'angularFileUpload', 'js/controllers/evaluate/evaluate-edit.controller.js'])
                    })
                    /**评价管理结束*/
                    
                    /**店铺管理开始*/
                    .state('app.shop', {
                        url: '/shop',
                        template: '<div ui-view class="fade-in-up"></div>',
                    })
                    //列表
                    .state('app.shop.list', {
                        url: '/list',
                        templateUrl: 'tpl/shop/shop-list.html',
                        resolve: load(['toaster', 'angularFileUpload', 'js/controllers/shop/shop-list.controller.js'])
                    })
                    //编辑
                    .state('app.shop.edit', {
                        param: {'sn': null},
                        url: '/edit/:sn',
                        templateUrl: 'tpl/shop/shop-edit.html',
                        resolve: load(['toaster', 'angularFileUpload', 'js/controllers/shop/shop-edit.controller.js'])
                    })
                    /**店铺管理结束*/
                    
                     /**采购管理开始*/
                    .state('app.purchase', {
                        url: '/purchase',
                        template: '<div ui-view class="fade-in-up"></div>',
                    })
                    //列表
                    .state('app.purchase.list', {
                        url: '/list',
                        templateUrl: 'tpl/purchase/purchase-list.html',
                        resolve: load(['toaster', 'angularFileUpload', 'js/controllers/purchase/purchase-list.controller.js'])
                    })
                    //编辑
                    .state('app.purchase.edit', {
                        param: {'sn': null},
                        url: '/edit/:sn',
                        templateUrl: 'tpl/purchase/purchase-edit.html',
                        resolve: load(['toaster', 'angularFileUpload', 'js/controllers/purchase/purchase-edit.controller.js'])
                    })
                    /**采购管理结束*/
                    
                    
                    .state('admin.signin', {
                        url: '/signin',
                        templateUrl: 'tpl/login/login.html',
                        resolve: load(['js/controllers/login/login.js'])
                    })
                    /*软件管理开始*/

                    /**分类管理开始*/
                    .state('app.category', {
                        url: '/category',
                        template: '<div ui-view class="fade-in-up"></div>',
                    })
                    //列表
                    .state('app.category.list', {
                        url: '/list',
                        templateUrl: 'tpl/category/category-list.html',
                        resolve: load(['toaster', 'angularFileUpload', 'js/controllers/category/category-list.controller.js'])
                    })
                    //编辑
                    .state('app.category.edit', {
                        param: {'sn': null},
                        url: '/edit/:sn',
                        templateUrl: 'tpl/category/category-edit.html',
                        resolve: load(['toaster', 'angularFileUpload', 'js/controllers/category/category-edit.controller.js'])
                    })
                    /**分类管理结束*/

                    /**轮播图管理开始*/
                    .state('app.carousel', {
                        url: '/carousel',
                        template: '<div ui-view class="fade-in-up"></div>',
                    })
                    //列表
                    .state('app.carousel.list', {
                        url: '/list',
                        templateUrl: 'tpl/carousel/carousel-list.html',
                        resolve: load(['toaster', 'angularFileUpload', 'js/controllers/carousel/carousel-list.controller.js'])
                    })
                    //编辑
                    .state('app.carousel.edit', {
                        param: {'sn': null},
                        url: '/edit/:sn',
                        templateUrl: 'tpl/carousel/carousel-edit.html',
                        resolve: load(['toaster', 'angularFileUpload', 'js/controllers/carousel/carousel-edit.controller.js'])
                    })
                    /**轮播图管理结束*/

                    /**商品管理开始*/
                    .state('app.product', {
                        url: '/product',
                        template: '<div ui-view class="fade-in-up"></div>',
                    })
                    //列表
                    .state('app.product.list', {
                        url: '/list',
                        templateUrl: 'tpl/product/product-list.html',
                        resolve: load(['toaster', 'angularFileUpload', 'js/controllers/product/product-list.controller.js'])
                    })
                    //编辑
                    .state('app.product.edit', {
                        param: {'sn': null},
                        url: '/edit/:sn',
                        templateUrl: 'tpl/product/product-edit.html',
                        resolve: load(['toaster', 'angularFileUpload', 'js/controllers/product/product-edit.controller.js'])
                    })
                    /**商品管理结束*/

                    /**订单管理开始*/
                    .state('app.order', {
                        url: '/order',
                        template: '<div ui-view class="fade-in-up"></div>',
                    })
                    //列表
                    .state('app.order.list', {
                        url: '/list',
                        templateUrl: 'tpl/order/order-list.html',
                        resolve: load(['toaster', 'angularFileUpload', 'js/controllers/order/order-list.controller.js'])
                    })
                    //编辑
                    .state('app.order.edit', {
                        param: {'sn': null},
                        url: '/edit/:sn',
                        templateUrl: 'tpl/order/order-edit.html',
                        resolve: load(['toaster', 'angularFileUpload', 'js/controllers/order/order-edit.controller.js'])
                    })
                    /**订单管理结束*/


                    .state('app.register', {
                        url: '/register',
                        template: '<div ui-view class="fade-in-up"></div>',
                        //resolve: load()
                    })
                    //  系统设置
                    .state('app.system', {
                        url: '/system',
                        template: '<div ui-view class= "fade-in-up"></div>'
                    })
                    .state('app.dashboard-v1', {
                        url: '/dashboard-v1',
                        templateUrl: 'tpl/template/app_dashboard_v1.html',
                        resolve: load(['js/controllers/template/chart.js'])
                    })
                    .state('app.dashboard-v2', {
                        url: '/dashboard-v2',
                        templateUrl: 'tpl/template/app_dashboard_v2.html',
                        resolve: load(['js/controllers/template/chart.js'])
                    })
                    .state('app.dashboard-v3', {
                        url: '/dashboard-v3',
                        templateUrl: 'tpl/template/app_dashboard_v3.html',
                        resolve: load(['js/controllers/template/chart.js'])
                    })
                    .state('app.ui', {
                        url: '/ui',
                        template: '<div ui-view class="fade-in-up"></div>'
                    })
                    .state('app.ui.buttons', {
                        url: '/buttons',
                        templateUrl: 'tpl/template/ui_buttons.html'
                    })
                    .state('app.ui.icons', {
                        url: '/icons',
                        templateUrl: 'tpl/template/ui_icons.html'
                    })
                    .state('app.ui.grid', {
                        url: '/grid',
                        templateUrl: 'tpl/template/ui_grid.html'
                    })
                    .state('app.ui.widgets', {
                        url: '/widgets',
                        templateUrl: 'tpl/template/ui_widgets.html'
                    })
                    .state('app.ui.bootstrap', {
                        url: '/bootstrap',
                        templateUrl: 'tpl/template/ui_bootstrap.html'
                    })
                    .state('app.ui.sortable', {
                        url: '/sortable',
                        templateUrl: 'tpl/template/ui_sortable.html'
                    })
                    .state('app.ui.scroll', {
                        url: '/scroll',
                        templateUrl: 'tpl/template/ui_scroll.html',
                        resolve: load('js/controllers/template/scroll.js')
                    })
                    .state('app.ui.portlet', {
                        url: '/portlet',
                        templateUrl: 'tpl/template/ui_portlet.html'
                    })
                    .state('app.ui.timeline', {
                        url: '/timeline',
                        templateUrl: 'tpl/template/ui_timeline.html'
                    })
                    .state('app.ui.tree', {
                        url: '/tree',
                        templateUrl: 'tpl/template/ui_tree.html',
                        resolve: load(['angularBootstrapNavTree', 'js/controllers/template/tree.js'])
                    })
                    .state('app.ui.toaster', {
                        url: '/toaster',
                        templateUrl: 'tpl/template/ui_toaster.html',
                        resolve: load(['toaster', 'js/controllers/template/toaster.js'])
                    })
                    .state('app.ui.jvectormap', {
                        url: '/jvectormap',
                        templateUrl: 'tpl/template/ui_jvectormap.html',
                        resolve: load('js/controllers/template/vectormap.js')
                    })
                    .state('app.ui.googlemap', {
                        url: '/googlemap',
                        templateUrl: 'tpl/template/ui_googlemap.html',
                        resolve: load(['js/app/map/load-google-maps.js', 'js/app/map/ui-map.js', 'js/app/map/map.js'], function () {
                            return loadGoogleMaps();
                        })
                    })
                    .state('app.chart', {
                        url: '/chart',
                        templateUrl: 'tpl/template/ui_chart.html',
                        resolve: load('js/controllers/template/chart.js')
                    })
                    // table
                    .state('app.table', {
                        url: '/table',
                        template: '<div ui-view></div>'
                    })
                    .state('app.table.static', {
                        url: '/static',
                        templateUrl: 'tpl/template/table_static.html'
                    })
                    .state('app.table.datatable', {
                        url: '/datatable',
                        templateUrl: 'tpl/template/table_datatable.html'
                    })
                    .state('app.table.footable', {
                        url: '/footable',
                        templateUrl: 'tpl/template/table_footable.html'
                    })
                    .state('app.table.grid', {
                        url: '/grid',
                        templateUrl: 'tpl/template/table_grid.html',
                        resolve: load(['ngGrid', 'js/controllers/template/grid.js'])
                    })
                    .state('app.table.uigrid', {
                        url: '/uigrid',
                        templateUrl: 'tpl/template/table_uigrid.html',
                        resolve: load(['ui.grid', 'js/controllers/template/uigrid.js'])
                    })
                    .state('app.table.editable', {
                        url: '/editable',
                        templateUrl: 'tpl/template/table_editable.html',
                        controller: 'XeditableCtrl',
                        resolve: load(['xeditable', 'js/controllers/template/xeditable.js'])
                    })
                    .state('app.table.smart', {
                        url: '/smart',
                        templateUrl: 'tpl/template/table_smart.html',
                        resolve: load(['smart-table', 'js/controllers/template/table.js'])
                    })
                    // form
                    .state('app.form', {
                        url: '/form',
                        template: '<div ui-view class="fade-in"></div>',
                        resolve: load('js/controllers/template/form.js')
                    })
                    .state('app.form.components', {
                        url: '/components',
                        templateUrl: 'tpl/template/form_components.html',
                        resolve: load(['ngBootstrap', 'daterangepicker', 'js/controllers/template/form.components.js'])
                    })
                    .state('app.form.elements', {
                        url: '/elements',
                        templateUrl: 'tpl/template/form_elements.html'
                    })
                    .state('app.form.validation', {
                        url: '/validation',
                        templateUrl: 'tpl/template/form_validation.html'
                    })
                    .state('app.form.wizard', {
                        url: '/wizard',
                        templateUrl: 'tpl/template/form_wizard.html'
                    })
                    .state('app.form.fileupload', {
                        url: '/fileupload',
                        templateUrl: 'tpl/template/form_fileupload.html',
                        resolve: load(['angularFileUpload', 'js/controllers/template/file-upload.js'])
                    })
                    .state('app.form.imagecrop', {
                        url: '/imagecrop',
                        templateUrl: 'tpl/template/form_imagecrop.html',
                        resolve: load(['ngImgCrop', 'js/controllers/template/imgcrop.js'])
                    })
                    .state('app.form.select', {
                        url: '/select',
                        templateUrl: 'tpl/template/form_select.html',
                        controller: 'SelectCtrl',
                        resolve: load(['ui.select', 'js/controllers/template/select.js'])
                    })
                    .state('app.form.slider', {
                        url: '/slider',
                        templateUrl: 'tpl/template/form_slider.html',
                        controller: 'SliderCtrl',
                        resolve: load(['vr.directives.slider', 'js/controllers/template/slider.js'])
                    })
                    .state('app.form.editor', {
                        url: '/editor',
                        templateUrl: 'tpl/template/form_editor.html',
                        controller: 'EditorCtrl',
                        resolve: load(['textAngular', 'js/controllers/template/editor.js'])
                    })
                    .state('app.form.xeditable', {
                        url: '/xeditable',
                        templateUrl: 'tpl/template/form_xeditable.html',
                        controller: 'XeditableCtrl',
                        resolve: load(['xeditable', 'js/controllers/template/xeditable.js'])
                    })
                    // pages
                    .state('app.page', {
                        url: '/page',
                        template: '<div ui-view class="fade-in-down"></div>'
                    })
                    .state('app.page.profile', {
                        url: '/profile',
                        templateUrl: 'tpl/template/page_profile.html'
                    })
                    .state('app.page.post', {
                        url: '/post',
                        templateUrl: 'tpl/template/page_post.html'
                    })
                    .state('app.page.search', {
                        url: '/search',
                        templateUrl: 'tpl/template/page_search.html'
                    })
                    .state('app.page.invoice', {
                        url: '/invoice',
                        templateUrl: 'tpl/template/page_invoice.html'
                    })
                    .state('app.page.price', {
                        url: '/price',
                        templateUrl: 'tpl/template/page_price.html'
                    })
                    .state('app.docs', {
                        url: '/docs',
                        templateUrl: 'tpl/template/docs.html'
                    })
                    // others
                    .state('lockme', {
                        url: '/lockme',
                        templateUrl: 'tpl/template/page_lockme.html'
                    })
                    .state('access', {
                        url: '/access',
                        template: '<div ui-view class="fade-in-right-big smooth"></div>'
                    })
                    .state('admin', {
                        url: '/access',
                        template: '<div ui-view class="fade-in-right-big smooth"></div>'
                    })
                
                    .state('access.signin', {
                        url: '/signin',
                        templateUrl: 'tpl/template/page_signin.html',
                        resolve: load(['js/controllers/template/signin.js'])
                    })
                    .state('access.signup', {
                        url: '/signup',
                        templateUrl: 'tpl/template/page_signup.html',
                        resolve: load(['js/controllers/template/signup.js'])
                    })
                    .state('access.forgotpwd', {
                        url: '/forgotpwd',
                        templateUrl: 'tpl/template/page_forgotpwd.html'
                    })
                    .state('access.404', {
                        url: '/404',
                        templateUrl: 'tpl/template/page_404.html'
                    })

                    // fullCalendar
                    .state('app.calendar', {
                        url: '/calendar',
                        templateUrl: 'tpl/template/app_calendar.html',
                        // use resolve to load other dependences
                        resolve: load(['moment', 'fullcalendar', 'ui.calendar', 'js/app/calendar/calendar.js'])
                    })

                    // mail
                    .state('app.mail', {
                        abstract: true,
                        url: '/mail',
                        templateUrl: 'tpl/template/mail.html',
                        // use resolve to load other dependences
                        resolve: load(['js/app/mail/mail.js', 'js/app/mail/mail-service.js', 'moment'])
                    })
                    .state('app.mail.list', {
                        url: '/inbox/{fold}',
                        templateUrl: 'tpl/template/mail.list.html'
                    })
                    .state('app.mail.detail', {
                        url: '/{mailId:[0-9]{1,4}}',
                        templateUrl: 'tpl/template/mail.detail.html'
                    })
                    .state('app.mail.compose', {
                        url: '/compose',
                        templateUrl: 'tpl/template/mail.new.html'
                    })

                    .state('layout', {
                        abstract: true,
                        url: '/layout',
                        templateUrl: 'tpl/template/layout.html'
                    })
                    .state('layout.fullwidth', {
                        url: '/fullwidth',
                        views: {
                            '': {
                                templateUrl: 'tpl/template/layout_fullwidth.html'
                            },
                            'footer': {
                                templateUrl: 'tpl/template/layout_footer_fullwidth.html'
                            }
                        },
                        resolve: load(['js/controllers/template/vectormap.js'])
                    })
                    .state('layout.mobile', {
                        url: '/mobile',
                        views: {
                            '': {
                                templateUrl: 'tpl/template/layout_mobile.html'
                            },
                            'footer': {
                                templateUrl: 'tpl/template/layout_footer_mobile.html'
                            }
                        }
                    })
                    .state('layout.app', {
                        url: '/app',
                        views: {
                            '': {
                                templateUrl: 'tpl/template/layout_app.html'
                            },
                            'footer': {
                                templateUrl: 'tpl/template/layout_footer_fullwidth.html'
                            }
                        },
                        resolve: load(['js/controllers/template/tab.js'])
                    })
                    .state('apps', {
                        abstract: true,
                        url: '/apps',
                        templateUrl: 'tpl/template/layout.html'
                    })
                    .state('apps.note', {
                        url: '/note',
                        templateUrl: 'tpl/template/apps_note.html',
                        resolve: load(['js/app/note/note.js', 'moment'])
                    })
                    .state('apps.contact', {
                        url: '/contact',
                        templateUrl: 'tpl/template/apps_contact.html',
                        resolve: load(['js/app/contact/contact.js'])
                    })
                    .state('app.weather', {
                        url: '/weather',
                        templateUrl: 'tpl/template/apps_weather.html',
                        resolve: load(['js/app/weather/skycons.js', 'angular-skycons', 'js/app/weather/ctrl.js', 'moment'])
                    })
                    .state('app.todo', {
                        url: '/todo',
                        templateUrl: 'tpl/template/apps_todo.html',
                        resolve: load(['js/app/todo/todo.js', 'moment'])
                    })
                    .state('app.todo.list', {
                        url: '/{fold}'
                    })
                    .state('app.note', {
                        url: '/note',
                        templateUrl: 'tpl/template/apps_note_material.html',
                        resolve: load(['js/app/note/note.js', 'moment'])
                    })
                    .state('music', {
                        url: '/music',
                        templateUrl: 'tpl/template/music.html',
                        controller: 'MusicCtrl',
                        resolve: load([
                            'com.2fdevs.videogular',
                            'com.2fdevs.videogular.plugins.controls',
                            'com.2fdevs.videogular.plugins.overlayplay',
                            'com.2fdevs.videogular.plugins.poster',
                            'com.2fdevs.videogular.plugins.buffering',
                            'js/app/music/ctrl.js',
                            'js/app/music/theme.css'
                        ])
                    })
                    .state('music.home', {
                        url: '/home',
                        templateUrl: 'tpl/template/music.home.html'
                    })
                    .state('music.genres', {
                        url: '/genres',
                        templateUrl: 'tpl/template/music.genres.html'
                    })
                    .state('music.detail', {
                        url: '/detail',
                        templateUrl: 'tpl/template/music.detail.html'
                    })
                    .state('music.mtv', {
                        url: '/mtv',
                        templateUrl: 'tpl/template/music.mtv.html'
                    })
                    .state('music.mtvdetail', {
                        url: '/mtvdetail',
                        templateUrl: 'tpl/template/music.mtv.detail.html'
                    })
                    .state('music.playlist', {
                        url: '/playlist/{fold}',
                        templateUrl: 'tpl/template/music.playlist.html'
                    })
                    .state('app.material', {
                        url: '/material',
                        template: '<div ui-view class="wrapper-md"></div>',
                        resolve: load(['js/controllers/template/material.js'])
                    })
                    .state('app.material.button', {
                        url: '/button',
                        templateUrl: 'tpl/material/button.html'
                    })
                    .state('app.material.color', {
                        url: '/color',
                        templateUrl: 'tpl/material/color.html'
                    })
                    .state('app.material.icon', {
                        url: '/icon',
                        templateUrl: 'tpl/material/icon.html'
                    })
                    .state('app.material.card', {
                        url: '/card',
                        templateUrl: 'tpl/material/card.html'
                    })
                    .state('app.material.form', {
                        url: '/form',
                        templateUrl: 'tpl/material/form.html'
                    })
                    .state('app.material.list', {
                        url: '/list',
                        templateUrl: 'tpl/material/list.html'
                    })
                    .state('app.material.ngmaterial', {
                        url: '/ngmaterial',
                        templateUrl: 'tpl/material/ngmaterial.html'
                    });

                function load(srcs, callback) {
                    return {
                        deps: ['$ocLazyLoad', '$q',
                            function ($ocLazyLoad, $q) {
                                var deferred = $q.defer();
                                var promise = false;
                                srcs = angular.isArray(srcs) ? srcs : srcs.split(/\s+/);
                                if (!promise) {
                                    promise = deferred.promise;
                                }
                                angular.forEach(srcs, function (src) {
                                    promise = promise.then(function () {
                                        if (JQ_CONFIG[src]) {
                                            return $ocLazyLoad.load(JQ_CONFIG[src]);
                                        }
                                        angular.forEach(MODULE_CONFIG, function (module) {
                                            if (module.name == src) {
                                                name = module.name;
                                            } else {
                                                name = src;
                                            }
                                        });
                                        return $ocLazyLoad.load(name);
                                    });
                                });
                                deferred.resolve();
                                return callback ? promise.then(function () {
                                    return callback();
                                }) : promise;
                            }]
                    }
                }
            }
        ]
    );
