<template>
  <div class="header-right">
    <!-- if user logged in -->
      
    <template v-if="user != null">
      <!-- <router-link to="#">{{ user.name }}</router-link> -->
      <a :href="$router.resolve({name:''}).href" >{{ user.name }}</a>
      <a href="#" id="btn-logout" role="button" @click="confirmLogout">{{ $t('login.signout') }}</a>
    </template>
    <!-- else -->

    <!-- <router-link :to="{ name: 'GoogleLogin' }" v-else>{{ $t('login.signin') }}</router-link> -->
    <a :href="$router.resolve({name:'GoogleLogin'}).href" >{{ $t('login.signin') }}</a>
    
    <!-- <router-link to="/about">ABOUT</router-link> -->
<LangSwitch/>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import LangSwitch from '../common/LangSwitch'

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