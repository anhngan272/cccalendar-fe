<template>
  <a-form :form="form">
    <a-form-item :validate-status="status" :help="help">
      <a-select
        mode="tags"
        style="width: 100%"
        :placeholder="$t('calendar_page.event_form.select_attendees')"
        @change="handleChange"
        v-decorator="['attendee']"
        :disabled="!isCreator"
      >
      </a-select>
    </a-form-item>
  </a-form>
</template>
<script>
export default {
  name: "AttendeePicker",
  props: {
    eventAttendees: Array,
    isCreator: Boolean,
  },
  data() {
    return {
      isEmail: false,
      isEmpty: true,
      status: "",
      help: "",
    };
  },
  created() {
    //set event attendees
    this.form.setFieldsValue({ attendee: this.eventAttendees });
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "attendeePicker" });
    this.form.getFieldDecorator("attendee", {
      initialValue: [],
      preserve: true,
    });
  },
  methods: {
    resetForm() {
      this.isEmpty = true;
      this.status = "";
      this.help = "";
      this.form.resetFields();
      this.$emit("attendeeSubmited", true);
    },
    handleChange(values) {
      var emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (values.length == 0) {
        this.isEmpty = true;
        // this.$emit("attendeeSubmited", true);
        this.status = "";
        this.help = "";
      } else {
        this.isEmpty = false;
        for (let i = 0; i < values.length; i++) {
          if (!emailPattern.test(values[i])) {
            this.status = "error";
            this.help =
              '"' +
              values[i] +
              '"' +
              this.$i18n.t("calendar_page.event_form.attendees_help");
            this.$emit("attendeeSubmited", false);
            return;
          } else {
            this.status = "";
            this.help = "";
          }
        }
      }
      this.$emit("attendeePicked", values);
      this.$emit("attendeeSubmited", true);
    },
  },
};
</script>
