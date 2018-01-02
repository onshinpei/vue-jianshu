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
    min-width: @min-width;
    max-width: @max-width;
    margin: 0 auto;
  }
</style>
