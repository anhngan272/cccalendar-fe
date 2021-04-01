<template>
  <div class="color-main">
    <a-select
      label-in-value
      :default-value="{ key: '#039BE5' }"
      style="width: 100%"
      @change="selectColor"
    >
      <a-select-option value="#039BE5">
        <span
          style="
            border-radius: 4px;
            margin-right: 5px;
            color: #039BE5;
            background-color: #039BE5;
          "
          ><b>col</b></span
        >
        <span style="color: #039BE5"><b>Pacific Blue</b></span>
      </a-select-option>
      <a-select-option
        v-for="(colorId, index) in colors.id"
        :key="index"
        :value="colorId"
      >
        <span
          style="border-radius: 4px; margin-right: 5px"
          :style="{ color: colorId, 'background-color': colorId }"
          ><b>col</b></span
        >
        <span :style="{ color: colorId }"
          ><b>{{ colors.color[index] }}</b></span
        >
      </a-select-option>
    </a-select>
  </div>
</template>

<script>
export default {
  name: "ThemePicker",
  props: ["color"],
  data() {
    return {
      // colors: ["#ff3e30", "#176bef", "#f7b529", "#179b52"],
      colors: {
        color: ["Tomato Red","Silver Pink", "Orange", "Banana","Light Green","Basil","Blueberry","Lavender","Grape","Smoky Gray"],
        id: ["#D50000","#E67C73", "#F4511E", "#F6BF26","#33B679","#0B8043","#3F51B5","#7986CB","#8E24AA","#616161"],
      },
    };
  },
  methods: {
    selectColor(color) {
      this.$emit("colorPicked", color.key);
    },
  },
};
</script>

<style scoped>
/* .color-main {
  width: 80%;
} */
/* .color-main label {
  cursor: pointer;
}

.color-main input {
  display: none;
} */
/* .color-picker {
  display: flex;
  justify-content: space-around;
} */
/* .color-main input[type="radio"]:checked + .swatch {
  box-shadow: inset 0 0 0 2px black;
} */

/* .swatch {
  display: inline-block;
  height: 17px;
  width: 17px;
  margin-top: 5px;
  border-radius: 50%;
} */
</style>