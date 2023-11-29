import Vue from 'vue';
import App from './App.vue';
import store from './store';
import Vuetify from './vuetify/lib/framework';

// @mdi/font の CSS をインポート
import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/dist/vuetify.min.css';

Vue.config.productionTip = false // 本番環境ではfalse

const vuetify = new Vuetify();

new Vue({
    render: h => h(App),
    store,
    vuetify,  // Vue インスタンスに vuetify オプションを追加
}).$mount('#app');
