<template>
  <div id="app">
    <main class="main-content">
      <Header />

      <router-view />

      <Footer />
    </main>
  </div>
</template>

<script>
import Footer from "./components/layouts/Footer.vue";
import Header from "./components/layouts/Header.vue";

export default {
  name: "app",
  components: {
    Footer,
    Header,
  },
};
</script>

<style scoped>
.main-content {
  /* position: relative;
  min-height: 100vh; */
}
a {
  outline: none;
}
</style>