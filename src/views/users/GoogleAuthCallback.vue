<template>
  <div class="row justify-content-center">
    <div class="col-md-6 pt-4" data-aos="fade-up">
      <h2>Google Callback</h2>
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
    ...mapGetters({}),
  },
  created() {
    this.fetchGoogleCallback(this.$route.query);
  },
};
</script>