<template>
  <a-modal
    :destroyOnClose="true"
    width="35vw"
    v-model="updateModal"
    title="Update Event"
    @ok="handleOk"
  >
    <EventForm
      ref="updateEventForm"
      :isUpdate="true"
      :updateEventModalExtend="updateEventModalExtend"
      :updateEventInfo="updateEvent"
      @updated="handleUpdated"
      :eventTags="updateEventModalExtend.tags"
      :eventAttendees="updateEventModalExtend.attendees"
    />
  </a-modal>
</template>

<script>
import EventForm from "./EventForm";
export default {
  name: "UpdateEventModal",
  props: {
    updateEventModalExtend: Object,
    updateEvent: Object,
  },
  data() {
    return {
      updateModal: false,
    };
  },
  components: {
    EventForm,
  },
  methods: {
    handleOk() {
      this.updateModal = false;
    },
    handleUpdated() {
      this.updateModal = false;
      this.$emit("updated");
    },
  },
};
</script>

<style>
</style>