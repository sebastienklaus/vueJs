<template>
  <div id="app" v-if="$store.state.produits.length>0">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
  export default {
    mounted() {
      console.log('le composant App est affiché');
      this.$axios.get('products').then((response) => {
        let produits = response.data;
        this.$store.commit('setProduits', produits);
      });
    },
  }
</script>


<style>

</style>
