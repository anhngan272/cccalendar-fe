<template>
  <a-form-model
    ref="ruleForm"
    labelAlign="left"
    :model="form"
    :rules="rules"
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
  >
    <a-form-model-item :label="$t('calendar_page.event_form.title')" prop="title">
      <a-input v-model="form.title" ref="title" />
    </a-form-model-item>
    <a-form-model-item :label="$t('calendar_page.event_form.begin')" required prop="date1">
      <a-date-picker
        inputReadOnly
        :allowClear="this.allowClear"
        v-model="form.date1"
        format="DD-MM-YYYY"
        @change="changeDateTime"
      />
      <a-time-picker
        inputReadOnly
        :allowClear="this.allowClear"
        v-model="form.time1"
        format="HH:mm"
        :default-value="moment('12:00', 'HH:mm')"
        @change="changeDateTime"
        style="margin-left: 15px"
      />
    </a-form-model-item>
    <a-form-model-item :label="$t('calendar_page.event_form.end')" prop="date2">
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
    <a-form-model-item :label="$t('calendar_page.event_form.attendees')" prop="attendees">
      <AttendeePicker
        ref="attendeePicker"
        :eventAttendees="form.attendees"
        @attendeePicked="setAttendees"
        @attendeeSubmited="setAttendeeSubmit"
      />
    </a-form-model-item>
    <a-form-model-item :label="$t('calendar_page.event_form.tags')" prop="tag">
      <TagPicker ref="tagPicker" :eventTags="form.tags" @tagsPicked="setTags" />
    </a-form-model-item>
    <a-form-model-item :label="$t('calendar_page.event_form.description')" prop="description">
      <a-input v-model="form.description" type="textarea" />
    </a-form-model-item>
    <a-form-model-item :label="$t('calendar_page.event_form.theme')" prop="colorId">
      <ThemePicker
        ref="colorPicker"
        :color="form.colorId"
        @colorPicked="setColor"
      />
    </a-form-model-item>
    <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
      <a-button type="primary" @click="onSubmit" v-if="isUpdate != true">
        {{$t('calendar_page.event_form.create_btn')}}
      </a-button>
      <a-button type="primary" @click="onUpdateEvent" v-else>
         {{$t('calendar_page.event_form.update_btn')}}
         </a-button>
      <a-button type="danger" style="margin-left: 10px" @click="resetForm">
        {{$t('calendar_page.event_form.reset_btn')}}
      </a-button>
    </a-form-model-item>
    <!-- <code>{{ form }}</code> -->
  </a-form-model>
</template>
<script>
import { mapActions } from "vuex";
import moment from "moment";
import AttendeePicker from "./AttendeePicker.vue";
import ThemePicker from "./ThemePicker.vue";
import TagPicker from "./TagPicker.vue";
import { createEventId } from "@/store/modules/calendarEvent/";

export default {
  name: "EventForm",
  props: {
    updateEventModalExtend: Object,
    updateEventInfo: Object,
    isUpdate: Boolean,
    eventTags: Array,
    eventAttendees: Array,
  },
  data() {
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
      other: "",
      isValidated: false,
      allowClear: false,
      form: {
        title: "",
        date1: moment(new Date()).add(7, "hours"),
        date2: moment(new Date()).add(7, "hours"),
        time1: moment.utc("12:00", "HH:mm"),
        time2: moment.utc("13:30", "HH:mm"),
        start: null,
        end: null,
        description: "",
        attendees: [],
        tags: [],
        attendeeSubmited: true,
        colorId: "7",
        backgroundColor: "46d6db",
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
    ThemePicker,
    TagPicker,
    AttendeePicker,
  },
  created() {
    if (this.isUpdate == true) {
      this.form.title = this.updateEventInfo.title;
      this.form.date1 = moment(this.updateEventInfo.start);
      this.form.time1 = moment(this.updateEventInfo.start);
      this.form.date2 = moment(this.updateEventInfo.end);
      this.form.time2 = moment(this.updateEventInfo.end);
      this.form.attendees = this.eventAttendees;
      this.form.tags = this.eventTags;
      this.form.description = this.updateEventModalExtend.description;
      this.form.colorId = this.updateEventModalExtend.colorId;
      this.form.backgroundColor = this.updateEventInfo.backgroundColor;
      // console.log(this.form.attendees);
    }
  },
  methods: {
    ...mapActions(["addEvent", "updateEvent"]),
    moment,
    onUpdateEvent() {
      this.validateForm();
      if (this.isValidated == true) {
        this.form.start =
          this.timeFormat("date", this.form.date1) +
          " " +
          this.timeFormat("time", this.form.time1);
        this.form.end =
          this.timeFormat("date", this.form.date2) +
          " " +
          this.timeFormat("time", this.form.time2);

        const start = moment(this.form.start)
          .add(7, "hours")
          .format("YYYY-MM-DD HH:mm");
        const end = moment(this.form.end)
          .add(7, "hours")
          .format("YYYY-MM-DD HH:mm");
        //create event object
        var event = {
          id: this.updateEventInfo.id,
          title: this.form.title,
          start: start,
          end: end,
          description: this.form.description,
          backgroundColor: this.form.backgroundColor,
          colorId: this.form.colorId,
          textColor: "#fff",
          allDay: false,
          attendees: this.form.attendees,
          tags: this.form.tags,
        };

        //call vuex store action to update event
        this.updateEvent(event);
        this.$emit("updated");
      } else {
        console.log("error update!!");
        return false;
      }
    },
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
    setColor(colorId,backgroundColor) {
      this.form = {
        ...this.form,
        colorId: colorId,
        backgroundColor: backgroundColor
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
    validateForm() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid && this.form.attendeeSubmited) {
          alert("ok!");
          this.isValidated = true;
        } else {
          console.log("error validate!!");
          this.isValidated = false;
        }
      });
    },
    onSubmit() {
      this.validateForm();
      if (this.isValidated == true) {
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
          attendees: this.form.attendees,
          tags: this.form.tags,
        };
        console.log(event);

        //call vuex store action to add event
        this.addEvent(event);
      } else {
        console.log("error submit!!");
        return false;
      }
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
        for (j = 0; j < this.form.time1.minute(); j++) {
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
      this.form.time2 = moment.utc("13:30", "HH:mm");
      this.colorId = "#039BE5";
    },
    changeDateTime(value) {
      // console.log(this.form.time1.toISOString())
      //Make sure end date is after or same as start date
      if (this.form.date2.isBefore(value)) {
        this.form.date2 = value;
      }
      //If start date is same as end date then end time must be after start time (default set 30m after start time)
      if (
        this.form.date2.format("YYYY-MM-DD") ==
        this.form.date1.format("YYYY-MM-DD")
      ) {
        if (
          this.form.time1.isAfter(this.form.time2) ||
          this.form.time1.isSame(this.form.time2)
        ) {
          this.form.time2 = this.form.time1.clone().add(30, "minutes");
        }
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