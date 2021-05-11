<template>
  <div id="app">
    <!-- <Header />
    <a-layout id="components-layout-demo-top" class="layout">
      <a-layout-content :style="{ background: '#fff' }">
        <div :style="{ padding: '5px 24px', minHeight: '78vh' }">
          <router-view />
        </div>
      </a-layout-content>
      <a-layout-footer style="text-align: center; background: #fff">
        <Footer />
      </a-layout-footer>
    </a-layout> -->

    <div class="header">
      <Header />
    </div>
    <div class="body">
      <router-view />
    </div>
    <div class="footer">
      <Footer />
    </div>
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

<style>
body {
  font-family: "Fira Sans" !important;
}

.body {
  padding: 5px 24px;
  min-height: 80vh;
}

.footer {
  text-align: center;
  background: #fff;
  padding: 20px 0 10px;
}

#components-layout-demo-top .logo {
  width: 120px;
  height: fit-content;
  background-color: #fff;
  /* margin: 16px 24px 16px 0; */
  /* float: left; */
}
.body .fc-icon {
  font-family: "FontAwesome" !important;
}

.fc-button-primary {
  background-color: #1890ff !important;
  border-color: #1890ff !important;
}

.fc-button-primary:hover,
.fc-button-primary:focus {
  background-color: #007bff !important;
  box-shadow: none !important;
}

.fc-day-today {
  background: #d1dfff !important;
  font-weight: bold;
}
</style>