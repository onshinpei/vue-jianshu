<template>
  <div class="recommend">
    <navbar :marginBottom="true"></navbar>
    <div class="hot-topics xp-block-layout">
      <div class="hot-topics-header clearfix">
        <span class="hot-topics-title">热门专题</span>
        <Button class="hot-topics-change" icon="icon-loop2" buttonType="blank">换一批</Button>
      </div>
      <div class="recommend-collection">
        <Badge class="recommend-collection-item" color="#ea6f5a">读书</Badge>
        <Badge class="recommend-collection-item" color="#ea6f5a">读书</Badge>
      </div>
      <ul></ul>
    </div>
  </div>
</template>
<script>
  import Navbar from '@/components/navbar/navbar'
  import Button from '@/components/Button/Button'
  import Badge from '@/components/Badge/Badge'
  export default {
    components: {
      Navbar,
      Button,
      Badge
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
<style lang="less" rel="stylesheet/less">
.hot-topics-header {
  padding: 0.2rem 0.3rem;
}
.hot-topics-title {
  font-size: 0.26rem;
  font-weight: bold;
  line-height: 0.6rem;
}
.hot-topics-change {
  float: right;
}
.recommend-collection {
  padding: 0 0.2rem;
  .recommend-collection-item {
    margin: 0 0.1rem 0.1rem
  }
}
</style>
