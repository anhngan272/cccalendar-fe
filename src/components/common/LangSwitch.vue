<template>
  <div class="langSwitch">
    <img src="@/assets/vietnam.png" alt="" v-if="flag" />
    <img src="@/assets/united-states.png" alt="" v-else />
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
  // data() {
  //   return { langs: ['en', 'vi'] }
  // },
  data() {
    return {
      langs: [
        {
          text: "VN",
          value: "vi",
          flag: "../assets/vietnam.png",
        },
        {
          text: "EN",
          value: "en",
          flag: "../assets/united-states.png",
        },
      ],
      flag: false,
    };
  },

  methods: {
    callSetLangActions(event) {
      this.setLang(event);
      this.getFlag(event);
    },
    setLang(event) {
      this.$store.dispatch("setLang", event.target.value);
    },
    getFlag(event) {
      console.log(this.langs[0].flag);
      if (event.target.value === "vi") {
        this.flag = true;
      } else {
        this.flag = false;
      }
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