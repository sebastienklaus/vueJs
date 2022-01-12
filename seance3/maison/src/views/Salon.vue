<template>
  <div class="salon" :class="{'lumiere-allumee' : $store.state.lumieres.salon}">
    <h1>This is the salon</h1>
    <button @click="actionLumiere">Allumer/eteindre lumiere</button>
    <img src="../assets/salon.jpg" alt="Salon" width="500">
  </div>
</template>

<script>
export default ({
  methods : {
      actionLumiere(){
        this.$store.commit("setLumiere", "salon");
      }
  }
})
</script>

