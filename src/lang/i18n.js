import Vue from 'vue'
import VueI18n from 'vue-i18n'
import vi from './vi.json'
import en from './en.json'

Vue.use(VueI18n)

const messages = {
    en: en,
    vi: vi
    
  };

  const i18n = new VueI18n({
    locale: localStorage.getItem('curLang')|| 'vi',
    messages,
  });

  export default i18n