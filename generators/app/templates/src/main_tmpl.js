// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

//引入Element-UI
import ElementUI from 'element-ui';
//引入Element-UI样式
import 'element-ui/lib/theme-chalk/index.css';
//引入font-awesome图标字体库
import 'font-awesome/css/font-awesome.css';

import App from './App.vue'
import router from './router'

Vue.use(ElementUI);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
