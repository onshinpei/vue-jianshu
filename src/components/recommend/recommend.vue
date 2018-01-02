<template>
  <div class="recommend">
    <navbar :marginBottom="true"></navbar>
    <div class="hot-topics xp-block-layout">
      <div class="hot-topics-title">热门专题</div>
      <div class="hot-topics-change">
        <Button icon="refresh" buttonType="blank">换一批</Button>
      </div>
      <ul></ul>
    </div>
  </div>
</template>
<script>
  import Navbar from '@/components/navbar/navbar'
  import Button from '@/components/Button/Button'
  export default {
    components: {
      Navbar,
      Button
    },
    data () {
      return {
        style: {
          backgroundColor: '#fff',
          color: '#e45e46'
        }
      }
    }
  }
</script>
<style lang="less">

</style>
