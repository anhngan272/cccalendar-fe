<template>
  <div class="color-main">
    <div class="color-picker">
      <div
        class="color"
        @click="selectColor(theme)"
        v-for="(theme, index) in colors"
        :key="index"
      >
        <label>
          <input
            type="radio"
            name="color"
            :value="theme"
            :checked="theme == '#ff3e30'"
          />
          <span class="swatch" :style="{ 'background-color': theme }"></span>
        </label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ThemeColor",
  props: ["color"],
  data() {
    return {
      colors: ["#ff3e30", "#176bef", "#f7b529", "#179b52"],
    };
  },
  methods: {
    selectColor(color) {
      this.$emit("colorPicked", color);
    },
  },
};
</script>

<style scoped>
.color-main {
  width: 80%;
}
.color-main label {
  cursor: pointer;
}

.color-main input {
  display: none;
}
.color-picker {
  display: flex;
  justify-content: space-around;
}
.color-main input[type="radio"]:checked + .swatch {
  box-shadow: inset 0 0 0 2px black;
}

.swatch {
  display: inline-block;
  height: 40px;
  width: 40px;
  margin: 0 5px 0 0;
  border-radius: 50%;
}
</style>