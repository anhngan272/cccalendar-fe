<template>
  <div class="row justify-content-center">
    <div class="col-md-6 pt-4" data-aos="fade-up">
      <a :href="loginUrl"><button>Signin with Google</button></a>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "GoogleAuth",
  components: {},
  methods: {
    ...mapActions(["fetchLoginUrl"]),
  },
  computed: {
    ...mapGetters({
      loginUrl: "getLoginUrl",
    }),
  },
  created() {
    this.fetchLoginUrl();
  },
};
</script>