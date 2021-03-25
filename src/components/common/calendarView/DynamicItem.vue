<template>
  <a-form :form="form" @submit="handleSubmit">
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
                message: 'Please input attendee\'s gmail or delete this field.',
              },
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
            ],
          },
        ]"
        placeholder="Attendee Gmail"
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
    <a-form-item v-bind="formItemLayoutWithOutLabel">
      <a-button type="primary" html-type="submit"> Submit </a-button>
    </a-form-item>
  </a-form>
</template>

<script>
let id = 0;
export default {
  name: "DynamicItem",
  data() {
    return {
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
      // can use data-binding to set
      // important! notify form to detect changes
    },

    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          const { keys, names } = values;
          console.log("Received values of form: ", values);
          console.log(
            "Merged values:",
            keys.map((key) => names[key])
          );
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