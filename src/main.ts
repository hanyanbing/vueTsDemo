import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import Cookies from 'js-cookie';

import './permission'; // permission control   权限控制
import Element from 'element-ui';

// import 'element-ui/lib/theme-chalk/index.css'; // 引入el样式文件
import '@/styles/element-variables.scss'; // 自定义主题
import i18n from './lang'; // Internationalization  国际化翻译

import '@/styles/index.scss'; // global css   全局样式
import './icons/index'; // icon
import '../mock/index'; // mock数据
import * as filters from './filters/index';

Vue.use(Element, {
  size: Cookies.get('size') || 'medium', // set element-ui default size
  i18n: (key: any, value: any) => i18n.t(key, value)
});

// Register global filter functions
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app');
