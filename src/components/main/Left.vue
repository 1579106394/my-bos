<template>
    <div class="left">
        <el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse">

            <el-radio-group v-model="isCollapse">
                <el-radio-button :label="!isCollapse">
                    <i :class="isCollapse ? 'el-icon-arrow-right' : 'el-icon-arrow-left'"></i>
                </el-radio-button>
            </el-radio-group>

            <el-submenu index="1">
                <template slot="title">
                    <i class="mui-icon mui-icon-person"></i>
                    <span slot="title">员工管理</span>
                </template>
                <router-link to="/userList">
                    <el-menu-item index="1-1">员工列表</el-menu-item>
                </router-link>
                <el-menu-item index="1-2">新增员工</el-menu-item>
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
</template>

<script>
    export default {
        data() {
            return {
                isCollapse: true
            };
        },
        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            }
        }
    }
</script>

<style scoped>
    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 200px;
        min-height: 400px;
    }
</style>