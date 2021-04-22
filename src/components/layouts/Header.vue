<template>
  <div>
    <div class="head">
      <a @click="navigate('Home')"
        ><img src="@/assets/cccalendar_logo.png" style="height: 30px"
      /></a>
      <a @click="navigate('Calendar')"> {{ $t("calendar_page.title") }}</a>
      <a @click="navigate('Diary')"> {{ $t("diary_page.title") }}</a>
      <a @click="navigate('Organizer')">{{ $t("organizer_page.title") }}</a>
      <Navbar />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Navbar from "@/components/layouts/Navbar";
export default {
  name: "Header",
  components: {
    Navbar,
  },
  computed: {
    ...mapGetters({ user: "getCurrentUser" }),
  },
  methods: {
    navigate(name) {
      this.$router
        .push({ name: name, params: { haha: new Date().getUTCMilliseconds() } })
        .catch((err) => err);
    },
  },
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}

>>> body {
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
}

>>> .head {
  padding: 5px;
  background: #fff;
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 0px;
}
>>> .head a {
  vertical-align: middle;
  text-align: center;
  padding: 15px;
  color: #808080;
  text-decoration: none;
  letter-spacing: 1px;
  font-weight: bold;
  font-size: 15px;
  line-height: 25px;
  border-radius: 4px;
  margin-left: 10px;
}

>>> .head a:hover {
  background-color: #ddd;
  color: black;
}

>>> .header-right {
  margin-left: auto;
  display: flex;
  align-items: center;
}

>>> .router-link-exact-active:not(#logo) {
  color: black !important;
}
</style>