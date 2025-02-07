import Vue, { CreateElement } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import axios from 'axios';
import { Store } from 'vuex';
import '@mdi/font/css/materialdesignicons.css';

Vue.config.productionTip = false;

axios.defaults.baseURL = 'http://localhost:3000/api';

declare module 'vue' {
  // 声明自己的 store state
  interface State {
    count: number;
  }

  // 为 `this.$store` 提供类型声明
  interface ComponentCustomProperties {
    $store: Store<State>;
  }
}

new Vue({
  router,
  store,
  vuetify,
  render: (h: CreateElement) => h(App),
}).$mount('#app');
