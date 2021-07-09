<template>
  <div>
    <a-card :title="$t('calendar_page.create_event')">
      <EventForm ref="eventForm"/>
    </a-card>
  </div>
</template>

<script>
import EventForm from "./EventForm.vue";
export default {
  name: "CardForm",
  methods: {
    onDateSelect(date){
       this.$refs.eventForm.onDateSelect(date)
      
    }
  },
  components: {
    EventForm,
  },
};
</script>

<style>
</style>