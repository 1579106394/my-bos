<template>
    <div>

        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="员工姓名" prop="userName">
                <el-input v-model="ruleForm.userName"></el-input>
            </el-form-item>
            <el-form-item label="员工年龄" prop="userAge">
                <el-input v-model="ruleForm.userAge"></el-input>
            </el-form-item>
            <el-form-item label="手机号" prop="userTelephone">
                <el-input v-model="ruleForm.userTelephone"></el-input>
            </el-form-item>
            <el-form-item label="所属部门">
                    <el-select v-model="ruleForm.userRole.roleId" placeholder="请选择部门">
                            <el-option v-for="role in roleList" :key="role.roleId" 
                            :label="role.roleName" :value="role.roleId">{{ role.roleName }}</el-option>
                        </el-select>
            </el-form-item>

            <el-form-item label="性别">
                <el-radio-group v-model="ruleForm.userSex">
                    <el-radio :label="1">男</el-radio>
                    <el-radio :label="2">女</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>

    export default {
        data() {

            return {
                ruleForm: this.user,
                roleList: [],
                rules: {
                    userName: [
                        { required: true, message: '请输入员工姓名', trigger: 'blur' },
                    ],
                    userAge: [
                        { required: true, message: '请输入员工年龄', trigger: 'blur' },
                    ],
                    userTelephone: [
                        { required: true, message: '请输入手机号', trigger: 'blur' },
                    ]
                }
            };
        },
        props: [
            'user'
        ],
        methods: {
            submitForm(formName) { // 提交表单
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        var param = this.setParams(this.ruleForm)
                        this.$http.post('api/user/editUser', param).then(result => {
                            if (result.body.status === 200) {
                                this.$message({
                                    message: '修改用户成功',
                                    type: 'success',
                                    duration: 2000
                                });

                                // 叉掉弹窗
                                this.$emit('changeDialog', false)

                            } else {
                                this.$message({
                                    message: result.body.msg,
                                    type: 'error',
                                    duration: 2000
                                });
                            }
                        }, result => {
                            this.$message({
                                message: '修改失败！',
                                type: 'error',
                                duration: 2000
                            });
                        })

                        
                    } else {
                        return false;
                    }
                });
            },
            getRoleList() {
                this.$http.get('api/role/roleList').then(result => {
                    if (result.body.status === 200) {
                        this.roleList = result.body.data
                    }
                }, result => {
                })
            },
            setParams(params) {
                return JSON.stringify(params)
            }
        },
        watch: {
            user(newVal, oldVal) {
                this.ruleForm = newVal
            }
        },
        created() {
            this.getRoleList()
        },
    }
</script>


<style scoped>
    .demo-ruleForm {
        width: 80%;
    }
</style>