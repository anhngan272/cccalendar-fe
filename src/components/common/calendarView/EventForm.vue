<template>
  <a-form-model
    ref="ruleForm"
    labelAlign="left"
    :model="form"
    :rules="rules"
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
  >
    <a-form-model-item label="Title" prop="title">
      <a-input v-model="form.title" ref="title" />
    </a-form-model-item>
    <a-form-model-item label="Begin" required prop="date1">
      <a-date-picker
        inputReadOnly
        :allowClear="this.allowClear"
        v-model="form.date1"
        format="DD-MM-YYYY"
        @change="changeStartDate"
      />
      <a-time-picker
        inputReadOnly
        :allowClear="this.allowClear"
        v-model="form.time1"
        format="HH:mm"
        :default-value="moment('12:00', 'HH:mm')"
        @change="changeStartTime"
        style="margin-left: 15px"
      />
    </a-form-model-item>
    <a-form-model-item label="End" prop="date2">
      <a-date-picker
        inputReadOnly
        :allowClear="this.allowClear"
        v-model="form.date2"
        format="DD-MM-YYYY"
        :disabled-date="disabledDate"
      />
      <a-time-picker
        inputReadOnly
        :allowClear="this.allowClear"
        v-model="form.time2"
        format="HH:mm"
        style="margin-left: 15px"
        :disabledHours="disabledHours"
        :disabledMinutes="disabledMinutes"
      />
    </a-form-model-item>
    <a-form-model-item label="Attendees" prop="attendees">
      <AttendeePicker
        ref="attendeePicker"
        @attendeePicked="setAttendees"
        :attendeeSubmited="form.attendeeSubmited"
        @attendeeSubmited="setAttendeeSubmit"
      />
    </a-form-model-item>
    <a-form-model-item label="Tags" prop="tag">
      <TagPicker ref="tagPicker" :tags="form.tags" @tagsPicked="setTags" />
    </a-form-model-item>
    <a-form-model-item label="Description" prop="description">
      <a-input v-model="form.description" type="textarea" />
    </a-form-model-item>
    <a-form-model-item label="Theme" prop="colorId">
      <ThemePicker
        ref="colorPicker"
        :color="form.colorId"
        @colorPicked="setColor"
      />
    </a-form-model-item>
    <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
      <a-button type="primary" @click="onSubmit"> Create </a-button>
      <a-button type="danger" style="margin-left: 10px" @click="resetForm">
        Reset
      </a-button>
    </a-form-model-item>
    <code>{{ form }}</code>
  </a-form-model>
</template>
<script>
import { mapActions } from "vuex";
import moment from "moment";
// import DynamicItem from "./DynamicItem.vue";
import AttendeePicker from "./AttendeePicker.vue";
import ThemePicker from "./ThemePicker.vue";
import TagPicker from "./TagPicker.vue";
import { createEventId } from "@/store/modules/calendarEvent/";

export default {
  name: "EventForm",
  data() {
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
      other: "",
      allowClear: false,
      form: {
        title: "",
        date1: moment(new Date()).add(7, "hours"),
        date2: moment(new Date()).add(7, "hours"),
        time1: moment.utc("12:00", "HH:mm"),
        time2: moment.utc("13:00", "HH:mm"),
        start: null,
        end: null,
        description: "",
        attendees: [],
        tags: [],
        attendeeSubmited: Boolean,
        colorId: "#039BE5",
      },
      event: {
        title: "",
        start: null,
        end: null,
      },

      rules: {
        title: [
          {
            required: true,
            message: "Please input Event Title",
            trigger: "submit",
          },
        ],
      },
    };
  },
  components: {
    // DynamicItem,
    ThemePicker,
    TagPicker,
    AttendeePicker,
  },
  created() {},
  methods: {
    ...mapActions(["addEvent"]),
    moment,
    setTags(tags) {
      this.form = {
        ...this.form,
        tags: tags,
      };
    },
    setAttendeeSubmit(bool) {
      this.form = {
        ...this.form,
        attendeeSubmited: bool,
      };
    },
    setAttendees(attendees) {
      this.form = {
        ...this.form,
        attendees: attendees,
      };
    },
    setColor(color) {
      this.form = {
        ...this.form,
        colorId: color,
      };
    },
    timeFormat(type, value) {
      switch (type) {
        case "date":
          return value.toISOString().replace(/T.*$/, "");
        case "time":
          return value.toISOString().substring(11, 16);
      }
    },
    onSubmit() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid && this.form.attendeesSubmited) {
          this.form.start =
            this.timeFormat("date", this.form.date1) +
            " " +
            this.timeFormat("time", this.form.time1);
          this.form.end =
            this.timeFormat("date", this.form.date2) +
            " " +
            this.timeFormat("time", this.form.time2);

          //create event object
          var event = {
            id: createEventId(),
            title: this.form.title,
            start: this.form.start,
            end: this.form.end,
            description: this.form.description,
            backgroundColor: this.form.colorId,
            textColor: "#fff",
            allDay: false,
            attendees: [],
          };
          // console.log(event);

          //call vuex store action to add event
          this.addEvent(event);

          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    disabledDate(current) {
      // Can not select days before today and today
      return current && current < this.form.date1;
    },
    disabledHours() {
      var i;
      var hours = [];

      for (i = 0; i < this.form.time1.hour(); i++) {
        hours.push(i);
      }
      return hours;
    },
    disabledMinutes(hour) {
      var j;
      var minutes = [];

      if (hour == this.form.time1.hour()) {
        for (j = 0; j <= this.form.time1.minute(); j++) {
          minutes.push(j);
        }
      }
      return minutes;
    },
    resetForm() {
      this.$refs.ruleForm.resetFields();
      this.$refs.attendeePicker.resetForm();
      this.$refs.tagPicker.resetForm();
      this.$refs.colorPicker.resetForm();
      this.form.time1 = moment.utc("12:00", "HH:mm");
      this.form.time2 = moment.utc("13:00", "HH:mm");
      this.colorId = "#039BE5";
    },
    onChange(dates, dateStrings) {
      console.log("From: ", dates[0], ", to: ", dates[1]);
      console.log("From: ", dateStrings[0], ", to: ", dateStrings[1]);
      this.form.start = dateStrings[0];
      this.form.end = dateStrings[1];
    },
    changeStartDate(value) {
      if (this.form.date2.date() < value.date()) {
        this.form.date2 = value;
      }
    },
    changeStartTime() {
      const hour = this.form.time1.hour();
      if (this.form.time1.hour() > this.form.time2.hour()) {
        this.form.time2 = moment(hour + 1, "HH:mm");
      }
    },
  },
};
</script>

<style scoped>
>>> .ant-form-item {
  margin-bottom: 10px;
}
</style>