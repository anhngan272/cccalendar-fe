<template>
  <div class="row justify-content-center">
    <div class="col-md-6 pt-4" data-aos="fade-up">
      <h2>Google Callback</h2>
      <!-- <h3>{{ user.name }}</h3> -->
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "GoogleAuthCallback",
  components: {},
  methods: {
    ...mapActions(["fetchGoogleCallback"]),
  },
  computed: {
    ...mapGetters({ user: "getUser" }),
  },
  created() {
    this.fetchGoogleCallback(window.location.search);
  },
};
</script>