<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>
    export default {
        name: 'app'
    }
</script>

<style lang="less">
    @import "styles/base";
   #app {
       width: 100%;
       height: 100%;
   }
</style>
