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
    <a-form-model-item label="Date" required prop="date1">
      <a-date-picker
        :allowClear="this.form.allowClear"
        v-model="form.date1"
        format="DD-MM-YYYY"
        @change="changeStartDate"
      />
      <a-date-picker
        :allowClear="this.form.allowClear"
        v-show="this.form.wholeDay"
        v-model="form.date2"
        format="DD-MM-YYYY"
        @change="changeEndDate"
        :disabled-date="disabledDate"
      />
      <div :wrapper-col="{ span: 28, offset: 4 }" v-show="!this.form.wholeDay">
        <a-time-picker
          :allowClear="this.form.allowClear"
          v-model="form.time1"
          format="HH:mm"
          :default-value="moment('12:00', 'HH:mm')"
          @change="changeStartTime"
        />
        <a-time-picker
          :allowClear="this.form.allowClear"
          v-model="form.time2"
          format="HH:mm"
          style="margin-left: 10px"
          :disabledHours="disabledHours"
          :disabledMinutes="disabledMinutes"
        />
      </div>
    </a-form-model-item>
    <a-form-model-item label="Whole Day" prop="wholeDay">
      <a-switch v-model="form.wholeDay" @change="isWholeDay" />
    </a-form-model-item>
    <a-form-model-item label="Attendees" prop="description">
      <DynamicItem
        ref="getAttendees"
        :item="form.attendees"
        :submit="form.attendeesSubmit"
        @attendeesPicked="setAttendees"
        @attendeesSubmit="attendeesSubmit"
      />
    </a-form-model-item>
    <a-form-model-item label="Description" prop="description">
      <a-input v-model="form.description" type="textarea" />
    </a-form-model-item>
    <a-form-model-item label="Theme" prop="description">
      <ThemeColor :color="form.colorId" @colorPicked="selectColor" />
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
      wrapperCol: { span: 14 },
      other: "",
      form: {
        title: "",
        // date1: undefined,
        date1: moment(new Date()),
        date2: moment(new Date()),
        time1: moment("12:00", "HH:mm"),
        time2: moment("13:00", "HH:mm"),
        description: "",
        wholeDay: false,
        attendees: [],
        attendeesSubmit: Boolean,
        colorId: "",
        allowClear: false,
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
  created() {
    // alert(moment(new Date()).format("DD/MM/YYYY"))
  },
  methods: {
    moment,
    attendeesSubmit(bool) {
      this.form = {
        ...this.form,
        attendeesSubmit: bool,
      };
    },
    setAttendees(items) {
      this.form = {
        ...this.form,
        attendees: items,
      };
    },
    selectColor(color) {
      this.form = {
        ...this.form,
        colorId: color,
      };
    },
    onSubmit() {
      this.$refs.getAttendees.onSubmitItem();

      this.$refs.ruleForm.validate((valid) => {
        if (valid && this.form.attendeesSubmit) {
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
    isWholeDay() {
      this.form.date2 = this.form.date1;
    },
    changeStartDate(value) {
      this.form.date2 = this.form.date1;

      alert(value);
    },
    changeEndDate(value) {
      this.form.date2 = value;
      alert(value);
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
