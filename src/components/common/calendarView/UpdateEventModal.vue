<template>
  <a-modal
    :keyboard="false"
    :destroyOnClose="true"
    width="70vw"
    v-model="updateModal"
    :title="$t('calendar_page.event_form.edit_header')"
    @ok="handleOk"
    centered
    footer=""
    :maskClosable="false"
    :closable="false"
  >
    <EventForm
      ref="updateEventForm"
      :isUpdate="true"
      :updateEventModalExtend="updateEventModalExtend"
      :updateEventInfo="updateEvent"
      @updated="handleUpdated"
      @cancel="updateModal = false"
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