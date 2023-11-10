<template>
  <div>
    <div class="container">
      <h2>ログイン状態:{{ $auth.loggedIn }}</h2>
      <p v-if="$auth.loggedIn">ユーザー名 : {{ $auth.user.name }}</p>
    </div>
    <a @click="logout">Logout</a>
    <div>
      <h2>シフト登録</h2>
      <form @submit.prevent="userShift">
        <label for="shift_date">日付</label>
        <input type="date" name="shift_date" id="shift_date" v-model="shiftData.date">
        <label for="start_time">開始時間</label>
        <select name="start_time" id="start_time" v-model="shiftData.startTime">
          <option value="09:00">09:00</option>
          <option value="10:00">10:00</option>
          <option value="11:00">11:00</option>
        </select>
        <label for="end_time">終了時間</label>
        <select name="end_time" id="end_time" v-model="shiftData.endTime">
          <option value="16:00">16:00</option>
          <option value="17:00">17:00</option>
          <option value="18:00">18:00</option>
        </select>

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
        <select name="start_time" id="start_time" v-model="shiftToUpdate.startTime">
            <option value="09:00">09:00</option>
            <option value="10:00">10:00</option>
            <option value="11:00">11:00</option>
          </select>
          <label for="end_time">終了時間</label>
          <select name="end_time" id="end_time" v-model="shiftToUpdate.endTime">
            <option value="16:00">16:00</option>
            <option value="17:00">17:00</option>
            <option value="18:00">18:00</option>
          </select>
        <button type="submit">更新</button>
        <button @click="cancelEdit">キャンセル</button>
      </form>
    </div>

    <div>
      <h2>カウンセリング予約一覧</h2>
      <ul>
        <li v-for="guest in guestList" :key="guest.id">
          {{ guest.date }} - {{ formatTime(guest.timeSlot) }}
          <button @click="guestDetails(guest)">詳細</button>
          <button @click="deleteGuest(guest.id)">削除</button>
          <span>担当カウンセラー：{{ counselorName(guest.id.user_id) }}</span>
        </li>
      </ul>
    </div>
    <!-- 詳細データ表示用のモーダルウィンドウ -->
    <div v-if="guestModal">
      <div>
        <h2>予約詳細</h2>
        <p>日付: {{ selectGuest.date }}</p>
        <p>時間: {{ formatTime(selectGuest.timeSlot) }}</p>
        <p>名前: {{ selectGuest.name }}</p>
        <p>フリガナ: {{ selectGuest.kana }}</p>
        <p>メールアドレス: {{ selectGuest.email }}</p>
        <p>電話番号: {{ selectGuest.phone }}</p>
        <p>性別: {{ formatGender(selectGuest.gender) }}</p>
        <p>お問い合わせ内容: {{ selectGuest.message }}</p>
        <button @click="closeModal">閉じる</button>
      </div>
    </div>

  </div>
</template>

<script>
import axios from '~/plugins/axios';


