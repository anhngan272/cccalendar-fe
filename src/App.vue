<template>
  <div id="app">
    
    <Header />
    <!-- <div class="main">
      <router-view />
    </div> -->

    <!-- <Footer /> -->

    <a-layout id="components-layout-demo-top" class="layout">
    <!-- <a-layout-header>
      <Header/>
    </a-layout-header> -->
    <a-layout-content >
      <div :style="{ background: '#fff', padding: '24px', minHeight: '75vh',  }">
        <router-view />
      </div>
    </a-layout-content>
    <a-layout-footer style="text-align: center">
      <Footer/>
    </a-layout-footer>
  </a-layout>
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
#components-layout-demo-top .logo {
  width: 120px;
  height: fit-content;
  background-color: #fff;
  /* margin: 16px 24px 16px 0; */
  /* float: left; */
}
</style>