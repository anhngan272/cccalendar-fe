<template>
  <div class="sign-in-btn">
    <a
      :href="loginUrl"
      class="btn btn-outline-dark"
      role="button"
      style="text-transform: none"
    >
      <img
        width="20px"
        style="margin-bottom: 3px; margin-right: 5px"
        alt="Google sign-in"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
      />
      Login with Google
    </a>
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

<style scoped>
.sign-in-btn {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  padding: 10px;
}
</style>