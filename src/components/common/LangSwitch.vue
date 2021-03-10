<template>
  <div class="langSwitch">
    <!-- <img src="@/assets/vietnam.png" alt="" v-if="flag" />
    <img src="@/assets/united-states.png" alt="" v-else /> -->
    <img :src="require(`@/assets/${this.$i18n.locale}.png`)" alt="">
    <select v-model="$i18n.locale" @change.prevent="callSetLangActions">
      <option v-for="(lang, i) in langs" :key="`lang-${i}`" :value="lang.value">
        {{ lang.text }}
      </option>
    </select>
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
          text: "EN",
          value: "en",
        },
      ],
    };
  },

  methods: {
    callSetLangActions(event) {
      if (event.target.value === "vi") {
        this.$i18n.locale = event.target.value;
        localStorage.setItem("curLang", event.target.value);
      } else {
        this.$i18n.locale = event.target.value;
        localStorage.setItem("curLang", event.target.value);
      }
      this.$store.dispatch("setLang", event.target.value);
    },

  },
};
</script>

<style scoped>
select {
  width: fit-content;
  /* line-height: 49px;
  height: 38px;
  font-size: 22px; */
  outline: 0;
  margin-bottom: 15px;
  margin-top: 15px;
  font-size: 15px;
  line-height: 25px;
  border-radius: 4px;
}
img {
  height: 25px;
  margin-right:5px;
  /* margin-top: 5px; */
  margin-bottom: 5px;
}
.langSwitch{
  display: inline-block;
  /* float: left; */
}
</style>