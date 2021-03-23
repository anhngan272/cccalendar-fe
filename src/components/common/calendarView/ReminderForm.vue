<template>
  <a-form-model
    ref="ruleForm"
    :model="form"
    :rules="rules"
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
  >
    <a-form-model-item ref="title" label="Event Title" prop="title">
      <a-input v-model="form.title" />
    </a-form-model-item>
    <a-form-model-item
      v-show="this.form.wholeDay"
      label="Event Time"
      required
      prop="date1"
    >
      <a-date-picker
        v-model="form.date1"
        :disabled-date="disabledDate"
        format="DD-MM-YYYY"
        @change="onChange"
      />
    </a-form-model-item>
    <a-form-model-item
      v-show="!this.form.wholeDay"
      label="Event Time"
      required
      prop="date1"
    >
      <a-date-picker
        v-model="form.date1"
        :disabled-date="disabledDate"
        format="DD-MM-YYYY HH:mm"
        showTime
        @change="onChange"
      />
    </a-form-model-item>
    <a-form-model-item label="Whole Day" prop="wholeDay">
      <a-switch v-model="form.wholeDay" />
    </a-form-model-item>
    <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
      <a-button type="primary" @click="onSubmit"> Create </a-button>
      <a-button style="margin-left: 10px" @click="resetForm"> Reset </a-button>
    </a-form-model-item>
  </a-form-model>
</template>
<script>
import moment from "moment";
export default {
  name: "ReminderForm",
  data() {
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      other: "",
      form: {
        title: "",
        date1: undefined,
        start: "",
        wholeDay: false,
      },
      rules: {
        title: [{ required: true, message: "Please input Event Title" }],
        date1: [
          { required: true, message: "Please pick a date", trigger: "change" },
        ],
      },
    };
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
      console.log(dateStrings);
    },
  },
};
</script>
