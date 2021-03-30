<template>
  <a-form-model
    ref="ruleForm"
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
        prop="time1"
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
      <DynamicItem
        ref="getAttendees"
        :item="form.attendees"
        :submit="form.attendeesSubmited"
        @attendeesPicked="setAttendees"
        @attendeesSubmit="setAttendeesSubmit"
      />
    </a-form-model-item>
    <a-form-model-item label="Description" prop="description">
      <a-input v-model="form.description" type="textarea" />
    </a-form-model-item>
    <a-form-model-item label="Theme" prop="colorId">
      <ThemeColor :color="form.colorId" @colorPicked="setColor" />
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
import moment from "moment";
import DynamicItem from "./DynamicItem.vue";
import ThemeColor from "./ThemeColor.vue";

export default {
  name: "EventForm",
  data() {
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 15 },
      other: "",
      allowClear: false,
      form: {
        title: "",
        date1: moment(new Date()),
        date2: moment(new Date()),
        time1: moment("12:00", "HH:mm"),
        time2: moment("13:00", "HH:mm"),
        description: "",
        attendees: [],
        attendeesSubmited: Boolean,
        colorId: "#ff3e30",
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
    DynamicItem,
    ThemeColor,
  },
  created() {},
  methods: {
    moment,
    setAttendeesSubmit(bool) {
      this.form = {
        ...this.form,
        attendeesSubmited: bool,
      };
    },
    setAttendees(items) {
      this.form = {
        ...this.form,
        attendees: items,
      };
    },
    setColor(color) {
      this.form = {
        ...this.form,
        colorId: color,
      };
    },
    onSubmit() {
      this.$refs.getAttendees.onSubmitItem();

      this.$refs.ruleForm.validate((valid) => {
        if (valid && this.form.attendeesSubmited) {
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
      this.$refs.getAttendees.resetForm();
      this.form.time1 = moment("12:00", "HH:mm");
      this.form.time2 = moment("13:00", "HH:mm");
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
      // console.log(value.toISOString().replace(/T.*$/, ''))
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