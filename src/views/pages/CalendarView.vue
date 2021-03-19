<template>
  <div>
    <div class="tabForm">
      <TabForm />
    </div>
    <div class="calendar">
      <Calendar />
    </div>
  </div>
</template>

<script>
import TabForm from "@/components/common/TabForm";
import Calendar from "@/components/common/Calendar";
export default {
  name: "CalendarView",
  data() {
    return {};
  },
  components: {
    TabForm,
    Calendar,
  },
};
</script>

<style scoped>
.calendar {
  width: 60%;
  float: left;
}
.tabForm {
  width: 40%;
  float: right;
  border-left: 0.5px solid black;
}
</style>