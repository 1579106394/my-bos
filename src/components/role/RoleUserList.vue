<template>
    <div>
        <el-table @sort-change='sortChange' v-loading="loading" :data="page.list" style="width: 100%">
            <el-table-column prop="userId" label="编号" sortable="custom" width="180">
            </el-table-column>

            <el-table-column prop="userName" label="姓名" sortable="custom" width="180">
            </el-table-column>

            <el-table-column prop="userSex" label="性别">
            </el-table-column>

            <el-table-column prop="userAge" label="年龄" sortable="custom">
            </el-table-column>

            <el-table-column prop="userRole.roleName" label="部门" sortable="custom">
            </el-table-column>

            <el-table-column prop="userTelephone" label="手机号">
            </el-table-column>

            <el-table-column width="280" label="操作" fixed="right">
                <template slot-scope="scope">
                    <el-button-group>
                        <el-button size="mini" @click="editUser(scope.row)" type="primary" icon="el-icon-edit">编辑</el-button>
                        <el-button size="mini" @click="deleteUserFromRole(scope.row)" type="primary" icon="el-icon-delete">裁员</el-button>
                    </el-button-group>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页组件 -->
        <page :page="page" @page="setPage"></page>



        <!-- 编辑用户弹窗 -->
        <el-dialog title="编辑用户" :visible.sync="dialogFormVisible" append-to-body>
            <edit :user="user" @changeDialog="changeDialog"></edit>
        </el-dialog>



    </div>
</template>

<script>

    import page from '../childcomponents/page.vue'
    import edit from '../user/UserEdit.vue'

    export default {
        data() {
            return {
                loading: true,
                dialogFormVisible: false,
                page: {
                    currentPage: 1, // 当前页
                    currentCount: 10, // 每页显示条数
                    totalCount: 0,
                    params: {
                        orderName: '', // 排序列名
                        order: '', // 排序方式
                        roleId: this.role.roleId // 部门id
                    }
                },
                user: { // 点击编辑，传递给弹窗的user对象

                }
            }
        },
        methods: {

            getUserList() {
                this.loading = true
                var param = this.setParams(this.page)
                this.$http.post('api/user/userList', param).then(result => {
                    if (result.body.status === 200) {
                        this.page = result.body.data
                    }
                }, result => {
                })
                setTimeout(() => {
                    this.loading = false
                }, 2000);
            },
            editUser(row) {
                this.dialogFormVisible = true
                this.user = row
            },
            deleteUserFromRole(row) {
                // 弹窗提示：是否删除
                this.$confirm('是否要裁掉该名员工?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    // 点击“是”回调，发送请求

                    this.$http.delete('api/role/deleteUser/' + row.userId).then(result => {
                        if (result.body.status === 200) {
                            // 删除成功
                            this.$message({
                                type: 'success',
                                message: '裁员成功!'
                            });
                            this.getUserList()
                        }
                    }, result => {
                        // 删除失败
                        this.$message({
                            type: 'error',
                            message: "裁员失败！"
                        });
                    })


                }).catch(() => {
                    // 点击“否”回调
                    this.$message({
                        type: 'info',
                        message: '已取消操作'
                    });
                });

            },
            setPage(page) {
                // 改变页数的回调函数
                this.getUserList()
            },
            sortChange: function (column) {
                // 排序表格
                this.page.params.orderName = column.prop
                if (column.order != null) {
                    this.page.params.order = column.order.replace("ending", "")
                }
                this.getUserList()
            },
            setParams(params) {
                // 参数修改为json
                return JSON.stringify(params)
            },
            changeDialog(dialogFormVisible) {
                // 叉掉弹窗
                this.dialogFormVisible = dialogFormVisible
            }
        },
        components: {
            page,
            edit
        },
        created() {
            this.$emit('cardName', '员工列表')
        },
        mounted() {
            this.getUserList()
        },
        props: [
            'role'
        ],
        watch: {
            role(newVal, oldVal) {
                this.page.params.roleId = newVal.roleId
                this.getUserList()
            }
        }
    }
</script>

<style scoped>
</style>