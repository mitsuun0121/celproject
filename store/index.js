import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const state = () => ({
    auth: {
        loggedIn: false,
        user: null,
        
    },
    reservationData: {
        date: null,
        timeSlot: null,
    },
    
});

export const mutations = {
    setAuth(state, auth) {
        state.auth = auth;
    },
    setReservationData(state, data) {
        // ステート内の予約データを更新
        state.reservationData = data;
    },
    
};

export const actions = {
    saveReservationData({ commit }, data) {
        // 予約データをミューテーションを通じて更新
        commit('setReservationData', data);
    },
};