export default {
  
  layout: 'user',
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

      allShiftList: [],
      shiftList: [], // シフト情報の一覧を保存する配列
      guestList: [], // 予約データを格納する配列
      userList: [], // カウンセラーのデータを格納する配列
      guestModal: false, // 詳細情報を非表示
      selectGuest: null, // 選択した予約データを格納

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
    this.personUser();
  },

  created() {
    this.fetchguestList();
    this.fetchUserList();
    this.fetchAllShiftList();
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

    // カウンセリング予約一覧を取得
    async fetchguestList() {
      try {
        const response = await this.$axios.get('http://localhost/api/guest');
        const guestList = response.data;
        this.guestList = guestList;
        return guestList;

      } catch (error) {
        console.error('予約データの取得に失敗しました', error);
      }
    },

    // ゲスト情報を削除
    async deleteGuest(id) {
      try {
        const response = await this.$axios.delete(`http://localhost/api/guest/${id}`);

        // 削除が成功した場合の処理
        console.log('ゲストが削除されました:', response.data);

        // ゲスト一覧を再読み込み
        this.fetchguestList();
      } catch (error) {
        console.error('ゲストの削除に失敗しました', error);
      }
    },

    // 予約時間の秒を表示しないように設定
    formatTime(timeSlot) {
      return timeSlot.slice(0, 5); // "HH:mm" 形式に整形
    },

    // 数値で取得されている性別を変換
    formatGender(gender) {
      if (gender === 1) {
        return '男性';
      } else if (gender === 2) {
        return '女性';
      } else {
        return '無回答'; // 1、2以外の値の場合
      }
    },

    // 詳細情報を表示
    guestDetails(guest) {
      this.selectGuest = guest;
      this.guestModal = true;
    },

    // モーダルウィンドウを閉じる
    closeModal() {
      this.guestModal = false;
      this.selectGuest = null;
    },

    // カウンセリングを担当する場合の処理
    async personUser() {
      try {
        const userList = await this.fetchUserList();        
        const allShiftList = await this.fetchAllShiftList();
        const counselors = userList.filter(user => {
          return allShiftList[user.id] && Object.keys(allShiftList[user.id]).length > 0;
        });

        if (counselors.length > 0) {
          const randomIndex = Math.floor(Math.random() * counselors.length);
          const selectedCounselor = counselors[randomIndex];

          // カウンセラーを設定
          const newUserId = selectedCounselor.id;
          
          // カウンセリング予約とカウンセラーを紐づける
          await this.$axios.put(`http://localhost/api/guest/`, { user_id: newUserId });
          console.log('カウンセラーが選択されました。', 'カウンセラーのID:', selectedCounselor.id);
        } else {
          console.error('カウンセラーが見つかりません');
        }
      } catch (error) {
        console.error('カウンセラーの設定に失敗しました', error);
      }
    },

    // カウンセラーのデータを取得
    async fetchUserList() {
      try {
        const response = await this.$axios.get(`http://localhost/api/user/`);
        const userList = response.data;
        this.userList = userList;
        return userList;

      } catch (error) {
        console.error('カウンセラーの取得に失敗しました', error);
      }
    },

    // 担当カウンセラーの名前を表示
    counselorName(userId) {
      const counselor = this.userList.find(user => user.id === userId);
      return counselor ? counselor.name : '未定';
    },

    // 全シフトデータを取得する関数
    async fetchAllShiftList() {
      try {
        const response = await this.$axios.get('http://localhost/api/all_shift');
        if (response && response.data && Array.isArray(response.data)) {
          this.allShiftList = response.data.map(shift => ({
            userId: shift.user_id,
            date: shift.shift_date ? shift.shift_date.split(' ')[0] : '日付なし', // 日付を"YYYY-MM-DD"形式に整形
            startTime: shift.start_time ? shift.start_time.slice(0, 5) : '00:00', // 時間を"HH:MM"形式に整形
            endTime: shift.end_time ? shift.end_time.slice(0, 5) : '00:00', // 時間を"HH:MM"形式に整形
          }));

          const allShiftList = {};

          this.allShiftList.forEach(shift => {
            const userId = shift.userId;
            const date = shift.date;
            const startTime = shift.startTime;
            const endTime = shift.endTime;

            // 必要なプロパティが存在しない場合は初期化する
            if (!allShiftList[userId]) {
              allShiftList[userId] = {};
            }
            if (!allShiftList[userId][date]) {
              allShiftList[userId][date] = {};
            }

            // 対応する時間帯にシフト情報を設定
            for (let time = startTime; time <= endTime; time = this.nextTimeSlot(time)) {
              if (!allShiftList[userId][date][time]) {
                allShiftList[userId][date][time] = [];
              }
              allShiftList[userId][date][time].push({ userId });
            }
          });
          return allShiftList;
        }
      } catch (error) {
        console.error('一覧の取得に失敗しました。', error);
      }
    },

    nextTimeSlot(time) {
      // 次の時間帯を計算するヘルパーメソッド
      // 例: '10:00' -> '11:00'
      const [hours, minutes] = time.split(':');
      const nextHours = parseInt(hours, 10) + 1;
      return `${nextHours.toString().padStart(2, '0')}:${minutes}`;
    },

  }
} 

</script>

<style scoped>
.container {
  font-family: "Roboto";
  width: 100%;
  height: auto;
}
</style>
