<template>
  <div class="wrapper">
    <a-tabs default-active-key="1">
      <a-tab-pane key="1" :tab="$t('message.hello')">
        <EventForm />
      </a-tab-pane>
      <a-tab-pane key="2" tab="Todo" force-render>
        <TodoForm />
      </a-tab-pane>
      <a-tab-pane key="3" tab="Reminder">
        <ReminderForm />
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import EventForm from "./EventForm.vue";
import TodoForm from "./TodoForm.vue";
import ReminderForm from "./ReminderForm.vue";
export default {
  name: "TabForm",
  data() {
    return {
      value: '`$t("message.value")`',
    };
  },
  components: {
    EventForm,
    TodoForm,
    ReminderForm,
  },
  mounted() {},
  methods: {
    callback(key) {
      console.log(key);
    },
  },
};
</script>

<style scoped>
/* font-family: Arial; */
/* Style the tab */
.wrapper {
  /* border: 0.5px solid black; */
}
</style>