import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const state = () => ({
    userReservations: [], // ユーザーの予約データを保持

});

export const mutations = {
    setUserReservationData(state, reservations) {
        // ユーザーの予約データを設定するミューテーション
        state.userReservations = reservations;
    },

};

export const actions = {
    // ユーザーの予約データを保存するアクション
    saveUserReservationData({ commit, state }, reservationData) {
        // 既存の予約データに新しいデータを追加
        const updatedReservations = [...state.userReservations, reservationData];
        commit('setUserReservations', updatedReservations);
    },
};

