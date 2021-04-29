<template>
  <div class="header-right">
    <LangSwitch />
    <!-- if user logged in -->
    <template v-if="user != null">
      <a-dropdown placement="bottomCenter" :trigger="['click', 'hover']">
        <template slot="overlay">
          <div class="dropdown-content">
            <div><i class="fa fa-sign-out"></i>{{ $t("login.signout") }}</div>
          </div>
        </template>
        <a class="ant-dropdown-link">
          <img class="avatar" :src="user.avatar" alt="" />
          {{ user.name }}
          <a-icon type="down" />
        </a>
      </a-dropdown>

      <!-- <a>{{ user.name }}</a> -->
      <!-- <a href="">{{user.avatar}}</a> -->
      <!-- {{avatar}} -->
      <!-- <img class="avatar" :src="user.avatar" /> -->

      <!-- <a-popconfirm
        :title="$t('login.signout_confirm')"
        placement="bottomRight"
        :ok-text="$t('calendar_page.event_form.ok_btn')"
        :cancel-text="$t('calendar_page.event_form.cancel_btn')"
        @confirm="logout"
      >
        <a id="btn-logout" role="button">{{ $t("login.signout") }}</a>
      </a-popconfirm> -->
    </template>
    <!-- else -->
    <router-link :to="{ name: 'GoogleLogin' }" v-else>{{
      $t("login.signin")
    }}</router-link>
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
    performLogout() {
      this.logout();
    },
  },
  created() {},
};
</script>

<style scoped>
.avatar {
  width: 35px;
  margin-right: 5px;
  border-radius: 50%;
}

.fa {
  font-size: 17px;
  margin-right: 5px;
}

.dropBtn {
  display: flex;
  align-items: center;
  font-weight: bold;
  font-size: 15px;
  border: 1 px solid #808080;
}

.dropdown-content {
  width: 100%;
  z-index: 3;
  font-weight: bold;
  line-height: 25px;
  font-size: 15px;
  color: #808080;
  background: white;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
}

.dropdown-content div {
  padding: 5px;
  text-decoration: none;
  justify-content: center;
  align-items: center;
  display: flex;
  cursor: pointer;
}

.dropdown-content div:hover {
  background-color: #ddd;
  color: black;
}
</style>