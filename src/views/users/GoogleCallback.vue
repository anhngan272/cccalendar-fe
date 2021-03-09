<template>
  <div class="row justify-content-center">
    <div class="col-md-6 pt-4" data-aos="fade-up">
      <h2>{{$t('login.signin_loading')}}</h2>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "GoogleAuthCallback",
  components: {},
  methods: {
    ...mapActions(["fetchGoogleCallback"]),
  },
  computed: {},
  created() {
    this.fetchGoogleCallback(window.location.search);
  },
};
</script>