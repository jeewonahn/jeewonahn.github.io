// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';

// Import bootstrap css files...
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

// Import vue-awesome files...
import 'vue-awesome/icons';
import VueAwesomeIcon from 'vue-awesome/components/Icon';

import App from './App';
import router from './router';

Vue.config.productionTip = false;

Vue.use(BootstrapVue);
Vue.component('icon', VueAwesomeIcon);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
});
