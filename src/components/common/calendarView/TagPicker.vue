<template>
  <a-form :form="form">
    <a-form-item>
      <a-select
        mode="tags"
        style="width: 100%"
        placeholder="Select tag"
        @change="handleChange"
        v-decorator="['tag']"
      >
        <a-select-option v-for="tag in tags" :key="tag">
          {{ tag }}
        </a-select-option>
      </a-select>
    </a-form-item>
  </a-form>
</template>
<script>
export default {
  name: "TagPicker",
  prop: ["tags"],
  data() {
    return {
      tags: ["school", "work", "todo", "reminder"],
    };
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "tagPicker" });
    this.form.getFieldDecorator("tag", { initialValue: [], preserve: true });
  },
  methods: {
    handleChange(value) {
      console.log(`selected ${value}`);
      this.$emit("tagsPicked", value);
    },
    resetForm() {
      this.$emit("tagsPicked", []);
      this.form.resetFields();
    },
  },
};
</script>
