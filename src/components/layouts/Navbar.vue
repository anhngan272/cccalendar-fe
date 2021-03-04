<template>
  <div class="header-right">
    <!-- if user logged in -->
    <div v-if="user != null">
      <h3>{{ user.name }}</h3>
      <input type="button" @click="confirmLogout" value="LOGOUT" />
    </div>
    <!-- else -->
    <router-link :to="{ name: 'GoogleLogin' }" v-else>SIGN IN</router-link>
    <router-link to="/about">ABOUT</router-link>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Navbar",
  components: {},
  computed: {
    ...mapGetters({ user: "getCurrentUser" }),
  },
  methods: {
    ...mapActions(["logout"]),
    async confirmLogout() {
      if (confirm("Logout?")) {
        this.logout();
      }
    },
  },
  created() {},
};
</script>