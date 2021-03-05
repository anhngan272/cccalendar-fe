<template>
  <div class="row justify-content-center">
    <div class="col-md-6 pt-4" data-aos="fade-up">
      <!-- if user logged in -->
      <template v-if="user != null">
        <h3>{{ user.name }}</h3>
        <input type="button" @click="confirmLogout" value="Logout" />
      </template>
      <!-- else -->
      <router-link :to="{ name: 'GoogleLogin' }" v-else>Login</router-link>
    </div>
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