<template>
  <div class="row justify-content-center">
    <div class="col-md-6 pt-4" data-aos="fade-up">
      <h2 class="text-white mb-4">Home</h2>
      <Navbar />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Navbar from "@/components/layouts/Navbar";

export default {
  name: "Home",
  components: {
    Navbar,
  },
  methods: {
    // ...mapActions(["fetchGoogleCallback"]),
  },
  computed: {
    ...mapGetters({ user: "getCurrentUser" }),
  },
  created() {},
};
</script>