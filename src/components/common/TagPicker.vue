<template>
  <a-form :form="form">
    <a-form-item>
      <a-select
        mode="tags"
        style="width: 100%"
        :placeholder="$t('calendar_page.event_form.select_tags')"
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
import { mapActions, mapGetters } from "vuex";
export default {
  name: "TagPicker",
  props: {
    eventTags: Array,
    type: String,
  },
  data() {
    return {
      tags: ["school", "work", "todo", "reminder"],
      filterTags: [],
    };
  },
  created() {
    //set event tags
    this.form.setFieldsValue({ tag: this.eventTags });
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "tagPicker" });
    this.form.getFieldDecorator("tag", { initialValue: [], preserve: true });
  },
  computed: {
    ...mapGetters(["getFilterTags"]),
  },
  methods: {
    ...mapActions(["setFilterTags"]),
    setFilterTagPicker() {
      this.form.setFieldsValue({ tag: this.getFilterTags });
    },

    setEventTags(tags) {
      this.form.setFieldsValue({ tag: tags });
    },
    handleChange(values) {
      if (this.type == "filter") {
        this.setFilterTags(values)
        this.$emit("changeFilterTags",values)
      } else {
        console.log(`selected ${values}`);
        this.$emit("tagsPicked", values);
      }
    },
    resetForm() {
      this.$emit("tagsPicked", []);
      this.form.resetFields();
    },
  },
};
</script>
