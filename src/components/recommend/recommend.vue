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
      <div class="flow-list-container">
        <ul class="flow-list-ul">
          <li class="flow-list-li" v-for="flowList in flowLists" v-if="flowList.object.data" :key="flowList.object.data.id">
            <a href="javascript:;">
              <div class="author">
                <a href="javascript:;" class="author-avator-a"><img :src="flowList.object.data.user.avatar" alt=""></a>
                <a href="javascript:;" class="author-anme-a">{{flowList.object.data.user.nickname}}</a>
              </div>
              <div class="flow-list-img" :style="'background-image:url('+ flowList.object.data.list_image_url +')'"></div>
              <div class="title">{{flowList.object.data.title}}</div>
              <p class="abstract">{{flowList.object.data.public_abbr}}</p>
            </a>
          </li>
        </ul>
      </div>
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
        exceptCollectionIds: [],
        flowLists: []
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
          this.flowLists = res.data
          console.log(this.flowLists)
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
  .flow-list-li {
    padding: 0.2rem 0.3rem;
    .flow-list-img {
      margin: 15px 0;
      height: 120px;
      background-color: #eaeaea;
      background-repeat: no-repeat;
      background-size: cover;
      background-position: 50%;
    }
    .title {
      margin: 10px 0 0;
      font-size: 0.36rem;
      font-weight: 400;
      line-height: 1.4;
      color: #333;
    }
    .abstract {
      margin: 7px 0 0;
      line-height: 1.5;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      font-size: 13px;
      color: #999;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .author {
      display: flex;
      flex-direction: row;
      align-items: center;
      .author-avator-a {
        display: block;
      }
      .author-anme-a {
        display: block;
        padding-left: 0.1rem;
        font-size: 0.26rem;
        font-weight: bold;
      }

      img {
        display: inline-block;
        width: 34px;
        border-radius: 50%;

      }
    }
  }
</style>
