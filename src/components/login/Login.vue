<template>
    <div class="app-login">
        <div class="login-pane">
            <h2 class="login-pane-title">用户登录</h2>
            <div>
                <input class="xp-input" type="tel" v-model="userinfo.phone">
            </div>
            <div>
                <input class="xp-input" type="password" v-model="userinfo.pwd">
            </div>
            <div>
                <Button @click="login">提交</Button>
            </div>
            <div>
                还没有账号，<router-link to="/register">去注册</router-link>
            </div>
        </div>
    </div>
</template>
<script>
    import {mapGetters} from 'vuex'
    import Button from '@/components/Button/Button'
    import {apiLogin} from '@/api/login'

    export default {
        components: {
            Button
        },
        data () {
            return {
                userinfo: {
                    phone: '18501308131',
                    pwd: '123456'
                }
            }
        },
        computed: {
            ...mapGetters(['isLogin'])
        },
        created() {
            // 如果已经登录，则跳至推荐页
            if (this.isLogin) {
                alert('你已经登录了，请先退出原来账号');
                this.$router.push('/recommend')
            }
        },
        methods: {
            validate({phone, pwd}) {
                if (phone.trim() === '') {
                    alert('请输入用户名');
                    return false;
                }
                if (pwd.trim() === '') {
                    alert('请输入密码');
                    return false;
                }
                return true
            },
            async login () {
                const resData = await apiLogin(this.userinfo);
                if (resData.success) {
                    this.$Message.success(resData.message);
                    this.$store.commit('SET_LOGIN', resData.data);
                    setTimeout(() => {
                        this.$router.push('/recommend');
                    }, 1000)
                } else {
                    this.$Message.error(resData.message);
                }
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
