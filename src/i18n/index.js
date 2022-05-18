import VueI18n from 'vue-i18n'
import Vue from 'vue'

Vue.use(VueI18n)
var locale
localStorage.getItem('locale') ? locale = localStorage.getItem('locale') : locale = 'cn'
const i18n = new VueI18n({
  'locale': locale,
  'messages': {
    'cn': require('./lang/zh_CN'),
    'en': require('./lang/en_US'),
    'hk': require('./lang/zh_HK'),
    'jp': require('./lang/jp_JP'),
    'kr': require('./lang/kr_KR')
  }
})
export default i18n
