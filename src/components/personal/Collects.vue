<template>
	<div>
		<Card :bordered="false">
            <p slot="title">我的收藏</p>
            <article-list :flowLists="flowLists" :hasOperation="false"></article-list>
        </Card>
	</div>
</template>
<script>
    import {requestPost, requestGet} from '@/common/js/request'

    import ArticleList from '../list/article'
    export default {
        name: 'Collects',
        components: {
            ArticleList
        },
        data() {
            return {
                flowLists: []
            }
        },
        async mounted() {
            const resData = await requestGet('http://localhost:3000/users/allCollect', {
                pageSize: 20,
                pageNum: 1
            });
            this.flowLists = resData.data;
        }
    }
</script>
