<template>
  <p v-if="messageVisible">ceci est un message : {{leMessage}}</p>
</template>

<script>
export default {
    mounted() {
        this.$bus.$on('afficher-message', (leMessage) => {
            this.messageVisible = true;
            this.leMessage = leMessage;
            console.log('On va afficher le message');
        }),
        this.$bus.$on('masquer-message', (leMessage) => {
            this.messageVisible = false;
            console.log('On va masquer le message');
        })
    },
    data() {
        return {
            messageVisible: false,
            leMessage: '',
        }
    },
    name: 'Message'
}
</script>

<style scoped>
    p{
        color: red;
    }
</style>