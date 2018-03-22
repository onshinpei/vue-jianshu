<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>
    export default {
        name: 'app',
        mounted() {
            this.$http.get('/server/users/userinfo').then((res) => {
                let resData = res.data;
                if (resData.success) {
                    console.log('获取成功')
                } else {
                    this.$router.push('/login');
                }
            });
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
