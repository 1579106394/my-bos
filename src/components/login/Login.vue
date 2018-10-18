<template>

    <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="用户名">
            <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
            <el-input v-model="form.password"></el-input>
        </el-form-item>

        <el-form-item>
            <el-button type="primary" @click="onSubmit">登录</el-button>
        </el-form-item>
    </el-form>

</template>
<script>

    

    export default {
        data() {
            return {
                form: {
                    username: '',
                    password: ''
                }
            }
        },
        methods: {
            onSubmit() {
                var param = this.setParams(this.form)
                this.$http.post('userLogin', param).then(result => {
                    // this.clearCookie()
                    console.log(result.body)
                    this.setCookie('JSESSIONID', result.body.data)
                    // $.cookie('JSESSIONID', result.body.data, { path: '/' });

                })
            },
            setParams(params) {
                return JSON.stringify(params)
            },
            // 设置cookie
            setCookie(name, value) {
    
                document.cookie = name + "=" + escape(value) + "; path=/";   //转码并赋值
                console.log(document.cookie)
            },
            delCookie(name) { // 删除cookie
                var exp = new Date();
                exp.setTime(exp.getTime() - 1);
                var cval = this.getCookie(name);
                if (cval != null)
                    document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
                console.log(document.cookie)
            },
            getCookie(name) { // 读取cookie
                var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");

                if (arr = document.cookie.match(reg))

                    return unescape(arr[2]);
                else
                    return null;
            }


        }
    }
</script>