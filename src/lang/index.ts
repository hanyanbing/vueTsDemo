import Vue from 'vue';
import VueI18n from 'vue-i18n';
import Cookies from 'js-cookie';
// 在tsconfig.json 中配置     "allowJs": true,  允许编译javascript文件。
import elementEnLocale from 'element-ui/lib/locale/lang/en.js'; // element-ui lang
import elementZhLocale from 'element-ui/lib/locale/lang/zh-CN.js'; // element-ui lang
import elementEsLocale from 'element-ui/lib/locale/lang/es.js'; // element-ui lang
// import enLocale from './en';
import zhLocale from './zh';
// import esLocale from './es'
Vue.use(VueI18n);

const messages = {
  en: {
    // ...enLocale,
    ...elementEnLocale
  },
  zh: {
    ...zhLocale,
    ...elementZhLocale
  },
  es: {
    // ...esLocale,
    ...elementEsLocale
  }
};

export const getLanguage = () => {
  const chooseLanguage = Cookies.get('language');
  if (chooseLanguage) {
    return chooseLanguage;
  }

  // if has not choose language
  const language = navigator.language.toLowerCase();
  // get [en zh es]
  const locales = Object.keys(messages);
  for (const locale of locales) {
    if (language.indexOf(locale) > -1) {
      return locale;
    }
  }

  // default value  en
  return 'en';
};

const i18n = new VueI18n({
  // set locale
  locale: getLanguage(),
  // set locale messages
  messages
});

export default i18n;
