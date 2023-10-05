export const state = () => ({
    reservationData: null, // 予約データを格納する状態
})

export const mutations = {
    setReservationData(state, data) {
        state.reservationData = data
    },
}
