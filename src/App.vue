<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>
    import {getUserInfo} from './api/baseApi';

    export default {
        name: 'app',
        async mounted() {
            let resData = await getUserInfo({_: new Date().getTime()});
            if (resData.success) {
                this.$store.commit('SET_USER_INFO', resData.data);

                console.log('获取成功');
            } else {
                this.$store.commit('SET_LOGIN', {});
                this.$router.push('/login');
            }
        }
    }
</script>

<style lang="less">
    @import "styles/base";
   #app {
       width: 100%;
       height: 100%;
   }
</style>
