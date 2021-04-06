<template>
  <div class="langSwitch">
    <a-dropdown :trigger="['click', 'hover']">
      <a-menu slot="overlay">
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
      </a-menu>
      <a-button size="large" class="dropBtn">
        <img :src="require(`@/assets/${this.$i18n.locale}.png`)" alt="" />
        {{ $t("common.select_lang") }}
        <a-icon :style="{ fontSize: '15px' }" type="down" />
      </a-button>
    </a-dropdown>
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
  margin-right: 10px;
  display: inline-block;
}
.langSwitch {
  display: inline-block;
}

.dropBtn {
  display: flex;
  align-items: center;
  font-weight: bold;
  font-size: 15px;
  border: 1 px solid #808080;
}

.dropdown-content {
  width: 100%;
  z-index: 2;
  font-weight: bold;
  line-height: 25px;
  font-size: 15px;
  color: #808080;
  background: white;
}

.dropdown-content div {
  padding: 5px;
  text-decoration: none;
  justify-content: center;
  align-items: center;
  display: flex;
}

.dropdown-content div:hover {
  background-color: #ddd;
  color: black;
}
</style>