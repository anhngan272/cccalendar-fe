<template>
  <div class="header-right">
    <!-- if user logged in -->
    <LangSwitch />
    <template v-if="user != null">
      <a :href="$router.resolve({ name: '' }).href">{{ user.name }}</a>
      <a href="#" id="btn-logout" role="button" @click="confirmLogout">{{
        $t("login.signout")
      }}</a>
    </template>
    <!-- else -->
    <a :href="$router.resolve({ name: 'GoogleLogin' }).href" v-else>{{
      $t("login.signin")
    }}</a>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import LangSwitch from "../common/LangSwitch";

export default {
  name: "Navbar",
  components: {
    LangSwitch,
  },
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

<style scoped>
</style>