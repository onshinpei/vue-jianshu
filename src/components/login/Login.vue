<template>
    <div class="app-login">
        <div class="login-pane">
            <h2 class="login-pane-title">用户登录</h2>
            <div>
                <input type="text" v-model="username">
            </div>
            <div>
                <input type="password" v-model="password">
            </div>
            <div>
                <button @click="submit">提交</button>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                username: '温新平',
                password: '123456'
            }
        },
        methods: {
            submit () {
                this.$http.post('/server/users/loginuser', {
                    username: this.username,
                    password: this.password
                })
            }
        }
    }
</script>
<style lang="less" rel="stylesheet/less">
    .app-login {
        width: 100%;
        height: 100%;
        background: url('../../assets/bg.jpg') center center;
        background-size: cover;
        .login-pane {
            padding: 50px;
            background: rgba(0, 0, 0, .5);
            height: 350px;
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            width: 475px;
            margin: auto;
            border-radius: 8px;
            .login-pane-title {
                font-size: 0.5rem;
            }
        }
    }
</style>
