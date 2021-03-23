<template>
  <div class="langSwitch">
    <div class="dropdown">
      <div class="dropbtn">
        <img :src="require(`@/assets/${this.$i18n.locale}.png`)" alt="" />
        {{ $t("common.select_lang") }} &#9660;
      </div>
      <div class="dropdown-content">
        <div
          style="cursor: pointer"
          @click="callSetLangActions"
          v-for="(lang, i) in langs"
          :key="`lang-${i}`"
          :value="lang.value"
        >
          <img :src="require(`@/assets/${lang.value}.png`)" alt="" />
          {{ lang.text }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LangSwitch",
  data() {
    return {
      langs: [
        {
          text: "VN",
          value: "vi",
        },
        {
          text: "US",
          value: "en",
        },
      ],
    };
  },

  methods: {
    callSetLangActions(event) {
      this.$i18n.locale = event.currentTarget.getAttribute("value");
      localStorage.setItem(
        "curLang",
        event.currentTarget.getAttribute("value")
      );
      this.$store.dispatch(
        "setLang",
        event.currentTarget.getAttribute("value")
      );
    },
  },
};
</script>

<style scoped>
img {
  height: 25px;
  margin-right: 5px;
}
.langSwitch {
  display: inline-block;
  /* float: left; */
  /* float: left; */
}

.dropbtn {
  background-color: white;
  color: #808080;
  padding: 12px;
  font-size: 15px;
  border: none;
  cursor: pointer;
  line-height: 25px;
  border-radius: 4px;
  font-weight: bold;
}

.dropdown {
  /* position: relative; */
  /* display: inline-block; */
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  width: 100%;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  font-weight: bold;
  margin-right: 10px;
  text-align: center;
  color: #808080;
}

.dropdown-content div {
  /* padding: 12px 16px; */
  padding: 5px;
  text-decoration: none;
  /* display: block; */
}

.dropdown-content div:hover {
  background-color: #ddd;
  color: black;
}

.dropdown:hover .dropdown-content {
  display: block;
}

.dropdown:hover .dropbtn {
  background-color: #ddd;
  color: black;
}
</style>