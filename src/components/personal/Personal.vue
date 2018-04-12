<template>
    <div class="personal">
        <div class="personal-header">
            <div class="common-card">
                <div class="personal-cover" :class="{active: isHoverShow || imgUrl}">
                    <div class="personal-cover-guide">
                        <div class="personal-cover-nav">
                            <div class="upload-img-btn-box">
                                <a href="javascript:;" @mouseover="showSlider" @mouseout="hideSlider" @click="clickUpload">
                                    <Button type="ghost" icon="camera" >上传封面照片</Button>
                                </a>
                                <input ref="uploadInput" type="file" accept="image/png,image/jpeg" style="display:none;" @change="uploadChange">
                            </div>
                        </div>
                    </div>
                    <div class="personal-cover-bg" :style="{backgroundImage: imgUrl}"></div>

                </div>
                <div class="personal-wrapper">
                    <div class="personal-header-main">
                        <div class="personal-avatar-wrap">
                            <div class="personal-avatar">
                                <img src="http://localhost:3000/avatar/default.jpg" class="personal-avatar-img" width=160 height=160>
                            </div>
                            <div class="personal-avatar-edit" @click="changeAvatar">
                                <div class="avatar-edit-box">
                                    <Icon type="camera" class="avatar-edit-icon"></Icon>
                                    <Button type="primary">修改我的头像</Button>
                                    <input type="file" ref="avatarInput" style="display: none">
                                </div>
                            </div>
                        </div>
                        <div class="personal-header-content">
                            <div class="personal-base-info">
                                <h1 class="personal-base-title">
                                    <span class="personal-base-name">温新平</span>
                                    <span class="personal-base-job">学生</span>
                                </h1>

                            </div>
                            <div class="personal-sex-wrap">
                                <Icon type="male" title="男"></Icon>
                            </div>
                            <div class="personal-btn-box">
                                <Button class="personal-btn" type="ghost">编辑个人资料</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="personal-main">
            <div class="common-card">
                 <Menu mode="horizontal" active-name="collects" @on-select="changeMenu">
                    <MenuItem name="collects">
                        <Icon type="ios-paper"></Icon>
                        收藏
                    </MenuItem>
                    <MenuItem name="following">
                        <Icon type="ios-people"></Icon>
                        关注
                    </MenuItem>
                    <Submenu name="3">
                        <template slot="title">
                            <Icon type="stats-bars"></Icon>
                            统计分析
                        </template>
                        <MenuGroup title="使用">
                            <MenuItem name="3-1">新增和启动</MenuItem>
                            <MenuItem name="3-2">活跃分析</MenuItem>
                            <MenuItem name="3-3">时段分析</MenuItem>
                        </MenuGroup>
                        <MenuGroup title="留存">
                            <MenuItem name="3-4">用户留存</MenuItem>
                            <MenuItem name="3-5">流失用户</MenuItem>
                        </MenuGroup>
                    </Submenu>
                    <MenuItem name="4">
                        <Icon type="settings"></Icon>
                        综合设置
                    </MenuItem>
                </Menu>
            </div>
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
    import {mapGetters} from 'vuex'

    import {requestPost} from '../../common/js/request';
    export default {
        name: 'Personal',
        data() {
            return {
                isHoverShow: false,
                isHoverShowTimer: null,
                isOutHideTimer: null,
                imgUrl: null
            }
        },
        mounted() {
            if (this.userInfo.profile_bg) {
                this.imgUrl = `url(http://localhost:3000${this.userInfo.profile_bg})`;
            }
        },
        methods: {
            showSlider() {
                if (this.isHoverShowTimer) clearTimeout(this.isHoverShowTimer);
                if (!this.isHoverShow);
                this.isHoverShowTimer = setTimeout(() => {
                    this.isHoverShow = true;
                }, 2000)
            },
            hideSlider() {
                if (this.isHoverShowTimer) clearTimeout(this.isHoverShowTimer);
                if (this.isOutHideTimer) clearTimeout(this.isOutHideTimer);
                this.isOutHideTimer = setTimeout(() => {
                    this.isHoverShow = false
                }, 2000);
            },
            clickUpload() {
                if (this.isHoverShowTimer) clearTimeout(this.isHoverShowTimer);
                this.isHoverShow = true;
                this.$refs.uploadInput.click();
            },
            changeAvatar() {
                this.$refs.avatarInput.click();
            },
            async uploadChange() {
                const imageFile = this.$refs.uploadInput.files[0];
                //创建form对象
                let param = new FormData();
                //通过append向form对象添加数据
                param.append('imageFile', imageFile, imageFile.name);
                let config = {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                };
                let resData = await requestPost('http://localhost:3000/users/uploadCover', param, config).catch(err => {
                    console.log(err)
                    this.$Message.error('上传失败')
                });
                if (resData.success) {
                    const baseImgUrl = resData.data.imageUrl;
                    this.imgUrl = `url(http://localhost:3000${resData.data.imageUrl})`;
                    this.$store.commit('SET_USER_INFO', {profile_bg: baseImgUrl});
                    this.$Message.success(resData.message)
                } else {
                    this.$Message.error(resData.message)
                }
            },
            changeMenu(e) {
                this.$router.push('/personal/' + e)
            }
        },
        computed: {
            ...mapGetters(['userInfo'])
        }
    }
