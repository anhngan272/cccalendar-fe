<template>
  <div class="header-right">
    <!-- if user logged in -->
    <LangSwitch />
    <template v-if="user != null">
      <a :href="$router.resolve({ name: '' }).href">{{ user.name }}</a>

      <a-popconfirm
        :title="$t('login.signout_confirm')"
        placement="bottomRight"
        :ok-text="$t('calendar_page.event_form.ok_btn')"
        :cancel-text="$t('calendar_page.event_form.cancel_btn')"
        @confirm="logout"
      >
        <a href="#" id="btn-logout" role="button">{{ $t("login.signout") }}</a>
      </a-popconfirm>
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
    async logout() {
      // if (confirm("Logout?")) {
      this.logout();
      // }
    },
  },
  created() {},
};
</script>

<style scoped>
</style>