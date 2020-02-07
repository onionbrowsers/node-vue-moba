<template>
    <div class="login_box" ref="loginBox">
        <!-- 登陆页面 -->
        <div style="position: absolute; left:0; top:15%; right:0; bottom: 0">
            <div class="title-wrapper">
                <span class="login_span">王者荣耀后台管理系统</span>
            </div>
            <div style="position: relative; z-index: 1;width: 500px;height: 384px;background-color: rgba(11, 11, 11, 0.7);margin: auto;border-radius:10px 10px;">
                <div style="box-sizing:border-box;width: 100%;height: 126px;background-color:rgba(128, 128, 128, 0.5);padding-left: 10%;padding-top: 8%;position: relative;border-radius:10px 10px;">
                    <span class="login_hear">立即登录</span>
                    <span class="login_hears">Login to system</span>
                    <i class='el-icon-lock' style="color: rgba(254, 254, 254, 0.73);font-size:40px;position: absolute;bottom: 28%;right: 10%"></i>
                </div>
                <div style="width:400px;margin:0 auto;padding-top: 8%;">
                    <el-form
                        :model='user'
                        ref="userForm"
                        id="components-form-demo-normal-login"
                        class="login-form"
                        @submit.native.prevent="handleSubmit('userForm')"
                    >
                        <div class="ainput">
                            <el-form-item
                                prop='username'
                                :rules="[
                                    { required: true, message: '请输入用户名' }
                                ]">
                                <el-input
                                    type='username'
                                    v-model="user.username"
                                    suffix-icon='el-icon-user'
                                    placeholder="用户名"
                                >
                                </el-input>
                            </el-form-item>
                        </div>
                        <div class="ainput">
                            <el-form-item
                                prop='password'
                                :rules="[
                                     { required: true, message: '请输入密码'},
                                     { min: 6, message: '密码长度必须大于等于6'}
                                ]">
                                <el-input
                                    v-model="user.password"
                                    type="password"
                                    placeholder="密码"
                                    suffix-icon='el-icon-lock'
                                >
                            </el-input>
                            </el-form-item>
                        </div>
                        <el-form-item>
                            <el-button
                                type="primary"
                                native-type="submit"
                                class="login-form-button"
                            >
                            登录
                            </el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
        </div>
  </div>
</template>

<script>
import axios from 'axios'
import Vue from 'vue'
export default {
    data() {
        return {
            user: {}
        }
    },
    created() {
        // 脑瘫了，只能继续脑瘫
        axios.interceptors.response.use(res => {
            return res
        }, err => {
            if (err.response.data.message) {
                Vue.prototype.$message.error(err.response.data.message)
            }
            return Promise.reject(err)
        })
    },
    methods: {
        handleSubmit (form) {
            // el-form校验方法
            this.$refs[form].validate(async (valid) => {
                if (valid) {
                    const url = this.$http.defaults.baseURL.replace('rest', '')
                    const res = await axios.post(url + 'login', this.user)
                    if (res.data.message) {
                        localStorage.token = res.data.token
                        this.$router.push('/')
                        this.$message.success(res.data.message)
                    }
                } else {
                    this.$message.error('登陆失败')
                }
            })
        },
    },
  };
</script>
<style scoped>
.login_box{
    height: 100%;
    position: absolute;
    width: 100%;
    background-image: url("../assets/img/login.jpg");
    background-repeat: no-repeat;
    background-size: 100% 130%;
}
#components-form-demo-normal-login .login-form {
    max-width: 300px;
}
#components-form-demo-normal-login .login-form-forgot {
    float: right;
}
#components-form-demo-normal-login .login-form-button {
    width: 100%;
}
.login_span{
    font-family: MicrosoftYaHei;
    font-size: 60px;
    line-height: 30px;
    letter-spacing: 20px;
    color: #fefefe;
    transform: translateX(42px);
    display: inline-block;
}
.title-wrapper{
    margin-bottom: 30px;
    text-align: center;
}
.desc-wrapper{
    text-align: right;
    color: #fff;
    margin-bottom: 30px
}
.desc-wrapper span{
    width: 350px;
    display: block;
    transform: translateX(70px);
    margin: 0 auto;
}
.desc-wrapper .chinese {
    font-size: 20px;
    letter-spacing: 8px
}
.desc-wrapper .english {
    letter-spacing: 4px
}
.ant-btn-primary{
    background:linear-gradient(#2db3a8,#0D9168,#259188) !important;
    border-color:#269383 !important;
}
.login_hear{
    display: block;
    width: 118px;
    height: 24px;
    font-family: PingFang-SC-Regular;
    font-size: 22px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 26px;
    letter-spacing: 7px;
    color: #ffffff;
    opacity: 0.9;
    margin-bottom: 2%;
}
.login_hears{
    width: 329px;
    height: 13px;
    font-family: SFProDisplay-Regular;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 26px;
    color: #fefefe;
}
</style>