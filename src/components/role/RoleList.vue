<template>
    <div>
        <el-table v-loading="loading" :data="roleList" style="width: 100%">
            <el-table-column prop="roleId" label="编号">
            </el-table-column>

            <el-table-column prop="roleName" label="姓名">
            </el-table-column>


            <el-table-column label="操作" fixed="right">
                <template slot-scope="scope">
                    <el-button-group>
                        <el-button size="mini" @click="userList(scope.row)" type="primary" icon="el-icon-tickets">部门员工</el-button>
                        <el-button size="mini" @click="editRole(scope.row)" type="primary" icon="el-icon-edit">编辑</el-button>
                        <el-button size="mini" @click="deleteRole(scope.row)" type="primary" icon="el-icon-delete">删除</el-button>
                    </el-button-group>
                </template>
            </el-table-column>
        </el-table>


        <!-- 编辑部门弹窗 -->
        <el-dialog title="编辑部门" :visible.sync="changeRole">
            <edit :role="role" @changeRole="changeRoleMethod"></edit>
        </el-dialog>

        <!-- 部门员工弹窗 -->
        <el-dialog width="80%" title="部门员工" :visible.sync="changeRoleUser">
            <roleUser :role="role" @changeRoleUser="changeRoleUserMethod"></roleUser>
        </el-dialog>



    </div>
</template>

<script>

    import edit from '../role/RoleEdit.vue'
    import roleUser from '../role/RoleUserList.vue'

    var that = this

    export default {
        data() {
            return {
                loading: true,
                changeRole: false,
                changeRoleUser: false,
                roleList: [],
                role: { // 点击编辑，传递给弹窗的role对象

                }
            }
        },
        methods: {

            getRoleList() {
                this.loading = true
                this.$http.get('api/role/roleList').then(result => {
                    if (result.body.status === 200) {
                        console.log(result.body.data)
                        this.roleList = result.body.data
                    }
                }, result => {
                })
                setTimeout(() => {
                    this.loading = false
                }, 2000);
            },
            editRole(row) {
                this.changeRole = true
                this.role = row
            },
            userList(row) {
                this.changeRoleUser = true
                this.role = row
            },
            deleteRole(row) {
                // 弹窗提示：是否删除
                this.$confirm('是否删除该部门?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    // 点击“是”回调，发送请求

                    this.$http.delete('api/role/deleteRole/' + row.roleId).then(result => {
                        if (result.body.status === 200) {
                            // 删除成功
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            this.getRoleList()
                        }
                    }, result => {
                        // 删除失败
                        this.$message({
                            type: 'error',
                            message: "删除失败！"
                        });
                    })


                }).catch(() => {
                    // 点击“否”回调
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });

            },
            setParams(params) {
                // 参数修改为json
                return JSON.stringify(params)
            },
            changeRoleMethod(changeRole) {
                // 叉掉弹窗
                this.changeRole = changeRole
            },
            changeRoleUserMethod(changeRoleUser) {
                this.changeRoleUser = changeRoleUser
            }
        },
        components: {
            edit,
            roleUser
        },
        created() {
            this.$emit('cardName', '部门列表')
        },
        mounted() {
            this.getRoleList()
        }
    }
</script>

<style scoped>
</style>