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
          <span class="tooltiptext">{{ colors[index].name }}</span>
          <input
            class="tooltip"
            type="radio"
            name="color"
            :value="theme.background"
            :checked="color == theme.colorId"
          />
          <span class="swatch" :style="{ 'background-color': theme.background }"></span>
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
      colors: [{
        "colorId": 1,
        "name": "Lavender",
        "background": "#a4bdfc",
        "foreground": "#1d1d1d"
    },
    {
        "colorId": 2,
        "name": "Sage",
        "background": "#7ae7bf",
        "foreground": "#1d1d1d"
    },
    {
        "colorId": 3,
        "name": "Grape",
        "background": "#dbadff",
        "foreground": "#1d1d1d"
    },
    {
        "colorId": 4,
        "name": "Flamingo",
        "background": "#ff887c",
        "foreground": "#1d1d1d"
    },
    {
        "colorId": 5,
        "name": "Banana",
        "background": "#fbd75b",
        "foreground": "#1d1d1d"
    },
    {
        "colorId": 6,
        "name": "Tangerine",
        "background": "#ffb878",
        "foreground": "#1d1d1d"
    },
    {
        "colorId": 7,
        "name": "Peacock",
        "background": "#46d6db",
        "foreground": "#1d1d1d"
    },
    {
        "colorId": 8,
        "name": "Graphite",
        "background": "#e1e1e1",
        "foreground": "#1d1d1d"
    },
    {
        "colorId": 9,
        "name": "Blueberry",
        "background": "#5484ed",
        "foreground": "#1d1d1d"
    },
    {
        "colorId": 10,
        "name": "Basil",
        "background": "#51b749",
        "foreground": "#1d1d1d"
    },
    {
        "colorId": 11,
        "name": "Tomato",
        "background": "#dc2127",
        "foreground": "#1d1d1d"
    }],
    };
  },
  methods: {
    selectColor(color) {
      this.$emit("colorPicked", color.colorId);
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