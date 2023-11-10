import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const state = () => ({
    reservationData: {
        date: null,
        timeSlot: null,
    },
    
});

export const mutations = {
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