<template>
  <div class="header-right">
    <!-- if user logged in -->
    <template v-if="user != null">
      <router-link to="#">{{ user.name }}</router-link>
      <a href="#" id="btn-logout" role="button" @click="confirmLogout">SIGN OUT</a>
    </template>
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