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
            <span v-if="isLogin">你好，<router-link to="/personal">{{userInfo.phone}}</router-link></span>
            <Button buttonType="primary" @click="loginHandler" v-if="!isLogin">登录</Button>
            <Button buttonType="blank" @click="logout" v-if="isLogin">退出</Button>
        </div>
    </header>
</template>
<script>
    import Button from '@/components/Button/Button'
    import {mapGetters} from 'vuex'
    import {aipLogout} from '@/api/login'

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
        computed: {
            ...mapGetters(['isLogin', 'userInfo'])
        },
        methods: {
            loginHandler() {
                this.$router.push('/login');
            },
            async logout() {
                const resData = await aipLogout({
                    params: {
                        _: new Date().getTime()
                    }
                }).catch(err => {
                    console.log(err);
                });
                console.log(resData)
                if (resData.success) {
                    this.$store.commit('SET_LOGIN', {loginStatus: '', userInfo: this.userInfo})
                    this.$router.push('/login');
                }
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
