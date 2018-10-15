import Vue from 'vue';
import VueI18n from 'vue-i18n';
import u from 'underscore';

import zh from './lang/zh';
import en from './lang/en';
Vue.use(VueI18n);

const availableLocale = ['zh', 'en'];

const defaultLangStr = navigator.language;
let defaultLang = 'zh';

if (defaultLangStr.indexOf('en') >= 0) {
  defaultLang = 'en';
}

const query = location.search.substr(1);
const queryObj = {};

if (query) {
  u.each(query.split('&'), item => {
    const tempArr = item.split('=');
    queryObj[tempArr[0]] = tempArr[1];
  });
}

const locale = u.contains(availableLocale, queryObj['locale']) ? queryObj['locale'] : defaultLang;

console.log(locale);
const i18n = new VueI18n({
  locale,
  messages: {
    'en': en,
    'zh': zh
  }
});

export default i18n;
