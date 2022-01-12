<template>
  <div class="home">
    
    <div>
      <router-link to="/grenier">Aller dans le grenier</router-link>
    </div>
    <div>
      <router-link to="/chambre">Aller dans la chambre</router-link>
    </div>
    <div>
      <router-link to="/cuisine">Aller dans la cuisine</router-link>
    </div>
    <div>
      <router-link to="/salon">Aller dans le salon</router-link>
    </div>
    <p>Il y a un lapin caché dans cette maison</p>
    <p>Le lapin est dans la pièce : {{$store.state.ouEstLeLapin}}</p>
    <button @click="actionLumiereChambre">
      <template v-if="$store.state.lumieres.chambre">Eteindre lumiere chambre</template>
      <template v-else>Allumer lumiere chambre</template>
    </button>

    <button @click="actionLumiereSalon">
      <template v-if="$store.state.lumieres.salon">Eteindre lumiere salon</template>
      <template v-else>Allumer lumiere salon</template>
    </button>

  </div>

</template>

<script>

export default ({
  methods : {
      actionLumiereChambre(){
        this.$store.commit("setLumiere", "chambre");
      },
      actionLumiereSalon(){
        this.$store.commit("setLumiere", "salon");
      },
  }
})
</script>
