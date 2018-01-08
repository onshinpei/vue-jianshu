<template>
  <div class="recommend">
    <navbar :marginBottom="true"></navbar>
    <div class="hot-topics xp-block-layout">
      <div class="hot-topics-header clearfix">
        <span class="hot-topics-title">热门专题</span>
        <Button class="hot-topics-change" icon="icon-loop2" buttonType="blank" @click.native="changeCollections">换一批</Button>
      </div>
      <div class="recommend-collection">
        <Badge class="recommend-collection-item" v-for="collection in collections" color="#ea6f5a" :href="collection.href" :key="collection.title">{{collection.title}}</Badge>
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
        },
        collections: [],
        // 换一批
        exceptCollectionIds: []
      }
    },
    mounted () {
      this.fetchCollections()
      this.fetchRecommendedList()
    },
    methods: {
      changeCollections () {
        this.fetchCollections()
      },
      fetchCollections () {
        this.$http.get('/jianshu/mobile/subscriptions/recommended_collections', {
          params: {
            except_collection_ids: this.exceptCollectionIds
          },
          headers: {
            Accept: 'application/json'
          },
          dataType: 'json'
        }).then((res) => {
          if (res.data.length === 0) {
            this.exceptCollectionIds = []
            this.fetchCollections()
            return
          }
          res.data.forEach((item) => {
            item.href = `https://www.jianshu.com/c/${item.slug}?utm_source=mobile&utm_medium=collections`
            this.exceptCollectionIds.push(item.id)
          })
          this.collections = res.data
        })
      },
      fetchRecommendedList () {
        this.$http.get('/jianshu/mobile/trending/now', {
          params: {
            page: 1,
            count: 15
          },
          headers: {
            Accept: 'application/json'
          }
        }).then((res) => {
          console.log(res)
        })
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
