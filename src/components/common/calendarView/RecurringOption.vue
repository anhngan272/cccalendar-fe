<template>
  <a-modal
    title="Option"
    v-model="optionModal"
    @ok="handleOptionOk"
    @cancel="handleOptionCancel"
  >
    <a-radio-group v-model="recurringOption">
      <a-radio class="recurringOption" value="this"> This event </a-radio>
      <a-radio class="recurringOption" value="fromThis">
        From this event
      </a-radio>
      <a-radio class="recurringOption" value="all"> All event </a-radio>
    </a-radio-group>
  </a-modal>
</template>

<script>
export default {
  name: "RecurringOption",
  data() {
    return {
      optionModal: false,
      recurringOption: "this",
    };
  },
  methods: {
    handleOptionCancel() {
      this.$emit("cancel");
      this.optionModal = false;
    },
    handleOptionOk() {
      //   console.log("ok");
      //   if (this.currentEvent.recurringOption == "this") {
      //     this.eventChange(this.currentEvent.data);
      //   }
      this.$emit("ok", this.recurringOption);
      this.optionModal = false;
    },
    onOptionChange(e) {
      console.log("radio checked", e.target.value);
    },
  },
};
</script>

<style scoped>
.recurringOption {
  display: block;
  height: 30px;
  line-height: 30px;
  margin: 2px;
}
</style>