</script>
<style lang="less">
    .personal {
        width: 1000px;
        padding: 0 16px;
        margin: 10px auto;
        .personal-main {
            padding-top: 16px;
        }
        .common-card {
            background-color: #fff;
            // overflow: hidden;
            border-radius: 2px;
            box-shadow: 0 1px 3px rgba(26, 26, 26, .1);
            box-sizing: border-box;
        }
        .personal-cover {
            position: relative;
            .personal-cover-guide {
                position: absolute;
                width: 100%;
                height: 100%;
                z-index: 2;
                .personal-cover-nav {
                    position: relative;
                    float: right;
                    padding: 24px;
                    .upload-img-btn-box {
                        button {
                            color: #fff;
                            font-size: 16px;
                        }
                        .ivu-icon-camera {
                            font-size: 22px;
                        }
                    }
                }
            }
            .personal-cover-bg {
                height: 132px;
                background: #999;
                transition: height .3s;
                background-position: center center;
                background-size: contain;
            }
            &.active {
                .personal-cover-bg {
                    height: 240px;
                }
            }
        }
        .personal-wrapper {
            .personal-header-main {
                position: relative;
                padding: 0 20px 24px;
                .personal-avatar-wrap {
                    position: absolute;
                    z-index: 3;
                    top: -74px;
                    left: 25px;
                    .personal-avatar {
                        display: inline-block;
                        overflow: hidden;
                        vertical-align: top;
                        background-color: #fff;
                        border: 4px solid #fff;
                        border-radius: 8px;
                        img {
                            display: block;
                        }
                    }
                    .personal-avatar-edit {
                        position: absolute;
                        top: 4px;
                        left: 4px;
                        right: 4px;
                        bottom: 4px;
                        background: rgba(0, 0, 0, .3);
                        border-radius: 8px;
                        opacity: 0;
                        transition: .3s;
                        color: #fff;
                        cursor: pointer;
                        .avatar-edit-box {
                            margin: 0 auto;
                            display: flex;
                            width: 100px;
                            align-items: center;
                            flex-direction: column;
                            height: 100%;
                            justify-content: space-evenly;
                            .avatar-edit-icon {
                                font-size: 50px;
                            }
                        }
                    }
                    &:hover {
                        .personal-avatar-edit {
                             opacity: 1
                        }
                       
                    }
                }
                

                .personal-header-content {
                    padding-top: 16px;
                    padding-left: 32px;
                    border-left: 164px solid transparent;
                    .personal-base-info {
                        position: relative;
                        padding-right: 106px;
                        margin-bottom: 16px;
                        .personal-base-title {
                            flex: 1;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                            .personal-base-name {
                                font-size: 26px;
                                font-weight: 600;
                                line-height: 30px;
                            }
                            .personal-base-job{
                                margin-left: 12px;
                                font-size: 18px;
                                white-space: nowrap;
                            }
                        }
                    }
                    .personal-sex-wrap {
                        font-size: 20px;
                    }
                    .personal-btn-box {
                        position: relative;
                        .personal-btn {
                            position: absolute;
                            bottom: 0;
                            right: 0;
                        }
                    }
                }
                
            }
        }

    }
</style>
