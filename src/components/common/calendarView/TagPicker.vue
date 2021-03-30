<template>
  <a-select
    mode="tags"
    style="width: 100%"
    placeholder="Please select"
    @change="handleChange"
  >
    <a-select-option v-for="tag in tags" :key="tag">
      {{ tag }}
    </a-select-option>
  </a-select>
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
  methods: {
    handleChange(value) {
      console.log(`selected ${value}`);
      this.$emit("tagsPicked", value);
    },
  },
};
</script>
