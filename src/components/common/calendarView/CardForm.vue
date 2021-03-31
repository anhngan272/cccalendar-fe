<template>
  <div>
    <a-card title="Add Event">
      <EventForm @addEvent="addEvent" />
    </a-card>
  </div>
</template>

<script>
import EventForm from "./EventForm.vue";
export default {
  name: "CardForm",
  methods: {
    addEvent() {
      this.$emit("addEvent");
    },
  },
  components: {
    EventForm,
  },
};
</script>

<style>
</style>