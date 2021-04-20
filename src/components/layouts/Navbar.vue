<template>
  <div class="header-right">
    <!-- if user logged in -->
    <LangSwitch />
    <template v-if="user != null">
      <a @click="navigate('')">{{ user.name }}</a>

      <a-popconfirm
        :title="$t('login.signout_confirm')"
        placement="bottomRight"
        :ok-text="$t('calendar_page.event_form.ok_btn')"
        :cancel-text="$t('calendar_page.event_form.cancel_btn')"
        @confirm="logout"
      >
        <a @click="navigate('Home')" id="btn-logout" role="button">{{
          $t("login.signout")
        }}</a>
      </a-popconfirm>
    </template>
    <!-- else -->
    <a @click="navigate('GoogleLogin')" v-else>{{ $t("login.signin") }}</a>
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
      this.logout();
    },
    navigate(name) {
      this.$router
        .push({ name: name, params: { haha: new Date().getUTCMilliseconds() } })
        .catch((err) => err);
    },
  },
  created() {},
};
</script>

<style scoped>
</style>