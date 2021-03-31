<template>
  <div class="calendarView">
    <div class="tabForm">
      <CardForm @addEvent="addEvent" />
    </div>
    <div class="calendar">
      <Calendar ref="calendarWrap" />
      <!-- {{event}} -->
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Calendar from "@/components/common/calendarView/Calendar";
import CardForm from "@/components/common/calendarView/CardForm";
export default {
  name: "CalendarView",
  methods: {
    addEvent() {
      // console.log(this.$refs.cal.$refs.calendar.getApi().prev())
      this.$refs.calendarWrap.$refs.calendar.getApi().addEvent({
        title: this.event.title,
        start: this.event.start,
        end: this.event.end,
        textColor: "#fff",
        backgroundColor: this.event.colorId,
        allDay: false,
      });
    },
  },
  data() {
    return {};
  },
  components: {
    Calendar,
    CardForm,
  },
  computed: {
    ...mapGetters({
      event: "getEvent",
    }),
  },
};
</script>

<style scoped>
.calendarView {
  /* clear: both; */
  /* margin-top: 200px; */
}
.calendar {
  width: 60%;
  float: left;
  height: 76vh;
  overflow-y: scroll;
}
.tabForm {
  width: 39%;
  float: right;
  /* border-left: 0.5px solid black; */
}
</style>