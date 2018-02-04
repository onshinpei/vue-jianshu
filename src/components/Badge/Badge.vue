<template>
    <a class="xp-badge" :class="modClass" :style="styles" :href="href">
        <slot></slot>
    </a>
</template>
<script>
    export default {
        name: 'xp-badge',
        props: {
            href: String,
            type: {
                validator (value) {
                    return ['primary', 'danger', 'warning', 'hollow'].indexOf(value) > -1
                }
            },
            color: {
                type: String
            },
            bgColor: {
                type: String
            }
        },
        computed: {
            styles () {
                return {
                    backgroundColor: this.bgColor,
                    color: this.color,
                    borderColor: this.color
                }
            },
            modClass () {
                if (this.bgColor) {
                    return
                }
                return this.type ? 'xp-badge' + this.type : ''
            }
        }
    }
</script>
<style lang="less">
    .xp-badge {
        border-radius: 3px;
        padding: 3px 6px;
        color: #fff;
        display: inline-block;
        line-height: 1;
        white-space: nowrap;
        background-color: transparent;
        border: 1px solid transparent;
    }
</style>
