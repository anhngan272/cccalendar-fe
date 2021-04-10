<template>
  <div>
    <a-card :title="$t('calendar_page.create_event')">
      <EventForm />
    </a-card>
  </div>
</template>

<script>
import EventForm from "./EventForm.vue";
export default {
  name: "CardForm",
  methods: {},
  components: {
    EventForm,
  },
};
</script>

<style>
</style>