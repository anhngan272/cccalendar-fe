<template>
  <a-form-model
    ref="ruleForm"
    labelAlign="left"
    :model="form"
    :rules="rules"
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
  >
    <a-form-model-item
      :label="$t('calendar_page.event_form.title')"
      prop="title"
    >
      <a-input v-model="form.title" ref="title" />
    </a-form-model-item>
    <a-form-model-item
      :label="$t('calendar_page.event_form.begin')"
      required
      prop="date1"
      class="row"
    >
      <a-date-picker
        inputReadOnly
        :allowClear="this.allowClear"
        v-model="form.date1"
        format="DD-MM-YYYY"
        @change="changeDateTime"
        :locale="this.$i18n.locale == 'vi' ? vi : en"
        class="col-auto col-xl-6"
      />
      <a-time-picker
        inputReadOnly
        :allowClear="this.allowClear"
        v-model="form.time1"
        format="HH:mm"
        :default-value="moment('12:00', 'HH:mm')"
        @change="changeDateTime"
        class="col-auto ml-2"
      />
    </a-form-model-item>
    <a-form-model-item :label="$t('calendar_page.event_form.end')" prop="date2">
      <a-date-picker
        inputReadOnly
        :allowClear="this.allowClear"
        v-model="form.date2"
        format="DD-MM-YYYY"
        :disabled-date="disabledDate"
        :locale="this.$i18n.locale == 'vi' ? vi : en"
        class="col-auto col-xl-6"
      />
      <a-time-picker
        inputReadOnly
        :allowClear="this.allowClear"
        v-model="form.time2"
        format="HH:mm"
        class="col-auto ml-2"
        :disabledHours="disabledHours"
        :disabledMinutes="disabledMinutes"
      />
    </a-form-model-item>
    <a-form-model-item
      :label="
        isCreator == true
          ? $t('calendar_page.event_form.attendees')
          : $t('calendar_page.event_form.attendees_cant_modified')
      "
      prop="attendees"
    >
      <AttendeePicker
        ref="attendeePicker"
        :eventAttendees="form.attendees"
        @attendeePicked="setAttendees"
        @attendeeSubmitted="setAttendeeSubmit"
        :isCreator="isCreator"
      />
    </a-form-model-item>
    <a-form-model-item :label="$t('calendar_page.event_form.tags')" prop="tag">
      <TagPicker
        ref="tagPicker"
        :eventTags="form.tags"
        @tagsPicked="setTags"
        @tagsSubmitted="setTagSubmit"
      />
    </a-form-model-item>
    <a-form-model-item
      :label="$t('calendar_page.event_form.description')"
      prop="description"
    >
      <a-input v-model="form.description" type="textarea" />
    </a-form-model-item>
    <a-form-model-item
      :label="$t('calendar_page.event_form.theme')"
      prop="colorId"
    >
      <ThemePicker
        ref="colorPicker"
        :color="form.colorId"
        @colorPicked="setColor"
      />
    </a-form-model-item>
    <a-form-model-item style="text-align: center">
      <a-button type="primary" @click="onSubmit" v-if="isUpdate != true">
        {{ $t("calendar_page.event_form.create_btn") }}
      </a-button>
      <a-button type="primary" @click="onUpdateEvent" v-else>
        {{ $t("calendar_page.event_form.update_btn") }}
      </a-button>
      <a-button type="danger" style="margin-left: 10px" @click="resetForm">
        {{ $t("calendar_page.event_form.reset_btn") }}
      </a-button>
      <a-popconfirm
        :title="$t('calendar_page.event_form.cancel_confirm')"
        placement="top"
        ok-text="Ok"
        :cancel-text="$t('calendar_page.event_form.cancel_btn')"
        @confirm="$emit('cancel')"
      >
        <a-button
          type="button"
          style="margin-left: 10px"
          v-if="isUpdate == true"
        >
          {{ $t("calendar_page.event_form.cancel_btn") }}
        </a-button>
      </a-popconfirm>
    </a-form-model-item>
  </a-form-model>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import moment from "moment";
