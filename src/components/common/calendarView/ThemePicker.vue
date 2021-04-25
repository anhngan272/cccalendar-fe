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
          <span
            class="swatch"
            :style="{ 'background-color': theme.background }"
          ></span>
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
      colors: [
        {
          colorId: 1,
          name: this.$i18n.t("calendar_page.event_form.theme_name.lavender"),
          background: "#7986cb",
          foreground: "#1d1d1d",
        },
        {
          colorId: 2,
          name: this.$i18n.t("calendar_page.event_form.theme_name.sage"),
          background: "#33b679",
          foreground: "#1d1d1d",
        },
        {
          colorId: 3,
          name: this.$i18n.t("calendar_page.event_form.theme_name.grape"),
          background: "#8e24aa",
          foreground: "#1d1d1d",
        },
        {
          colorId: 4,
          name: this.$i18n.t("calendar_page.event_form.theme_name.flamingo"),
          background: "#e67c73",
          foreground: "#1d1d1d",
        },
        {
          colorId: 5,
          name: this.$i18n.t("calendar_page.event_form.theme_name.banana"),
          background: "#f6c026",
          foreground: "#1d1d1d",
        },
        {
          colorId: 6,
          name: this.$i18n.t("calendar_page.event_form.theme_name.tangerine"),
          background: "#f5511d",
          foreground: "#1d1d1d",
        },
        {
          colorId: 7,
          name: this.$i18n.t("calendar_page.event_form.theme_name.peacock"),
          background: "#039be5",
          foreground: "#1d1d1d",
        },
        {
          colorId: 8,
          name: this.$i18n.t("calendar_page.event_form.theme_name.graphite"),
          background: "#616161",
          foreground: "#1d1d1d",
        },
        {
          colorId: 9,
          name: this.$i18n.t("calendar_page.event_form.theme_name.blueberry"),
          background: "#3f51b5",
          foreground: "#1d1d1d",
        },
        {
          colorId: 10,
          name: this.$i18n.t("calendar_page.event_form.theme_name.basil"),
          background: "#0b8043",
          foreground: "#1d1d1d",
        },
        {
          colorId: 11,
          name: this.$i18n.t("calendar_page.event_form.theme_name.tomato"),
          background: "#d60000",
          foreground: "#1d1d1d",
        },
      ],
    };
  },
  methods: {
    selectColor(color) {
      this.$emit("colorPicked", color.colorId, color.background);
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
/* .color-picker {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
} */

.color-picker {
  display: flex;
  flex-wrap: wrap;
}

.color-main input[type="radio"]:checked + .swatch {
  /* background: radial-gradient(closest-side, white, transparent 80%); */
  /* background: pink; */
  background: radial-gradient(white 25%, transparent 35%);
}
/* .swatch {
  display: inline-block;
  height: 40px;
  width: 40px;
  border-radius: 50%;
} */

.swatch {
  display: inline-block;
  height: 30px;
  width: 30px;
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
  margin-left: -25px;
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