<template>
    <div>

        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="部门名称" prop="roleName">
                <el-input v-model="ruleForm.roleName"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>

    export default {
        data() {

            return {
                ruleForm: this.role,
                rules: {
                    roleName: [
                        { required: true, message: '请输入部门名称', trigger: 'blur' },
                    ]
                },
                roleName: this.role.roleName,
                roleList: [] // 部门列表 用来检验部门是否重复
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        var param = this.setParams(this.ruleForm)
                        var flag = true
                        this.roleList.forEach(item => {
                            if (item.roleName === this.ruleForm.roleName && item.roleName != this.roleName) {
                                this.$message({
                                    message: '修改失败！该部门已存在',
                                    type: 'error',
                                    duration: 2000
                                });
                                flag = false
                            }

                        })
                        if (flag) {
                            this.$http.post('api/role/editRole', param).then(result => {
                                if (result.body.status === 200) {
                                    this.$message({
                                        message: '修改部门成功',
                                        type: 'success',
                                        duration: 2000
                                    });

                                    // 清空输入框
                                    this.$refs[formName].resetFields()
                                    this.$emit('changeRole', false)

                                } else {
                                    this.$message({
                                        message: result.body.msg,
                                        type: 'error',
                                        duration: 2000
                                    });
                                }
                            }, result => {
                                this.$message({
                                    message: result.body.msg,
                                    type: 'error',
                                    duration: 2000
                                });
                            })
                        }


                    } else {
                        return false;
                    }
                });
            },
            getRoleList() {
                // 获取部门列表
                this.$http.get('api/role/roleList').then(result => {
                    this.roleList = result.body.data
                })
            },
            setParams(params) {
                return JSON.stringify(params)
            }
        },
        created() {
            this.$emit('cardName', '新增部门')
            this.getRoleList()
        },
        props: [
            'role'
        ],
        watch: {
            role(newVal, oldVal) {
                this.ruleForm = newVal
            }
        }
    }
</script>


<style scoped>
    .demo-ruleForm {
        width: 80%;
    }
</style>