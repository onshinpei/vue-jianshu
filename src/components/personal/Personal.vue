<template>
    <div class="personal">
        <div class="personal-header">
            <div class="common-card">
                <div class="personal-cover" :class="{active: isHoverShow}">
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
                <div>
                    <Button type="primary" @click="uploadChange">上传</Button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
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
                let resData = await requestPost('http://localhost:3000/users/uploadCover', param, config);
                if (resData.success) {
                    this.imgUrl = `url(http://localhost:3000${resData.data.imageUrl})`;
                    this.$Message.success(resData.message)
                } else {
                    this.$Message.error(resData.message)
                }
            }
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

    }
</style>