import AttendeePicker from "./AttendeePicker.vue";
import ThemePicker from "./ThemePicker.vue";
import TagPicker from "../TagPicker.vue";
require("moment/locale/vi.js");
import vi from "ant-design-vue/es/date-picker/locale/vi_VN";
import en from "ant-design-vue/es/date-picker/locale/en_US";

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
      vi: vi,
      en: en,
      labelCol: { span: 8 },
      wrapperCol: { span: 24 },
      isValidated: false,
      allowClear: false,
      isCreator: true,
      form: {
        title: "",
        date1: moment(new Date()).utc("vi_VN"),
        date2: moment(new Date()).utc("vi_VN"),
        time1: moment.utc("12:00", "HH:mm"),
        time2: moment.utc("13:30", "HH:mm"),
        start: null,
        end: null,
        description: "",
        attendees: [],
        tags: [],
        attendeeSubmitted: true,
        tagSubmitted: true,
        colorId: 7,
        backgroundColor: "039be5",
      },
      rules: {
        title: [
          {
            required: true,
            message: this.$i18n.t("calendar_page.event_form.title_help"),
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
  beforeCreate() {
    moment.locale(this.$i18n.locale);
  },
  created() {
    if (this.isUpdate == true) {
      this.setUpdateInfo();
      this.$refs.title.focus();
    }
  },
  computed: {
    ...mapGetters({ user: "getCurrentUser" }),
  },
  methods: {
    moment,

    ...mapActions(["addEvent", "updateEvent"]),

    setUpdateInfo() {
      this.form.title = this.updateEventInfo.title;
      this.form.date1 = moment(this.updateEventInfo.start);
      this.form.time1 = moment(this.updateEventInfo.start);
      this.form.date2 = moment(this.updateEventInfo.end);
      this.form.time2 = moment(this.updateEventInfo.end);
      this.form.attendees = this.eventAttendees;
      if (this.user.email == this.updateEventModalExtend.creator) {
        this.isCreator = true;
      } else {
        this.isCreator = false;
      }
      this.form.tags = this.eventTags;
      this.form.description = this.updateEventModalExtend.description;
      this.form.colorId = this.updateEventModalExtend.colorId;
      this.form.backgroundColor = this.updateEventInfo.backgroundColor;
    },

    onUpdateEvent() {
      this.validateForm();
      if (this.isValidated == true) {
        this.form.start =
          this.form.date1.format("YYYY-MM-DD") +
          " " +
          this.form.time1.format("HH:mm");
        this.form.end =
          this.form.date2.format("YYYY-MM-DD") +
          " " +
          this.form.time2.format("HH:mm");

        //create event object
        var event = {
          id: this.updateEventInfo.id,
          title: this.form.title,
          start: this.form.start,
          end: this.form.end,
          description: this.form.description,
          backgroundColor: this.form.backgroundColor,
          colorId: this.form.colorId,
          borderColor: this.form.backgroundColor,
          textColor: "#fff",
          allDay: false,
          attendees: this.form.attendees,
          tags: this.form.tags,
        };
        // console.log(event);

        //call vuex store action to update event
        if (this.updateEvent(event)) {
          this.$emit("updated");
        }
      } else {
        return false;
      }
    },

    setTags(tags) {
      this.form = {
        ...this.form,
        tags: tags,
      };
    },

    setTagSubmit(bool) {
      this.form = {
        ...this.form,
        tagSubmitted: bool,
      };
    },

    setAttendeeSubmit(bool) {
      this.form = {
        ...this.form,
        attendeeSubmitted: bool,
      };
    },

    setAttendees(attendees) {
      this.form = {
        ...this.form,
        attendees: attendees,
      };
    },

    setColor(colorId, backgroundColor) {
      this.form = {
        ...this.form,
        colorId: colorId,
        backgroundColor: backgroundColor,
      };
    },

    validateForm() {
      this.$refs.ruleForm.validate((valid, error) => {
        if (valid && this.form.attendeeSubmitted && this.form.tagSubmitted) {
          this.isValidated = true;
        } else {
          if (error.title[0].field == "title") {
            this.$refs.title.focus();
            this.isValidated = false;
          }
        }
      });
    },

    onSubmit() {
      this.validateForm();
      if (this.isValidated == true) {
        this.form.start =
          this.form.date1.format("YYYY-MM-DD") +
          " " +
          this.form.time1.format("HH:mm");
        this.form.end =
          this.form.date2.format("YYYY-MM-DD") +
          " " +
          this.form.time2.format("HH:mm");

        //create event object
        var event = {
          // id: createEventId(),
          title: this.form.title,
          start: this.form.start,
          end: this.form.end,
          description: this.form.description,
          backgroundColor: this.form.backgroundColor,
          colorId: this.form.colorId,
          borderColor: this.form.backgroundColor,
          textColor: "#fff",
          allDay: false,
          attendees: this.form.attendees,
          tags: this.form.tags,
        };
        // console.log(event);

        //call vuex store action to add event
        if (this.addEvent(event)) {
          this.$emit("updated");
          this.resetForm();
        }
      } else {
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
      if (this.isUpdate == true) {
        this.setUpdateInfo();
      } else {
        this.$refs.ruleForm.resetFields();
        this.$refs.attendeePicker.resetForm();
        this.$refs.tagPicker.resetForm();
        this.$refs.colorPicker.resetForm();
        this.form.time1 = moment.utc("12:00", "HH:mm");
        this.form.time2 = moment.utc("13:30", "HH:mm");
        this.form.colorId = 7;
      }
    },

    changeDateTime(value) {
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