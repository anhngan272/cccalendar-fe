<template>
  <a-form :form="form" @submit.prevent="onSubmitItem">
    <a-form-item
      :wrapperCol="{}"
      v-for="(k, index) in form.getFieldValue('keys')"
      :key="k"
      v-bind="index === 0 ? formItemLayout : formItemLayoutWithOutLabel"
      :required="false"
    >
    <!-- <a-select
        mode="tags"
        style="width: 100%"
        placeholder="Enter Attendee"
        @change="handleChange"
        v-decorator="[
          `names[${k}]`,
          {
            rules: [
              {
                type: 'email',
                message: 'wrong format!',
                trigger:'change'
              },
            ],
          },
        ]"
      > 
      </a-select>-->
      
      
      <a-select
      mode="tags"
      @change="handleChange"
        v-decorator="[
          `names[${k}]`,
          {
            validateTrigger: ['change', 'blur'],
            rules: [
              {
                required: true,
                message: 'Please input attendee\'s email or delete this field.',
              },
              {
                type: 'email',
                message: 'The input is invalid Email format.',
              },
            ],
          },
        ]"
        placeholder="Attendee Email"
        style="width: 80%; margin-right: 8px; margin-left: 5px"
      ></a-select>
      <a-icon
        v-if="form.getFieldValue('keys').length >= 1"
        class="dynamic-delete-button"
        type="minus-circle-o"
        :disabled="form.getFieldValue('keys').length === 0"
        @click="() => remove(k)"
      />
    </a-form-item>
    <a-form-item v-bind="formItemLayout"
     v-if="form.getFieldValue('keys').length == 0">
      <a-button type="dashed" style="width: 70%; margin-left: 5px" @click="add">
        <a-icon type="plus" /> Add field
      </a-button>
    </a-form-item>
    <a-form-item v-bind="formItemLayoutWithOutLabel">
      <a-button
        type="primary"
        html-type="submit"
        :disabled="form.getFieldValue('keys').length === 0"
      >
        Submit
      </a-button>
      <a-button
        style="margin-left: 10px"
        type="danger"
        @click="resetForm"
        :disabled="form.getFieldValue('keys').length === 0"
      >
        Reset
      </a-button>
    </a-form-item>
  </a-form>
</template>

<script>
let id = 0;
export default {
  name: "DynamicItem",
  props: ["item", "submit"],
  data() {
    return {
      items: [],
      formItemLayout: {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 4 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 20 },
        },
      },
      formItemLayoutWithOutLabel: {
        wrapperCol: {
          xs: { span: 24, offset: 0 },
          sm: { span: 20, offset: 4 },
        },
      },
    };
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "dynamic_form_item" });
    this.form.getFieldDecorator("keys", { initialValue: [], preserve: true });
  },
  methods: {
    remove(k) {
      const { form } = this;
      // can use data-binding to get
      const keys = form.getFieldValue("keys");
      // We need at least one passenger
      if (keys.length === 0) {
        return;
      }
      // can use data-binding to set
      form.setFieldsValue({
        keys: keys.filter((key) => key !== k),
      });
    },
    add() {
      const { form } = this;
      // can use data-binding to get
      const keys = form.getFieldValue("keys");
      const nextKeys = keys.concat(id++);
      this.form.validateFields((errors) => {
        if (errors) {
          return;
        } else {
          form.setFieldsValue({
            keys: nextKeys,
          });
        }
      });
    },
    resetForm() {
      this.form.resetFields();
    },
    handleChange(value) {
        this.form.setFieldsValue({'names[0]':value})

       console.log(this.form.getFieldValue('names[0]'))
      //this.form.setFieldsValue({ attendee: value });
    //   console.log(this.form.getFieldValue("attendee").length);
      //   const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/;
      // if (!value.match(emailRegex)) console.log(`selected ${value}`);
      this.form.validateFields((err, values) => {
          // console.log('error', err);
        if (!err) {
          console.log('Received values of form: ', values);
          // this.$emit("attendeePicked", values);
        } 
      });
    },
    onSubmitItem() {
      var items = [];
      this.form.validateFields((err, values) => {
        const { keys, names } = values;
        if (!err) {
          keys.map((key) => items.push(names[key]));
          this.items = items;
          this.$emit("attendeesPicked", this.items);
          this.$emit("attendeesSubmit", true);
        } else {
          this.$emit("attendeesSubmit", false);
        }
      });
    },
  },
};
</script>
<style>
.dynamic-delete-button {
  cursor: pointer;
  position: relative;
  top: 4px;
  font-size: 24px;
  color: #999;
  transition: all 0.3s;
}
.dynamic-delete-button:hover {
  color: #777;
}
.dynamic-delete-button[disabled] {
  cursor: not-allowed;
  opacity: 0.5;
}
</style>