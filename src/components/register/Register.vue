<template>
    <div class="app-login">
        <div class="login-pane">
            <h2 class="login-pane-title">用户注册</h2>
            <div>
                <input class="xp-input" type="tel" v-model="phone">
            </div>
            <div>
                <input class="xp-input" type="password" v-model="pwd">
            </div>
            <div>
                <Button @click="submit">提交</Button>
            </div>
            <div>
                已有账号，<router-link to="/login">去登录</router-link>
            </div>
        </div>
    </div>
</template>
<script>
    import Button from '@/components/Button/Button'
    export default {
        components: {
            Button
        },
        data () {
            return {
                phone: '18501308131',
                pwd: '123456'
            }
        },
        methods: {
            submit () {
                this.$http.post('/server/users/adduser', {
                    phone: this.phone,
                    pwd: this.pwd
                }).then(res => {
                    if (res.data.success) {
                        this.$Message.success(res.data.message);
                    } else {
                        this.$Message.error(res.data.message);
                    }
                })
            }
        }
    }
</script>
<style lang="less" rel="stylesheet/less">
    .app-login {
        width: 100%;
        height: 100%;
        background: url('../../assets/bg.png') center center;
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
            color: #fff;
            .login-pane-title {
                font-size: 0.5rem;
            }
            .xp-input {
                color: #fff;
            }
        }
    }
</style>
