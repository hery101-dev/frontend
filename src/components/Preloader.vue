<!-- Preloader.vue -->
<template>
  <div class="preloader" v-if="this.loading">
    <i class="fas fa-circle-notch fa-spin"></i>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
    };
  },
  watch: {
    $route(to, from) {
      this.loading = true;

      // Simulation d'un chargement asynchrone
      setTimeout(() => {
        this.loading = false;
      }, 1000);
    },
  },
};
</script>

<style scoped>
.preloader {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(104, 102, 102, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999999;
}

.fa-circle-notch {
  font-size: 2em; /* Taille du cercle */
  color: #008080; /* Couleur du cercle */
}
</style>
