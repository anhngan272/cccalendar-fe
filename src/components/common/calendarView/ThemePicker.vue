<template>
  <div class="color-main">
    <div class="color-picker">
      <div
        class="color"
        @click="selectColor(theme)"
        v-for="(theme, index) in colors.id"
        :key="index"
      >
        <label>
          <span class="tooltiptext">{{ colors.name[index] }}</span>
          <input
            :id="theme"
            class="tooltip"
            type="radio"
            name="color"
            :value="theme"
            :checked="defaultId == '#039BE5'"
            v-model="defaultId"
          />
          <span class="swatch" :style="{ 'background-color': theme }"></span>
        </label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ThemePicker",
  props: ["color"],
  data() {
    return {
      defaultId: "#039BE5",
      colors: {
        name: [
          "Pacific Blue",
          "Tomato Red",
          "Silver Pink",
          "Orange",
          "Banana",
          "Light Green",
          "Basil",
          "Blueberry",
          "Lavender",
          "Grape",
          "Smoky Gray",
        ],
        id: [
          "#039BE5",
          "#D50000",
          "#E67C73",
          "#F4511E",
          "#F6BF26",
          "#33B679",
          "#0B8043",
          "#3F51B5",
          "#7986CB",
          "#8E24AA",
          "#616161",
        ],
      },
    };
  },
  methods: {
    selectColor(color) {
      this.$emit("colorPicked", color);
    },
    resetForm() {
      this.defaultId = "#039BE5";
      this.$emit("colorPicked", this.defaultId);
    },
  },
};
</script>

<style scoped>
.color-main {
  width: 100%;
}
.color-main label {
  cursor: pointer;
}
.color-main input {
  display: none;
}
.color-picker {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
.color-main input[type="radio"]:checked + .swatch {
  /* box-shadow: inset 0 0px 10px 5px #fff; */
  background: radial-gradient(closest-side, white, transparent 80%);
}
.swatch {
  display: inline-block;
  height: 40px;
  width: 40px;
  border-radius: 50%;
}

.color {
  height: 40px;
  width: 40px;
  margin: 0 17px 15px 0;
}

.color .tooltiptext {
  visibility: hidden;
  min-width: 80px;
  max-width: 120px;
  opacity: 0.85;
  background-color: #7e7e7e;
  color: #fff;
  text-align: center;
  border-radius: 6px;

  /* Position the tooltip */
  position: absolute;
  z-index: 1;
  bottom: 100%;
  margin-left: -20px;
}

.color .tooltiptext::after {
  content: " ";
  position: absolute;
  top: 100%;
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: #7e7e7e transparent transparent transparent;
}

.color:hover .tooltiptext {
  visibility: visible;
}
</style>