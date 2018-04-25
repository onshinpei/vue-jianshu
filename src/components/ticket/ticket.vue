<template>
    <div><img v-if="imageSrc" :src="imageSrc" alt=""></div>
</template>
<script>
    import {requestPost, requestGet} from '@/common/js/request'

    export default {
        name: 'Ticket',
        data() {
            return {
                imageSrc: ''
            }
        },
        mounted() {
            requestGet('http://localhost:3000/ticket/captchaImage').then((response) => {
                this.imageSrc = 'data:image/jpeg;base64,' + response
            })
        }
    }
</script>
