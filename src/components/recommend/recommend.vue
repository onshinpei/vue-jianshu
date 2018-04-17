<template>
    <div class="recommend">
        <navbar :marginBottom="true"></navbar>
        <div class="hot-topics xp-block-layout">
            <div class="hot-topics-header clearfix">
                <span class="hot-topics-title">热门专题</span>

                <Button class="hot-topics-change" icon="icon-loop2" buttonType="blank"
                        @click.native="changeCollections">换一批
                </Button>
            </div>
            <div class="recommend-collection">
                <Badge class="recommend-collection-item" v-for="collection in collections" color="#ea6f5a"
                       :href="collection.href" :key="collection.title">{{collection.title}}
                </Badge>
            </div>
            <div class="flow-list-container">
                <article-list :flowLists="flowLists"></article-list>
                <div class="flow-list-more" @click="getFlowListMore">
                    展开更多文章
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import {mapGetters} from 'vuex'

    import Navbar from '@/components/navbar/navbar'
    import Button from '@/components/Button/Button'
    import Badge from '@/components/Badge/Badge'
    import {deepClone} from '@/common/js/util'
    import {requestPost, requestGet} from '@/common/js/request'
    import ArticleList from '../list/article'

    export default {
        components: {
            Navbar,
            Button,
            ArticleList
        },
        data () {
            return {
                page: 1,
                count: 15,
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
        created() {
            // 如果未登录，则跳至登录页
            // if (!this.isLogin) {
            //     this.$router.push('/login')
            // }
        },
        mounted () {
            this.fetchCollections()
            this.fetchRecommendedList()
        },
        computed: {
            ...mapGetters(['isLogin']),
            noteIds () {
                let noteIds = []
                this.flowLists.forEach((item) => {
                    noteIds.push(item.object.data.id)
                })
                return noteIds
            }
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
                requestGet('http://localhost:3000/users/getRecommend', {
                    page: this.page,
                    count: this.count,
                    note_ids: this.noteIds
                }).then((res) => {
                    this.flowLists = this.flowLists.concat(res.data)
                })
            },
            getFlowListMore () {
                this.fetchRecommendedList()
            }
        }
    }
</script>
<style lang="less" rel="stylesheet/less">
    @import "../../styles/base";

    .recommend {
        min-width: @min-width;
        max-width: @max-width;
        margin: 0 auto;
    }
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

    .flow-list-more {
        padding: 0.2rem 0.3rem;
        text-align: center;
        color: #969696;
        font-size: 0.26rem;
    }
</style>
