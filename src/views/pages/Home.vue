<template>
  <div class="home-container">
    <!-- <ul>
      <li>
        <a href="#"><i class="fa fa-calendar" aria-hidden="true"></i></a>
      </li>
      <li>
        <a href="#"><i class="fa fa-clipboard" aria-hidden="true"></i></a>
      </li>
      <li>
        <a href="#"><i class="fa fa-edit" aria-hidden="true"></i></a>
      </li>
    </ul> -->

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
              <ul>
                <li class="calendarIcon">
                  <span class="calendarIcon"
                    ><i class="fa fa-calendar" aria-hidden="true"></i
                  ></span>
                </li>
              </ul>
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
              <ul>
                <li class="diaryIcon">
                  <span class="diaryIcon"
                    ><i class="fa fa-clipboard" aria-hidden="true"></i
                  ></span>
                </li>
              </ul>
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
              <ul>
                <li class="organizerIcon">
                  <span class="organizerIcon"
                    ><i class="fa fa-edit" aria-hidden="true"></i
                  ></span>
                </li>
              </ul>
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

<style scoped>
.home-container {
  /* font-family: Helvetica, Arial, sans-serif; */
  font-family: 'Fira Sans';
  text-align: center;
  color: #808080;
  position: relative;
  margin-top: 10%;
}

.cccalendar {
  /* background-image: linear-gradient(#1d2671, #c33764); */
  background: linear-gradient(124deg, #ff2400, #e81d1d, #e8b71d, #1de840, #2b1de8,  #5d02ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
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

body {
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

ul {
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
}

ul li {
  position: relative;
  list-style: none;
  width: 100px;
  height: 100px;
  margin: 0px 10px;
  border-radius: 50%;
  box-sizing: border-box;
}

ul li:before,
ul li:after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #000;
  border-radius: 50%;
  filter: blur(20px);
  opacity: 0;
  transition: 0.35s;
  z-index: -1;
}

ul li:after {
  filter: blur(40px);
}

ul li:hover:before,
ul li:hover:after {
  opacity: 1;
  z-index: 2;
}

ul li span {
  display: flex;
  align-items: center;
  position: absolute;
  top: 10px;
  left: 10px;
  right: 10px;
  bottom: 10px;
  justify-content: center;
  text-align: center;
  line-height: 100px;
  color: white;
  background: black;
  font-size: 36px;
  border-radius: 50%;
  text-decoration: none;
  transform: scale(1.2);
  z-index: 3;
}

ul li .calendarIcon,
ul .calendarIcon:before,
ul .calendarIcon:after {
  background: linear-gradient(45deg, #ff0057, #e64a19);
}

ul li .diaryIcon,
ul .diaryIcon:before,
ul .diaryIcon:after {
  background: linear-gradient(45deg, #89ff00, #00bcd4);
}

ul li .organizerIcon,
ul .organizerIcon:before,
ul .organizerIcon:after {
  background: linear-gradient(45deg, #e91e63, #5d02ff);
}
</style>