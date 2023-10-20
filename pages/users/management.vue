<template>
  <div>
    <div class="container">
      <h2>ログイン状態:{{ $auth.loggedIn }}</h2>
      <p v-if="$auth.loggedIn">Name : {{ $auth.user.name }}</p>
    </div>
    <a @click="logout">Logout</a>
    <div>
      <h2>シフト登録</h2>
      <form @submit.prevent="userShift">
        <label for="shift_date">日付</label>
        <input type="date" name="shift_date" id="shift_date" v-model="shiftData.date">
        <label for="start_time">開始時間</label>
        <input type="time" name="start_time" id="start_time" v-model="shiftData.startTime">
        <label for="end_time">終了時間</label>
        <input type="time" name="end_time" id="end_time" v-model="shiftData.endTime">

        <button type="submit">登録</button>
      </form>

      <h2>シフト一覧</h2>
      <ul>
        <li v-for="shift in shiftList" :key="shift.id">
          {{ shift.date }} - {{ shift.startTime }} - {{ shift.endTime }}
          <button @click="editShift(shift)">編集</button>
          <button @click="deleteShift(shift.id)">削除</button>
        </li>
      </ul>
    </div>

    <!-- シフト編集フォーム -->
    <div v-if="editingShift">
      <h2>シフト編集</h2>
      <form @submit.prevent="updateShift">
        <label for="shift_date">日付</label>
        <input type="date" name="shift_date" v-model="shiftToUpdate.date">
        <label for="start_time">開始時間</label>
        <input type="time" name="start_time" v-model="shiftToUpdate.startTime">
        <label for="end_time">終了時間</label>
        <input type="time" name="end_time" v-model="shiftToUpdate.endTime">
        <button type="submit">更新</button>
        <button @click="cancelEdit">キャンセル</button>
      </form>
    </div>

    <div class="contact-table__outer">
      <table class="contact-table">
        <tr>
          <td class="contact-date1">日時</td> <!-- 曜日を表示するヘッダーセル -->
          <td class="contact-date2" v-for="(date, dateIndex) in dates" :key="dateIndex" >
              {{ getDayOfWeek(date) }}
          </td>
        </tr>
    
        <tr v-for="(timeSlot, timeIndex) in timeSlots" :key="timeIndex">
          <td class="contact-time1">{{ timeSlot }}</td> <!-- 時間帯を表示 -->
          <td class="contact-time2" v-for="(date, dateIndex) in dates" :key="dateIndex" >
          
            <!-- シフトボタンを表示 -->
            <button class="select-btn" @click="shiftonClick(date, timeSlot)" :disabled="isShift(date, timeSlot)" :class="{ 'clicked-button': isShift(date, timeSlot) }"><span v-if="!isShift(date, timeSlot)">カ</span><span v-else>ー</span></button>
          </td>
        </tr>
      </table>
    </div>

  </div>
</template>

<script>

