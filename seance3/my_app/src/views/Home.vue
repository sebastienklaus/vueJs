<template>
  <div class="home">
    <Message/>
    <button @click="afficherMessage('Bjr')">Afficher le message</button>
    <button @click="afficherMessage('Hi')">Afficher le message</button>
    <button @click="afficherMessage('Slt')">Afficher le message</button>
    <button @click="masquerMessage()">Masquer le message</button>
    <div v-for="produit in $store.state.produits" :key="produit.id">
      <p>{{produit.nom}}</p>
    </div>
  </div>
</template>

<script>
import Message from "@/components/Message.vue";

  export default {
    name: 'Home',
    mounted() {
      console.log('le composant Home est affiché');
      console.log(this.$store.state.produits);
    },
    data() {
      return {
        texte : 'un peu de texte',
        personnes: [
          'Georges', 'Paul', 'John', 'Roger'
        ],
      }
    },
    methods : {
      afficherMessage(msg){
        this.$bus.$emit('afficher-message', msg);
      },
      masquerMessage(){
        this.$bus.$emit('masquer-message');
      },
    },
    components: {
      Message
    }
  }
</script>
