<template>
  <div class="home-container">
    <h2 class="">{{$t('homepage.title.web_name')}}</h2>
    <h4>{{$t('homepage.title.title')}}</h4>
    <div class="site">
      <div class="container center">
        <div class="row">
          <div class="col-sm-6 col-md-4">
            <a :href="$router.resolve({ name: 'CalendarView' }).href">
            <i class="fa fa-calendar"></i>
            <h4 class=""><i>{{$t('homepage.intro.calendar.title')}}</i></h4>
            </a>
            <p class="">
              {{$t('homepage.intro.calendar.text')}}
            </p>
          </div>

          <div class="col-sm-6 col-md-4">
            <i class="fa fa-clipboard"></i>
            <h4><i>{{$t('homepage.intro.note.title')}}</i></h4>
            <p class="">
              {{$t('homepage.intro.note.text')}}
            </p>
          </div>

          <div class="col-sm-6 col-md-4">
            <i class="fa fa-cogs"></i>
            <h4><i>{{$t('homepage.intro.organizer.title')}}</i></h4>
            <p class="">
              {{$t('homepage.intro.organizer.text')}}
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
  },
  created() {},
};
</script>

<style >
.home-container {
  font-family: Helvetica, Arial, sans-serif;
  text-align: center;
  color: #808080;
  position: relative;
  margin-top: 10%;
}

.fa {
  margin: 10px 0 10px;
  font-size: 50px;
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