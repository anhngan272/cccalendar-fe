<template>
  <div class="calendarView">
    <div class="tabForm">
      <CardForm />
    </div>
    <div class="calendar">
      <Calendar ref="calendarWrap" />
    </div>
  </div>
</template>

<script>
import Calendar from "@/components/common/calendarView/Calendar";
import CardForm from "@/components/common/calendarView/CardForm";
export default {
  name: "CalendarView",
  methods: {},
  data() {
    return {};
  },
  components: {
    Calendar,
    CardForm,
  },
  computed: {},
};
</script>

<style scoped>
.calendarView {
}
.calendar {
  width: 67%;
  float: left;
  height: 76vh;
  overflow-y: scroll;
}
.tabForm {
  width: 32%;
  float: right;
}
</style>