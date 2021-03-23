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
      />
      <a-date-picker
        :allowClear="this.form.allowClear"
        v-show="this.form.wholeDay"
        v-model="form.date2"
        format="DD-MM-YYYY"
      />
      <div :wrapper-col="{ span: 28, offset: 4 }" v-show="!this.form.wholeDay">
        <a-time-picker
          :allowClear="this.form.allowClear"
          v-model="form.time1"
          format="HH:mm"
          :default-value="moment('12:08', 'HH:mm')"
        />
        <a-time-picker
          :allowClear="this.form.allowClear"
          v-model="form.time2"
          format="HH:mm"
          style="margin-left: 10px"
        />
      </div>
    </a-form-model-item>
    <a-form-model-item label="Whole Day" prop="wholeDay">
      <a-switch v-model="form.wholeDay" />
    </a-form-model-item>
    <a-form-model-item label="Attendees" prop="description">
      <DynamicItem />
    </a-form-model-item>
    <a-form-model-item label="Description" prop="description">
      <a-input v-model="form.description" type="textarea" />
    </a-form-model-item>
    <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
      <a-button type="primary" @click="onSubmit"> Create </a-button>
      <a-button type="danger" style="margin-left: 10px" @click="resetForm"> Reset </a-button>
    </a-form-model-item>
  </a-form-model>
</template>
<script>
import moment from "moment";
import DynamicItem from "./DynamicItem.vue";

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
        time1: "",
        time2: moment("13:00", "HH:mm"),
        description: "",
        wholeDay: false,
        allowClear: false,
      },

      rules: {
        title: [
          {
            required: true,
            message: "Please input Event Title",
            trigger: "blur",
          },
        ],
        date1: [
          { required: true, message: "Please pick a date", trigger: "change" },
        ],
      },
    };
  },
  components: {
    DynamicItem,
  },
  created() {
    // alert(moment(new Date()).format("DD/MM/YYYY"))
  },
  methods: {
    moment,
    onSubmit() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    disabledDate(current) {
      // Can not select days before today and today
      return current && current < moment().endOf("day");
    },
    resetForm() {
      this.$refs.ruleForm.resetFields();
    },
    onChange(dates, dateStrings) {
      console.log("From: ", dates[0], ", to: ", dates[1]);
      console.log("From: ", dateStrings[0], ", to: ", dateStrings[1]);
      this.form.start = dateStrings[0];
      this.form.end = dateStrings[1];
    },
  },
};
</script>
