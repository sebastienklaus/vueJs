<template>
  <div class="salon" :class="{'lumiere-allumee' : $store.state.lumieres.chambre}">
    <h1>This is the bedroom</h1>
    <button @click="actionLumiere">fedefd</button>
    <img src="../assets/bedroom.jpg" alt="Bedroom" width="500">
  <div>
    <router-link to="/grenier">Aller dans le grenier</router-link>
  </div>
  </div>
</template>

<script>

export default ({
  mounted(){
    // this.$bus.$on('alummer-lumiere-chambre', this.actionLumiere)
  },
  methods : {
      actionLumiere(){
        console.log('Allumer ou éteindre la lumière de la chambre');
        this.$store.commit("setLumiere", "chambre");
      }
  }
})
</script>

