<template>
  <div class="row justify-content-center">
    <div class="col-md-6 pt-4" data-aos="fade-up">
      <h2 class="text-white mb-4">Home</h2>
      <h3 v-if="user != null">{{ user.name }}</h3>
      <router-link :to="{ name: 'GoogleLogin' }" v-else>Login</router-link>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Home",
  components: {},
  methods: {
    // ...mapActions(["fetchGoogleCallback"]),
  },
  computed: {
    ...mapGetters({ user: "getCurrentUser" }),
  },
  created() {
    console.log(this.user);
  },
};
</script>