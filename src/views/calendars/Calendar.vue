<template>
  <div class="calendarView row">
    <div class="tabForm col-lg-3 col-sm-6">
      <CardForm ref="cardForm"/>
    </div>
    <div class="calendar col-lg-9 col-sm-6">
      <Calendar @onDateSelect="onDateSelect" />
    </div>
  </div>
</template>

<script>
import Calendar from "@/components/common/calendarView/Calendar";
import CardForm from "@/components/common/calendarView/CardForm";
export default {
  name: "CalendarView",
  methods: {
    onDateSelect(date){
      this.$refs.cardForm.onDateSelect(date)
  
    }
  },
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

* {
  scrollbar-width: thin;
  scrollbar-color: #6da3e0 #f1f1f1;
}

/** For webkit support */
::-webkit-scrollbar {
  width: 5px;
  /* height: 5px; */
}
::-webkit-scrollbar-track {
  background: #f1f1f1;
}
/* Handle */
::-webkit-scrollbar-thumb {
  background: #c8dbf1;
  border-radius: 10px;
}
::-webkit-scrollbar-thumb:hover {
  background: #6da3e0;
}

.calendar {
  height: 80vh;
}
.tabForm {
  height: 80vh;
  overflow-y: scroll;
}
</style>