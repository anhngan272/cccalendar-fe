<template>
  <div>
    <div class="header">
      <router-link to="/" id="logo">LOGO</router-link>
      
      <Navbar />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Navbar from "@/components/layouts/Navbar";

export default {
  name: "Header",
  components: {
    Navbar,
  },
  computed: {
    ...mapGetters({ user: "getCurrentUser" }),
  },
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
}

.header {
  overflow: hidden;
  background-color: #fff;
  padding: 5px 10px;
}

.header a {
  float: left;
  color: #808080;
  text-align: center;
  padding: 12px;
  text-decoration: none;
  letter-spacing: 1px;
  font-weight: bold;
  font-size: 15px;
  line-height: 25px;
  border-radius: 4px;
  margin-left: 10px;
}

.header a:hover {
  background-color: #ddd;
  color: black;
}

.router-link-exact-active:not(#logo) {
  color: black !important;
}

.header-right {
  float: right;
}

@media screen and (max-width: 500px) {
  .header a {
    float: none;
    display: block;
    text-align: left;
  }

  .header-right {
    float: none;
  }
}
</style>