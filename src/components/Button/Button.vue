<template>
  <button class="wx-btn" :disabled="disabled" :class="modClass">
    <Icon v-if="icon" :icon="icon"></Icon>
    <slot></slot>
  </button>
</template>
<script>
  import Icon from '@/components/Icon/Icon'
  export default {
    components: {
      Icon
    },
    props: {
      icon: {
        type: String
      },
      disabled: {
        type: Boolean,
        default: false
      },
      buttonType: {
        validator (value) {
          return ['blank', 'primary', 'danger', 'warning', 'hollow', 'disabled'].indexOf(value) > -1
        },
        default: 'primary'
      },
      size: {
        validator (value) {
          return ['small', 'large'].indexOf(value) > -1
        },
        default: 'smanll'
      },
      shape: {
        validator (value) {
          return ['square', 'circle'].indexOf(value) > -1
        },
        default: 'square'
      }
    },
    data () {
      return {}
    },
    computed: {
      modClass () {
        let s = this.size === 'large' ? 'wx-btn-large' : 'wx-btn-small'
        let b = 'wx-btn-' + this.buttonType
        if (this.disabled) {
          b = 'wx-btn-disabled'
        }

        if (this.bgcolor) {
          b = ''
        }
        return s + ' ' + b + (this.shape === 'circle' ? ' wx-btn-circle' : '')
      }
    }
  }
</script>
<style lang="less">
.wx-btn {
  display: inline-block;
  box-sizing: content-box;
  white-space: nowrap;
  padding: 0 0.2rem;
  border: none;
}
.wx-btn-small {
  height: .6rem;
  font-size: .26rem;
}
.wx-btn-large {
  font-size: .36rem;
  height: 1rem;
}
.wx-btn-primary {
  background-color: #04be02;
  color: #fff;
}
</style>
