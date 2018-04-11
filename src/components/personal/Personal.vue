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
                    <div class="personal-main">
                        <div class="personal-avatar-wrap">
                            <div class="personal-avatar">
                                <img src="http://localhost:3000/avatar/default.jpg" class="personal-avatar-img" width=160 height=160>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
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
        .common-card {
            background-color: #fff;
            overflow: hidden;
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
            .personal-main {
                position: relative;
                margin: 0 20px 24px;
                .personal-avatar-wrap {
                    position: absolute;
                    z-index: 3;
                    top: -74px;
                    left: 0
                }
                .personal-avatar {
                    display: inline-block;
                    overflow: hidden;
                    vertical-align: top;
                    background-color: #fff;
                    border: 4px solid #fff;
                    border-radius: 8px;
                }
            }
        }

    }
</style>
