<template>
  <div>
    <a-card title="Add Event">
      <EventForm />
    </a-card>
  </div>
</template>

<script>
import EventForm from "./EventForm.vue";
export default {
  name: "CardForm",
  components: {
    EventForm,
  },
};
</script>

<style>
</style>