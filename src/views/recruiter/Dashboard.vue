<template>
  <Sidebar />
  <router-view />
</template>

<script>
import Sidebar from "./Sidebar.vue";

export default {
  name: "Home",
  components: { Sidebar },
};
</script>

<style scoped></style>