export default {
  
  layout: 'default',
  data() {
    return {
      shiftData: {
        date: '',       // 日付を追加
        startTime: '',  // 開始時間を追加
        endTime: ''     // 終了時間を追加
      },
      
      shiftToUpdate: {
        id: null,
        date: '',
        startTime: '',
        endTime: ''
      },
      editingShift: null, // 編集中のシフト

      shiftList: [], // シフト情報の一覧を保存するための配列

      startDate: new Date(), // 開始日を設定
      numDays: 7, // 表示する日数
      timeSlots: ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00',], // 時間帯のリスト
    
    };
  },
  
  computed: {
    dates() {
      // 開始日から指定した日数分の日にちを計算
      const dates = [];
      for (let i = 0; i < this.numDays; i++) {
        const currentDate = new Date(this.startDate);
        currentDate.setDate(this.startDate.getDate() + i);
        dates.push(currentDate.toLocaleDateString());
      }
      return dates;
    },
  },
  mounted() {
    this.fetchShiftList(); 

  },
  watch: {
    // ウォッチャーをここに追加
    startDate(newDate, oldDate) {
      if (newDate !== oldDate) {
        this.fetchShiftList();
      }
    },
  },
  methods: {

    // シフト登録
    async userShift() {
      try {
        const shiftData = {
          shift_date: this.shiftData.date,
          start_time: this.shiftData.startTime,
          end_time: this.shiftData.endTime
        };
        const response = await this.$axios.post('http://localhost/api/user_shift', shiftData);
        // データベースへの登録が成功した場合の処理
        console.log('シフトが登録されました。', response.data);
        this.clearForm();
        this.fetchShiftList();

      } catch (error) {
        // エラーハンドリング
        console.error('シフトの登録に失敗しました。', error);
      }
    },

    // ユーザーが登録したシフト情報を表示
    async fetchShiftList() {
      try {
        const response = await this.$axios.get('http://localhost/api/user_shift');
        if (response && response.data && Array.isArray(response.data)) {
          this.shiftList = response.data.map(shift => ({
            id: shift.id,
            date: shift.shift_date ? shift.shift_date.split(' ')[0] : '日付なし', // 日付を"YYYY-MM-DD"形式に整形
            startTime: shift.start_time ? shift.start_time.slice(0, 5) : '00:00', // 時間を"HH:MM"形式に整形
            endTime: shift.end_time ? shift.end_time.slice(0, 5) : '00:00', // 時間を"HH:MM"形式に整形
          }));
        }
      } catch (error) {
        console.error('一覧の取得に失敗しました。', error);
      }
    },

    // シフト編集モード
    editShift(shift) {
      this.editingShift = shift;
      // 選択したシフトのデータをshiftToUpdateに設定
      this.shiftToUpdate.id = shift.id;
      this.shiftToUpdate.date = shift.date;
      this.shiftToUpdate.startTime = shift.startTime;
      this.shiftToUpdate.endTime = shift.endTime;
    },

    // シフト更新
    async updateShift() {
      try {
        const updatedShift = {
          id: this.shiftToUpdate.id,
          date: this.shiftToUpdate.date,
          startTime: this.shiftToUpdate.startTime,
          endTime: this.shiftToUpdate.endTime
        };
        // 更新リクエストを送信
        const response = await this.$axios.put(`http://localhost/api/user_shift/${updatedShift.id}`, updatedShift);

        // 更新が成功した場合の処理
        console.log('シフトが更新されました:', response.data);

        // シフト一覧を再読み込み
        this.fetchShiftList();

        // 編集モードを終了
        this.editingShift = null;

      } catch (error) {
        console.error('シフトの更新に失敗しました', error);
      }
    },

    // 編集モードをキャンセル
    cancelEdit() {
      this.editingShift = null;
    },

    // フォームをクリア
    clearForm() {
      this.shiftData.date = '';
      this.shiftData.startTime = '';
      this.shiftData.endTime = '';
      this.editingIndex = null;
    },

    // シフト削除
    async deleteShift(shiftId) {
      try {
        const response = await this.$axios.delete(`http://localhost/api/user_shift/${shiftId}`);

        // 削除が成功した場合の処理
        console.log('シフトが削除されました:', response.data);

        // シフト一覧を再読み込み
        this.fetchShiftList();
      } catch (error) {
        console.error('シフトの削除に失敗しました', error);
      }
    },

    // ログアウト
    async logout() {
      try {
        await this.$auth.logout();
        this.$router.push("/users/login");
      } catch (error) {
        console.log(error);
      }
    },

    getDayOfWeek(date) {
      // 日にちに対応する曜日を計算
      const dayOfWeek = ['日', '月', '火', '水', '木', '金', '土'];
      const currentDate = new Date(date);
      const dayIndex = currentDate.getDay();
      const month = currentDate.getMonth() + 1; // 月は0から始まるため+1する
      const day = currentDate.getDate();
      return `${month}月${day}日（${dayOfWeek[dayIndex]}）`;
    },

    isShift(date, timeSlot) {
      const isShift = !this.shiftList.some((shift) => {
        const shiftDate = new Date(shift.date).toLocaleDateString();
        const compareDate = new Date(date).toLocaleDateString();
        const timeSlotInRange = shift.startTime <= timeSlot && shift.endTime >= timeSlot;

        return shiftDate === compareDate && timeSlotInRange;
      });

      return isShift;
    },
  }
}

</script>