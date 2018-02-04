<template>
    <header class="xp-navbar xp-block-layout" :class="{'xp-margin-bottom': marginBottom}" :style="style">
        <div class="xp-navbar-center-box">
            <div class="xp-navbar-center">
        <span>
          简书
        </span>
            </div>
        </div>
    </header>
</template>
<script>
    export default {
        props: {
            marginBottom: {
                type: Boolean,
                default: false
            }
        },
        data () {
            return {
                style: {
                    color: '#e45e46'
                }
            }
        }
    }
</script>
<style lang="less" scoped>
    .xp-navbar {

    .xp-navbar-center-box {
        text-align: center;
        margin: 0 auto;
        width: 50%;
        height: 1rem;
        font-size: 0.55rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;

    .xp-navbar-center {
        display: flex;
        justify-content: center;
        height: inherit;
        align-items: center;
    }

    }
    }
</style>
