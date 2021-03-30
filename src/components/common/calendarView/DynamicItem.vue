<template>
  <a-form :form="form" @submit.prevent="onSubmitItem">
    <a-form-item
      :wrapperCol="{}"
      v-for="(k, index) in form.getFieldValue('keys')"
      :key="k"
      v-bind="index === 0 ? formItemLayout : formItemLayoutWithOutLabel"
      :required="false"
    >
      <a-input
        v-decorator="[
          `names[${k}]`,
          {
            validateTrigger: ['change', 'blur', 'add'],
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
        style="width: 60%; margin-right: 8px; margin-left: 5px"
      />
      <a-icon
        v-if="form.getFieldValue('keys').length >= 1"
        class="dynamic-delete-button"
        type="minus-circle-o"
        :disabled="form.getFieldValue('keys').length === 0"
        @click="() => remove(k)"
      />
    </a-form-item>
    <a-form-item v-bind="formItemLayout">
      <a-button type="dashed" style="width: 70%; margin-left: 5px" @click="add">
        <a-icon type="plus" /> Add field
      </a-button>
    </a-form-item>
    <!-- <a-form-item v-bind="formItemLayoutWithOutLabel">
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
    </a-form-item> -->
  </a-form>
</template>

<script>
let id = 0;
export default {
  name: "DynamicItem",
  props: ["attendees", "submit"],
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

    onSubmitItem() {
      var items = [];
      this.form.validateFields((err, values) => {
        const { keys, names } = values;

        if (!err) {
          keys.map((key) => items.push(names[key]));

          for (var i = 0; i < items.length - 1; i++) {
            for (var j = i + 1; j < items.length; j++) {
              if (items[i] == items[j]) {
                items.splice(j, 1);
              }
            }
          }
          this.attendees = items;
          this.$emit("attendeesPicked", this.attendees);
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