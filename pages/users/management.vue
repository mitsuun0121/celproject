<template>
  <v-app>
    <v-app-bar app color="#fffff4" height="80px">
      <v-app-bar-nav-icon @click.stop="toggleSidebar"></v-app-bar-nav-icon>
      <v-toolbar-title v-if="$auth.loggedIn" style="letter-spacing: 0.05em;">Welcome {{ $auth.user.name }} さん</v-toolbar-title>
        <!-- 右側のアイコンやボタンなどを追加 -->
      <v-spacer></v-spacer>
      <v-btn v-if="$auth.loggedIn" @click="logout" style="padding: 20px; color: #ffffff; background-color: #fd5353;">ログアウト</v-btn>
    </v-app-bar>

    <!-- サイドバー -->
    <v-navigation-drawer app :width="270" color="#ebf8de" v-model="showSidebar">
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="font-weight-bold" style="font-size: 24px; position: absolute; top: 25px; color: #086d06; text-align: center; letter-spacing: 0.02em;">Child Edu Labolatory</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list style="position: absolute; top: 130px;">
        <v-list-item v-for="item in sidebarItems" :key="item.title" link @click="sidebarClick(item)" style="border-bottom: 1px solid #ccc;">
          <v-list-item-icon>
            <v-icon color="#3DAB3B">{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content style="width: 180px; color: #656565; letter-spacing: 0.1em; font-weight: bold;">
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- シフトフォーム／登録・編集・削除／を表示するテーブル -->
    <template v-if="showShiftList">
      <v-container style="margin-top: 110px; margin-right: 140px; max-width: 1000px;">

        <!-- ツールバー -->
        <v-toolbar style="height: 85px; background-color: #66BB6A;">
          <v-icon style="margin-top: 25px; margin-right: 30px; color: #ffffff;">mdi-view-list-outline</v-icon>
          <div style="font-size: 20px; font-weight: bold; color: #ffffff; letter-spacing: 0.1em; white-space: nowrap; margin-top: 25px;">シフト管理</div>
          <v-spacer></v-spacer>

          <!-- 年月とアイコンの表示 -->
          <v-icon @click="prevMonth" style="color: #ffffff; margin-top: 25px;">mdi-chevron-left-circle</v-icon>
          <div style="white-space: nowrap; font-size: 22px; font-weight: bold; color: #ffffff; margin-top: 25px; margin-left: 10px; margin-right: 10px; letter-spacing: 0.05em;">{{ currentYearMonth() }}</div>
          <v-icon @click="nextMonth" style="color: #ffffff; margin-top: 25px; margin-right: 160px;">mdi-chevron-right-circle</v-icon>
          <v-spacer></v-spacer>
        </v-toolbar>
       
        <!-- シフト設定の表示 -->
        <v-data-table @submit.prevent="userShift"
          :items="shiftTableDate()"
          :headers="shiftSettingHeaders" item-key="date"
          :options="{ itemsPerPage: 31 }" hide-default-footer style="height: 450px; overflow-y: auto; margin-top: 10px; border-bottom: 1px solid #e2e2e2;">

          <template v-slot:item="{ item }">
            <tr style="height: 50px;">
              <td :style="{ color: getDayColor(item.date), fontWeight: isWeekend(item.date) ? 'bold' : 'normal' }">
                {{ item.date.split('-')[2] }}<span :style="{ color: getDayColor(item.date) }">{{ getDayOfWeek(item.date) }}</span>
              </td>
              <td>
                <v-select
                  v-model="item.startTime"
                  :items="timeOptions" style="margin-top: -10px; margin-bottom: -18px;"></v-select>
              </td>
              <td>
                <v-select
                  v-model="item.endTime"
                  :items="timeOptions" style="margin-top: -10px; margin-bottom: -18px;"></v-select>
              </td>
              <td>
                <v-icon v-if="!item.shiftRegistered" @click="userShift(item)" :style="{ color: editable ? '#3DAB3B' : '#888888', cursor: editable ? 'pointer' : 'default' }">mdi-plus-thick</v-icon>
                <v-icon v-else :style="{ color: '#888888', cursor: 'default' }">mdi-plus-thick</v-icon>
              </td>
              <td>
                <v-icon v-if="item.shiftRegistered" @click="editShift(item)" :style="{ color: editable ? '#0E74D2' : '#888888', cursor: editable ? 'pointer' : 'default' }">mdi-pencil</v-icon>
                <v-icon v-else :style="{ color: '#888888', cursor: 'default' }">mdi-pencil</v-icon>
              </td>
              <td>
                <v-icon v-if="item.shiftRegistered" @click="deleteShift(item.id)" :style="{ color: editable ? '#f64949' : '#888888', cursor: editable ? 'pointer' : 'default' }">mdi-delete</v-icon>
                <v-icon v-else :style="{ color: '#888888', cursor: 'default' }">mdi-delete</v-icon>
              </td>
            </tr>
          </template>
        </v-data-table>
      </v-container>
    </template>

    <!-- Snackbar コンポーネントを表示 -->
    <v-snackbar v-model="snackbar.show" :color="snackbar.color" :timeout="snackbar.timeout" bottom>
      <div style="text-align: center; font-size: 16px; letter-spacing: 0.05em;">{{ snackbar.message }}</div>
    </v-snackbar>
  
    <v-container>
      <!-- 日付ピッカーを表示 -->
      <v-row justify="center" style="margin-top: 130px; margin-left: 170px;">
        <v-col>
          <template v-if="reservationPicker">
            <v-date-picker v-model="selectedDate" @input="dateClick" :day-format="date => new Date(date).getDate()"
            color="green lighten-1" locale="en" elevation="10" width="400">
            </v-date-picker>
          </template>
        </v-col>

        <!-- 予約リスト -->
        <v-col>
          <template v-if="reservationList">
            <v-container style="margin-top: -10px; width: 500px;">
              <!-- ツールバー -->
              <v-toolbar style="height: 85px; background-color: #66BB6A; border-radius: 4px 4px 0 0;">
                <v-icon style="margin-right: 30px; color: #ffffff; margin-top: 25px;">mdi-calendar-month-outline</v-icon>
                <div style="font-size: 20px; font-weight: bold; color: #ffffff; letter-spacing: 0.05em; white-space: nowrap; margin-top: 25px;">予約リスト</div>
              </v-toolbar>

              <!-- 現在のページに対応する日付のデータを表示 -->
              <v-data-table :items="this.reservationData" :headers="reservetionHeaders" :show-no-data="false" hide-default-footer style=" border-bottom: 1px solid #e2e2e2;">
                <template v-slot:item="{ item }">
                  <tr style="height: 40px;">
                    <td style="font-size: 14px;">{{ formatTime(item.timeSlot) }}</td>
                    <td style="font-size: 14px;">{{ item.name }} 様</td>
                    <td><v-icon @click="guestDetails(item)" style="color: #3DAB3B;">mdi-information</v-icon></td>
                    <td><v-icon @click="guestDelete(item.id)" style="color: #f64949;">mdi-delete</v-icon></td>
                  </tr>
                </template>
                <template v-slot:no-data>
                  <!-- データがない場合のメッセージ -->
                  <div class="text-center" style="color: red; font-size: 16px;">
                    予約データがありません。
                  </div>
                </template>
              </v-data-table>

              <!-- 削除確認用のダイアログ -->
              <v-dialog v-model="deleteDialog" width="350">
                <v-card>
                  <v-card-title style="font-size: 18px;">削除確認</v-card-title>
                  <v-card-text>予約データを削除してもよろしいですか？</v-card-text>
                  <v-card-actions>
                    <v-btn @click="cancelDelete" style="font-size: 12px; font-weight: bold;">キャンセル</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn @click="deleteGuestId" style="font-size: 14px; font-weight: bold; color: #ffffff; background-color: #f64949;">OK</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-container>
          </template>
        </v-col>
      </v-row>
    </v-container>

    <!-- 詳細データ表示用のダイアログ -->
    <v-dialog v-model="guestDialog" width="500">
      <v-card style="padding-top: 10px; padding-bottom: 10px; background-color: #66BB6A;">
        <v-icon @click="closeDialog" style="margin-left: 467px; color: #ffffff;">mdi-close</v-icon>
        <v-card-text v-if="selectGuest">
          <v-container>
            <v-row>
              <v-col>
                <v-card style="padding: 20px;">
                  <v-card-text style="padding-left: 40px; padding-top: 30px;">
                    <p>日付 : {{ selectGuest.date }}</p>
                    <p>時間 : {{ formatTime(selectGuest.timeSlot) }}</p>
                    <p>名前 : {{ selectGuest.name }}</p>
                    <p>フリガナ : {{ selectGuest.kana }}</p>
                    <p>メールアドレス : {{ selectGuest.email }}</p>
                    <p>電話番号 : {{ selectGuest.phone }}</p>
                    <p>性別 : {{ formatGender(selectGuest.gender) }}</p>
                    <p>お問い合わせ内容 : {{ selectGuest.message }}</p>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>

  </v-app>
</template>

<script>

export default {

  layout: 'user',
  
  data() {
    return {

      daysOfWeek: ['日', '月', '火', '水', '木', '金', '土'],

      drawer: false,
      showShiftList: true,
      reservationPicker: false,
      reservationList: false,
      
      currentMonth: new Date(), // 初期値は今日の日付
      editable: true,
      showSidebar: true, // サイドバーの表示状態
      user_id: null,  // またはデフォルトの担当者を設定
      shiftList: [], // シフト情報の一覧を保存する配列
      userList: [], // カウンセラーのデータを格納する配列

      selectedDate: null,
      clickedDate: null,
      guestList: [], // 予約データを格納する配列
      reservationData: [],

      guestDialog: false, // 詳細情報を非表示
      selectGuest: null, // 選択した予約データを格納

      deleteDialog: false,
      selectedId: null,

      // スナックバー
      snackbar: {
        show: false,
        message: '',
        color: 'success', // デフォルトの色を指定
        timeout: 3000,
      },

      timeOptions: [
        '',
        '10:00',
        '11:00',
        '12:00',
        '13:00',
        '14:00',
        '15:00',
        '16:00',
        '17:00',
        '18:00',
      ],

      // サイドバーのリスト
      sidebarItems: [
        { title: 'シフト管理', icon: 'mdi-view-list' },
        { title: '予約リスト', icon: 'mdi-calendar-month' },
      ],

      // シフトデータの登録・編集・削除テーブルのヘッダー
      shiftSettingHeaders: [
        { text: '日付', value: 'date', sortable: false },
        { text: '開始時間', value: 'startTime', sortable: false },
        { text: '終了時間', value: 'endTime', sortable: false },
        { text: '登録', value: 'actions', sortable: false },
        { text: '編集', value: 'actions', sortable: false },
        { text: '削除', value: 'actions', sortable: false },
      ],

      // 予約データのテーブルのヘッダー
      reservetionHeaders: [
        { text: '時間', value: 'timeslot', sortable: false },
        { text: 'お名前', value: 'name' , width: '200px', sortable: false },
        { text: '詳細', value: 'actions', sortable: false },
        { text: '削除', value: 'actions', sortable: false },
      ],

    };
  },

  mounted() {
    this.fetchShiftList();
    this.fetchGuestList();
    this.shiftTableDate();
  },

  // 当日の予約データを取得
  created() {
    this.todayReservaition(); // 当日の日付を設定
    this.fetchGuestList();
  
  },

  methods: {

    // ツールバー内の年月を表示するメソッド
    currentYearMonth() {
      const options = { year: 'numeric', month: 'long' };
      const currentPageMonth = new Date(this.currentMonth);
      currentPageMonth.setMonth(currentPageMonth.getMonth(), 1);
      return currentPageMonth.toLocaleDateString('ja-JP', options);
    },

    // 1ヶ月分のシフトを表示するテーブル
    shiftTableDate() {
      const firstDayOfMonth = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth(), 2);// 2で月初日を設定　※1に設定するとなぜか前月の最終日から取得する
      const endDate = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth() + 1); // + 1で1ヶ月分を取得

      const dateList = [];
      let currentDate = new Date(firstDayOfMonth);

      // 登録されたシフトデータを表示
      while (currentDate <= endDate) {
        const existingShift = this.shiftList.find(shift => shift.date === currentDate.toISOString().split('T')[0]);

        dateList.push({
          id: existingShift ? existingShift.id : '',
          date: currentDate.toISOString().split('T')[0],
          startTime: existingShift ? existingShift.startTime : '',
          endTime: existingShift ? existingShift.endTime : '',
          shiftRegistered: existingShift ? true : false, // シフトが登録されているかどうか
        });

        currentDate.setDate(currentDate.getDate() + 1); // 変更しないこと
      }
      return dateList;
    },

    // 次の月を表示する
    nextMonth() {
      this.currentMonth.setMonth(this.currentMonth.getMonth() + 1);
      this.$forceUpdate();
    },
    // 前の月を表示する
    prevMonth() {
      this.currentMonth.setMonth(this.currentMonth.getMonth() - 1);
      this.$forceUpdate();
    },


    // 土日の日にちの色を変更
    getDayColor(date) {
      const dayIndex = new Date(date).getDay();
      return dayIndex === 0 ? 'red' : (dayIndex === 6 ? 'blue' : 'black');
    },

    isWeekend(date) {
      const dayIndex = new Date(date).getDay();
      return dayIndex === 0 || dayIndex === 6; // 日曜日または土曜日なら true
    },

    // 曜日を表示する
    getDayOfWeek(date) {
      const days = ['（日）', '（月）', '（火）', '（水）', '（木）', '（金）', '（土）'];
      const dayIndex = new Date(date).getDay();
      return days[dayIndex];
    },

    // 土日の曜日の色を変更
    getDayColor(date) {
      const dayIndex = new Date(date).getDay();
      return dayIndex === 6 ? 'blue' : (dayIndex === 0 ? 'red' : 'inherit');
    },

    // サイドバーの表示・非表示
    toggleSidebar() {
      this.showSidebar = !this.showSidebar;
    },

    // サイドバーの項目クリックメソッド
    sidebarClick(item) {
      if (item.title === 'シフト管理') {
        this.showShiftList = !this.showShiftList;
        this.reservationPicker = false;
        this.reservationList = false;
        
      } else if (item.title === '予約リスト') {
        this.reservationList = !this.reservationList;
        this.reservationPicker = !this.reservationPicker;
        this.showShiftList = false;
        
      }
    },

    // ログアウト
    async logout() {
      try {
        // フロント側でのログアウト処理
        await this.$auth.logout();

        // ローカルストレージからトークンを削除
        localStorage.removeItem('access_token');

        this.$router.push("/login");
      } catch (error) {
        console.log(error);
      }
    },

    // 今日の日付を取得
    isToday(date) {
      const today = new Date(Date.now() + 9 * 3600000).toISOString().split('T')[0];
      return date === today;
    },

    // 開始時間と終了時間の設定が正しいか
    shiftValid(item) {
      if (!item.startTime || !item.endTime) {
        this.showSnackbar({ message: '開始時間と終了時間を選択してください。', color: 'warning' });
        return false;
      }

      const startTime = new Date(`2000-01-01T${item.startTime}`);
      const endTime = new Date(`2000-01-01T${item.endTime}`);

      if (startTime >= endTime) {
        this.showSnackbar({ message: '終了時間が開始時間よりも早く設定されています。', color: 'warning' });
        return false;
      }
      return true;
    },

    // snackbar
    showSnackbar({ message, color }) {
      this.snackbar.message = message;
      this.snackbar.color = color || 'success'; // デフォルトの色
      this.snackbar.show = true;
    },
    
    // シフト登録
    async userShift(item) {
      if (this.editable && this.shiftValid(item)) {
        try {
          const shiftData = {
            shift_date: item.date,
            start_time: item.startTime,
            end_time: item.endTime
          };
          const response = await this.$axios.post('http://localhost/api/user_shift', shiftData);

          console.log('シフトが登録されました。', response.data);
          this.showSnackbar({ message: 'シフトが登録されました。', color: 'success' });

          this.fetchShiftList();

        } catch (error) {
          console.error('シフトの登録に失敗しました。', error);
          this.showSnackbar({ message: 'シフトの登録に失敗しました。', color: 'error' });
        }
      }
    },

    // シフト編集
    async editShift(item) {
      if (this.shiftValid(item)) {
        try {
          const shiftData = {
            id: item.id,
            date: item.date,
            startTime: item.startTime,
            endTime: item.endTime,
          };
          const response = await this.$axios.put(`http://localhost/api/user_shift/${shiftData.id}`, shiftData);

          console.log('シフトが更新されました:', response.data);

          this.fetchShiftList();

          this.showSnackbar({ message: 'シフトが更新されました。', color: 'info' });

        } catch (error) {
          console.error('シフトの更新に失敗しました', error);
          this.showSnackbar({ message: 'シフトの更新に失敗しました。', color: 'error' });
        }
      }
    },
    
    // シフト削除
    async deleteShift(id) {
      try {
        const response = await this.$axios.delete(`http://localhost/api/user_shift/${id}`);
          
        console.log('シフトが削除されました:', response.data);
          
        this.fetchShiftList();

        this.showSnackbar({ message: 'シフトが削除されました。', color: 'error' });

      } catch (error) {
        console.error('シフトの削除に失敗しました', error);
        this.showSnackbar({ message: 'シフトの削除に失敗しました。', color: 'error' });
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

    // 当日の日付を設定
    todayReservaition() {
      const today = new Date().toISOString().split('T')[0];
      this.selectedDate = today;
      this.clickedDate = today;
    },

    // クリックされた日付の予約データを表示
    dateClick() {
      this.clickedDate = this.selectedDate;
      console.log('選択された日付:', this.clickedDate);

      this.fetchGuestList();
    },

    // カウンセリング予約一覧を取得
    async fetchGuestList() {
      try {
        const response = await this.$axios.get('http://localhost/api/guest');

        const loginUser = this.$auth.user.id;

        const guestList = response.data;
        this.guestList = guestList;

        console.log('Guest List:', guestList);
        // 自分の担当のユーザーIDに紐づく予約データだけを抽出
        const personGuestList = guestList.filter(guest => guest.user_id === loginUser);

        this.reservationData = personGuestList.filter(item => item.date === this.clickedDate);

        this.reservationData.sort((a, b) => {
          const timeA = new Date(`1970/01/01 ${a.timeSlot}`);
          const timeB = new Date(`1970/01/01 ${b.timeSlot}`);
          return timeA - timeB;
        });
        console.log('Sorted Reservation Data:', this.reservationData);

      } catch (error) {
        console.error('予約データの取得に失敗しました', error);
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
      this.guestDialog = true;
    },

    // ダイアログを閉じる
    closeDialog() {
      this.guestDialog = false;
      this.selectGuest = null;
    },

    // 削除確認ダイアログを開く
    guestDelete(itemId) {
      this.selectedId = itemId;
      this.deleteDialog = true;
    },

     // 削除処理を実行
    deleteGuestId() {
      this.deleteGuest(this.selectedId);
      this.deleteDialog = false;
    },

    // キャンセル時の処理
    cancelDelete() {
      this.selectedId = null;
      this.deleteDialog = false;
    },

    // ゲスト情報を削除
    async deleteGuest(guestId) {
      try {
        const response = await this.$axios.delete(`http://localhost/api/guest/${guestId}`);

        // 削除が成功した場合の処理
        console.log('予約データが削除されました:', response.data);
        this.showSnackbar({ message: '予約データが削除されました。', color: 'error' });

        // ゲスト一覧を再読み込み
        this.fetchGuestList();
      } catch (error) {
        console.error('ゲストの削除に失敗しました', error);
      }
    },

  },
};
</script>
