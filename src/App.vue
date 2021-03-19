<template>
  <div id="app">
    <Header />
    <main class="">
      <router-view />
    </main>
    <Footer />
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
a {
  outline: none;
}
</style>