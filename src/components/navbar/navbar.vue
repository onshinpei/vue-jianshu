<template>
    <header class="xp-navbar xp-block-layout" :class="{'xp-margin-bottom': marginBottom}" :style="style">
        <div class="xp-navbar-center-box">
            <div class="xp-navbar-center">
                <span>
                  简书
                </span>
            </div>
        </div>
        <div class="login-group">
            <Button buttonType="primary" @click="loginHandler">登录</Button>
            <Button buttonType="error" @click="logout">退出</Button>
        </div>
    </header>
</template>
<script>
    import Button from '@/components/Button/Button'
    export default {
        components: {
            Button
        },
        props: {
            marginBottom: {
                type: Boolean,
                default: false
            }
        },
        data () {
            return {
                style: {
                    color: '#e45e46'
                }
            }
        },
        methods: {
            loginHandler() {
                this.$router.push('/login');
            },
            logout() {
                this.$http.get('/server/users/logoutuser').then((res) => {
                    this.$router.push('/login');
                }, (err) => {
                    console.log(err);
                })
            }
        }
    }
</script>
<style lang="less" scoped>
    .xp-navbar {
        position: relative;
        .xp-navbar-center-box {
            text-align: center;
            margin: 0 auto;
            width: 50%;
            height: 1rem;
            font-size: 0.55rem;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;

            .xp-navbar-center {
                display: flex;
                justify-content: center;
                height: inherit;
                align-items: center;
            }
        }
        .login-group {
            position: absolute;
            right: 15px;
            top: 10px;
        }
    }
</style>
