<template>

    <div class="nav">
        <!-- 左边区域 -->
        <div class="left">
            <el-menu default-active="1-4-1" class="el-menu-vertical-demo" :collapse="isCollapse">

                <el-submenu index="1">
                    <template slot="title">
                        <i class="mui-icon mui-icon-person"></i>
                        <span slot="title">员工管理</span>
                    </template>
                    <router-link to="/userList">
                        <el-menu-item index="1-1">员工列表</el-menu-item>
                    </router-link>
                    <router-link to="/userAdd">
                        <el-menu-item index="1-2">新增员工</el-menu-item>
                    </router-link>
                </el-submenu>
                <el-submenu index="2">
                    <template slot="title">
                        <i class="mui-icon mui-icon-chatboxes"></i>
                        <span slot="title">部门管理</span>
                    </template>
                    <el-menu-item index="2-1">部门列表</el-menu-item>
                    <el-menu-item index="2-2">新增部门</el-menu-item>
                    <el-menu-item index="2-3">部门裁员</el-menu-item>
                    <el-menu-item index="2-4">部门员工</el-menu-item>
                </el-submenu>
                <el-menu-item index="3">
                    <i class="mui-icon mui-icon-gear"></i>
                    <span slot="title">权限管理</span>
                </el-menu-item>
            </el-menu>
        </div>



        <div class="container">
            <!-- 顶部区域 -->
            <div class="header">

                <el-menu :default-active="activeIndex2" class="el-menu-demo" mode="horizontal" background-color="#545c64" text-color="white"
                    active-text-color="#fff">

                    <!-- 折叠 -->
                    <el-menu-item index=0 @click="changeCollapse">
                        <el-button type="text">
                            <i :class="isCollapse ? 'el-icon-arrow-right' : 'el-icon-arrow-left'"></i>
                        </el-button>
                    </el-menu-item>

                    <!-- 刷新 -->
                    <el-menu-item index="1">
                        <el-button type="text">
                            <i class="el-icon-refresh"></i>
                        </el-button>
                    </el-menu-item>
                </el-menu>

            </div>

            <!-- 主区域 -->
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>{{ cardName }}</span>
                </div>
                <router-view @cardName="getCardName"></router-view>
            </el-card>

        </div>
    </div>

</template>

<script>


    export default {
        data() {
            return {
                isCollapse: true,
                activeIndex: '1',
                activeIndex2: '1',
                cardName: '',   // 子组件传递过来的卡片名称
            };
        },
        methods: {
            changeCollapse() {
                this.isCollapse = !this.isCollapse
            },
            getCardName(name) { // 获取子组件传递过来的卡片名称
                this.cardName = name
            }
        }
    }
</script>

<style>
    html,
    body {
        margin: 0;
        padding: 0;
    }


    h1 {
        margin: 0;
        padding: 0;
        font-size: 16px;
    }


    .nav {
        display: flex;
        height: 100%;
    }

    .container {
        margin-left: 200px;
        margin-top: 60.8px;
        margin-right: 20px;
        flex: 12;
    }

    .left {
        margin: 0;
        height: 100%;
        width: 160px;
        position: fixed;
        z-index: 999;
        padding-top: 20px;
    }

    .header {
        width: 100%;
        position: fixed;
        z-index: 999;
        top: 0;
        overflow-x: hidden;
    }


    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 200px;
        min-height: 100%;
    }

    .el-button--text {
        color: white;
    }

    .main {
        margin-top: 15px;
        margin-left: 15px;
    }

    .text {
        font-size: 14px;
    }

    .item {
        padding: 18px 0;
    }

    .box-card {
        margin-top: 20px;
        margin-right: 20px;
        margin-left: 20px;
    }
</style>