<template>
  <span v-if="icon" :class="icon"></span>
</template>
<script>
  export default {
    props: {
      icon: {
        type: String
      }
    }
  }
</script>
