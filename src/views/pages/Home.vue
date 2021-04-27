<template>
  <div class="home-container">
    <h1 class="font-weight-bold">
      <span class="cccalendar">
        {{ $t("homepage.title.web_name") }}
      </span>
    </h1>
    <h4>
      <span class="">{{ $t("homepage.title.title") }}</span>
    </h4>
    <div class="site">
      <div class="container center">
        <div class="row">
          <div class="col-sm-6 col-md-4">
            <router-link :to="{ name: 'Calendar' }">
              <i class="myIcon fa fa-calendar"></i>
              <h4 class="">
                <strong>{{ $t("homepage.intro.calendar.title") }}</strong>
              </h4>
            </router-link>
            <p class="">
              {{ $t("homepage.intro.calendar.text") }}
            </p>
          </div>

          <div class="col-sm-6 col-md-4">
            <router-link :to="{ name: 'Diary' }">
              <i class="myIcon fa fa-clipboard"></i>
              <h4>
                <strong>{{ $t("homepage.intro.diary.title") }}</strong>
              </h4>
            </router-link>
            <p class="">
              {{ $t("homepage.intro.diary.text") }}
            </p>
          </div>

          <div class="col-sm-6 col-md-4">
            <router-link :to="{ name: 'Organizer' }">
              <i class="myIcon fa fa-edit"></i>
              <h4>
                <strong>{{ $t("homepage.intro.organizer.title") }}</strong>
              </h4>
            </router-link>
            <p class="">
              {{ $t("homepage.intro.organizer.text") }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Home",
  components: {},
  computed: {
    ...mapGetters({ user: "getCurrentUser" }),
    title() {
      return this.$i18n.t("Home");
    },
  },
  methods: {},
  created() {},
};
</script>

<style>
.home-container {
  font-family: Helvetica, Arial, sans-serif;
  text-align: center;
  color: #808080;
  position: relative;
  margin-top: 10%;
}

.cccalendar {
  background-image: linear-gradient(#1d2671, #c33764);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  /* background: linear-gradient(to right, #ef5350, #f48fb1, #7e57c2, #2196f3, #26c6da, #43a047, #eeff41, #f9a825, #ff5722);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent; */
}

.homeTitle {
  background-image: linear-gradient(to right, #c33764, #1d2671);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.myIcon {
  font-size: 32px;
  /* color: #9c47fc; */
  display: block;
  background: -webkit-linear-gradient(#1d2671, #c33764);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 10px 0 10px;
  font-size: 50px;
}

.myIcon:hover {
  background: gray;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.fa {
}
.heading-line {
  overflow: hidden;
  text-align: center;
}

.heading-line:before,
.heading-line:after {
  background-color: #808080;
  content: "";
  display: inline-block;
  height: 1px;
  position: relative;
  vertical-align: middle;
  width: 50%;
}

.heading-line:before {
  right: 0.5em;
  margin-left: -50%;
}

.heading-line:after {
  left: 0.5em;
  margin-right: -50%;
}

.center {
  text-align: center;
}

.site {
  background-color: #fff;
  padding-top: 10px;
  font-size: 17px;
  line-height: 22px;
  color: #808080;
  margin-top: 50px;
  width: 100%;
}

h4 {
  font-size: 25px;
}

h6 {
  margin-top: 5px;
  letter-spacing: 1px;
}
</style>