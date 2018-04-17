<template>
    <ul class="flow-list-ul">
        <li class="flow-list-li" v-for="flowList in flowLists" v-if="flowList.object.data"
            :key="flowList.object.data.id">
            <div class="flow-list-operation" v-if="hasOperation">
                <Icon type="heart" class="operation-btn is-active" :class="{active: flowList.isCollect}" @click.native="collectList(flowList)"></Icon>
            </div>
            <a href="javascript:;">
                <div class="author">
                    <a href="javascript:;" class="author-avator-a"><img
                        :src="flowList.object.data.user.avatar" alt=""></a>
                    <a href="javascript:;" class="author-anme-a">{{flowList.object.data.user.nickname}}</a>
                </div>
                <div class="flow-list-img"
                     :style="'background-image:url('+ flowList.object.data.list_image_url +')'"></div>
                <div class="title">{{flowList.object.data.title}}</div>
                <p class="abstract">{{flowList.object.data.public_abbr}}</p>
            </a>
        </li>
    </ul>
</template>
<script>
    import {requestPost, requestGet} from '@/common/js/request'
    export default {
        name: 'list',
        props: {
            flowLists: {
                type: Array,
                default: () => {
                    return []
                }
            },
            hasOperation: {
                type: Boolean,
                default: true
            }
        },
        methods: {
            async collectList (item) {
                if (item.isCollect) {
                    this.$Message.info('已经是收藏');
                } else {
                    const res = await requestPost('http://localhost:3000/users/addCollect', {
                        dataObj: item
                    });
                    if (res.success) {
                        this.$set(item, 'isCollect', true);
                        this.$Message.success(res.message);
                    }
                }
            }
        }
    }
</script>
<style lang="less">
    .flow-list-li {
        padding: 0.2rem 0.3rem;
        border-bottom: 1px solid #f0f0f0;
        position: relative;
        word-wrap: break-word;
        .flow-list-operation {
            position: absolute;
            right: 0.3rem;
            top: 0.3rem;
            font-size: 30px;
            .operation-btn {
                cursor: pointer;
                &:hover {
                    color: #7c7ce1;
                }
            }
            .active {
                color: red !important;
            }
        }
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
