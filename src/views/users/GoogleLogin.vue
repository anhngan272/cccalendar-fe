<template>
  <div class="row justify-content-center">
    <div class="col-md-8">
      <div class="card">
        <div class="card-header text-center font-weight-bold">
          {{ $t("login.signin") }}
        </div>
        <div class="card-body">
          <div class="text-center">
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
                src="@/assets/GoogleLogo.png"
              />
              {{ $t("login.signin_google") }}
            </a>
            <p class="text-danger small mt-3" v-if="authError">
              {{ authError }}
            </p>
          </div>
        </div>
      </div>
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
      authError: "getAuthError",
    }),
  },
  created() {
    this.fetchLoginUrl();
  },
};
</script>

<style scoped>
body {
  background: pink;
}
</style>