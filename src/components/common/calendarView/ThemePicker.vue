<template>
  <div class="color-main">
    <a-select
      label-in-value
      :default-value="{ key: '#ff3e30' }"
      style="width: 200px"
      @change="selectColor"
    >
      <a-select-option value="#ff3e30">
        <span
          style="
            border-radius: 4px;
            margin-right: 5px;
            color: #ff3e30;
            background-color: #ff3e30;
          "
          ><b>col</b></span
        >
        <span style="color: #ff3e30"><b>red</b></span>
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
        color: ["blue", "yellow", "green"],
        id: ["#176bef", "#f7b529", "#179b52"],
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