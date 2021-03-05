<template>
  <div class="row justify-content-center">
    <div class="col-md-8">
      <div class="card">
        <div class="card-header text-center font-weight-bold">SIGN-IN</div>
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
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
              />
              Sign in with Google
            </a>
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
    }),
  },
  created() {
    this.fetchLoginUrl();
  },
};
</script>

<style scoped>
</style>