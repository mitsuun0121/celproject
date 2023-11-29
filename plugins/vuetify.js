import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import 'vuetify/dist/vuetify.min.css';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        rtl: false,
        dark: false, // ダークモードを有効にする場合は true に設定
        themes: {
            light: {
                primary: '#2196F3', // プライマリカラー
                secondary: '#FFC107', // セカンダリカラー
            },
        },
    },
});

