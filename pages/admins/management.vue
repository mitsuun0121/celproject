<template>
  <v-app>
    <v-app-bar app color="#fffff4" height="80px">
      <v-app-bar-nav-icon @click.stop="toggleSidebar"></v-app-bar-nav-icon>
      <v-toolbar-title v-if="$auth.loggedIn" style="letter-spacing: 0.05em;">Welcome {{ $auth.user.user.name }}
        さん</v-toolbar-title>
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

    <!-- Snackbar コンポーネントを表示 -->
    <v-snackbar v-model="snackbar.show" :color="snackbar.color" :timeout="snackbar.timeout" bottom>
      <div style="text-align: center; font-size: 16px; letter-spacing: 0.05em;">{{ snackbar.message }}</div>
    </v-snackbar>

    <!-- アカウント管理 -->
    <template v-if="settingAccount">
      <v-container style="max-width: 900px;">
        <v-row justify="center" style="margin-top: 200px;">

          <!-- 登録フォーム -->
          <v-col cols="12" sm="8" md="6">
            <v-card class="elevation-12" style="height: 350px; background-color: #fbfbfb;">

              <!-- ツールバー -->
              <v-toolbar color="#66BB6A" style="height: 85px;">
                <v-icon color="#ffffff" style="margin-top: 25px; margin-left: 10px;">mdi-account-circle</v-icon>
                <v-toolbar-title class="ml-8" style="font-size: 20px; font-weight: bold; color: #ffffff; letter-spacing: 0.1em; white-space: nowrap; margin-top: 25px;">アカウント管理</v-toolbar-title>
              </v-toolbar>

              <v-card-text class="text-center">
                <div style="margin-top: 40px; margin-right: 27px;"><v-icon color="#3DAB3B" style="margin-right: 10px;">mdi-account</v-icon><v-btn @click="toggleRegister" color="#3DAB3B" style="font-size: 16px; color: #ffffff; letter-spacing: 0.12em; padding: 25px 42px;">新規登録</v-btn>
                </div>
              </v-card-text>
              <v-card-text class="text-center">
                <div style="margin-top: 15px; margin-right: 30px;"><v-icon color="#fd5353" style="margin-right: 10px;">mdi-account-remove</v-icon>
                <v-btn @click="toggleDeleteAccount" color="#fd5353" style="font-size: 16px; color: #ffffff; padding: 25px 18px;">アカウント削除</v-btn>
                </div>
              </v-card-text> 
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </template>

    <!-- 新規登録 -->
    <template v-if="register">
      <v-container style="width: 950px;">
        <v-row justify="center" style="margin-top: 80px;">

          <!-- 登録フォーム -->
          <v-col cols="12" sm="8" md="6">
            <v-card class="elevation-12" style="height: 570px; background-color: #fbfbfb;">

              <!-- ツールバー -->
              <v-toolbar color="#66BB6A" style="height: 85px;">
                <v-icon color="#ffffff" style="margin-top: 25px; margin-left: 10px;">mdi-account</v-icon>
                <v-toolbar-title class="ml-8" style="font-size: 20px; font-weight: bold; color: #ffffff; letter-spacing: 0.08em; white-space: nowrap; margin-top: 25px;">新規登録</v-toolbar-title>
              </v-toolbar>

              <v-card-text class="text-center">
                <v-form @submit.prevent="userRegister" ref="registerserver">
                  <v-text-field v-model="name" label="名前" outlined required :rules="nameRules" class="mb-1" style="margin-top: 20px; margin-left: 30px; margin-right: 30px;"></v-text-field>
                  <v-select v-model="gender" :items="genders" label="性別" outlined required :rules="genderRules" class="mb-1" style="margin-left: 30px; margin-right: 30px;"></v-select>
                  <v-text-field v-model="email" label="メールアドレス" outlined required :rules="emailRules" class="mb-1" style="margin-left: 30px; margin-right: 30px;"></v-text-field>
                  <v-text-field v-model="password" label="パスワード" type="password" outlined required :rules="passwordRules" class="mb-1" style="margin-left: 30px; margin-right: 30px;"></v-text-field>
                  <v-btn @click="userRegister()" color="#3DAB3B" class="mr-9" style="font-size: 18px;  padding: 25px 30px; color: #ffffff; margin-bottom: 100px; margin-left: 115px;">登 録</v-btn>
                  <v-btn @click.prevent="resetForm" style="margin-bottom: 100px;">クリア</v-btn>
                </v-form>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </template>

    <!-- アカウント削除 -->
    <template v-if="deleteCounselor">
      <v-container>
        <v-row justify="center" style="margin-top: 108px;margin-left: 180px;  width: 800px;">
          <v-card class="elevation-10" style="height: 545px; background-color: #fbfbfb;">
            
            <v-toolbar color="#66BB6A" style="height: 85px;">
              <v-icon color="#ffffff" style="margin-top: 25px; margin-left: 10px;">mdi-account-settings</v-icon>
              <v-toolbar-title class="ml-8" style="font-size: 20px; font-weight: bold; color: #ffffff; letter-spacing: 0.1em; white-space: nowrap; margin-top: 25px;">アカウント削除</v-toolbar-title>
            </v-toolbar>

            <!-- カウンセラーリストの内容 -->
            <v-card style="overflow-y: auto; height: 430px; margin-top: 15px; margin-left: 30px; margin-right: 30px;">
              <v-data-table v-if="userList.length > 0" :items="userList" :headers="deleteCounselorHeaders" :options="{ itemsPerPage: 50 }" hide-default-footer>
                <template v-slot:item="{ item }">
                  <tr>
                    <td>{{ item.name }}</td>
                    <td>{{ formatGender(item.gender) }}</td>
                    <td>{{ item.email }}</td>
                    <td>
                      <v-icon @click="userDelete(item.id)" style="color: #fd5353">mdi-account-remove</v-icon>
                    </td>
                  </tr>
                </template>
              </v-data-table>

              <!-- 削除確認用のダイアログ -->
              <v-dialog v-model="deleteDialog" width="350">
                <v-card>
                  <v-card-title style="font-size: 18px;">削除確認</v-card-title>
                  <v-card-text>アカウントを削除してもよろしいですか？</v-card-text>
                  <v-card-actions>
                    <v-btn @click="cancelDelete" style="font-size: 12px; font-weight: bold;">キャンセル</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn @click="deleteUserId" style="font-size: 14px; font-weight: bold; color: #ffffff; background-color: #f64949;">OK</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-card>
          </v-card>
        </v-row>
      </v-container>
    </template>
        
    <template>
      <v-container>
        <v-row justify="center" style="margin-top: 80px; margin-left: 200px; width: 425px;">
          <!-- カウンセラー選択 -->
          <v-col>
            <template v-if="counselorList">
            <v-select
              v-model="selectedCounselor"
              :items="userList"
              item-text="name"
              item-value="id"
              label="カウンセラーを選択"
              @change="reservationListData"
            ></v-select>
            </template>
          </v-col>
        </v-row>
        
        <v-row justify="center" style="margin-top: -30px; margin-left: 200px;">
          <!-- 日付ピッカー -->
          <v-col>
            <template v-if="reservationPicker">
              <v-date-picker
                v-model="selectedDate"
                @input="dateClick"
                :day-format="date => new Date(date).getDate()"
                color="green lighten-1"
                locale="en"
                elevation="10"
                width="400"
              ></v-date-picker>
            </template>
          </v-col>

          <!-- 予約リスト -->
          <v-col>
            <template v-if="reservationList">
              <v-container style="margin-top: -10px; width: 450px;">
                <!-- ツールバー -->
                <v-toolbar style="height: 85px; background-color: #66BB6A; border-radius: 4px 4px 0 0;">
                  <v-icon style="margin-right: 30px; color: #ffffff; margin-top: 25px;">mdi-account-details</v-icon>
                  <div style="font-size: 20px; font-weight: bold; color: #ffffff; letter-spacing: 0.05em; white-space: nowrap; margin-top: 25px;">予約リスト</div>
                </v-toolbar>

                <!-- 現在のページに対応する日付のデータを表示 -->
                <v-data-table :items="this.reservationData" :headers="reservetionHeaders" :show-no-data="false" hide-default-footer style="border-bottom: 1px solid #e2e2e2;">
                  <template v-slot:item="{ item }">
                    <tr style="height: 40px;">
                      <td style="font-size: 14px;">{{ formatTime(item.timeSlot) }}</td>
                      <td style="font-size: 14px;">{{ item.name }} 様</td>
                      <td><v-icon @click="guestDetails(item)" style="color: #3DAB3B;">mdi-information</v-icon></td>
                    </tr>
                  </template>
                  <template v-slot:no-data>
                    <!-- データがない場合のメッセージ -->
                    <div class="text-center" style="color: red; font-size: 16px;">
                      予約データがありません。
                    </div>
                  </template>
                </v-data-table>
              </v-container>
            </template>
          </v-col>
        </v-row>
      </v-container>
    </template>
              
    <!-- 詳細データのダイアログ -->
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

      name: '',
      gender: null,
      email: '',
      password: '',
      genders: ['男性', '女性'],

      // バリデーション実装
      nameRules: [
        v => !!v || '名前を入力してください',
        v => (v && v.length <= 50) || '名前は50文字以内で入力してください',
      ],
      genderRules: [
        v => !!v || '性別を選択してください',
      ],
      emailRules: [
        v => !!v || 'メールアドレスを入力してください',
        v => /.+@.+\..+/.test(v) || '有効なメールアドレスを入力してください',
      ],
      passwordRules: [
        v => !!v || 'パスワードを設定してください',
        v => (v && v.length >= 8) || 'パスワードは8文字以上で入力してください',
        v => /^(?=.*[0-9])(?=.*[a-zA-Z])/.test(v) || '半角英数字を組み合わせて入力してください',
      ],
      
      drawer: false,

      settingAccount: true,
      register: false,
      deleteCounselor: false,

      counselorList: false,
      reservationPicker: false,
      reservationList: false,

      formValided: false,
      
      currentMonth: new Date(), // 初期値は今日の日付
      showSidebar: true, // サイドバーの表示状態
      user_id: null,  // またはデフォルトの担当者を設定

      counselorListHeaders: [],
      
      guestDialog: false, // 詳細情報を非表示
      selectGuest: null, // 選択した予約データを格納

      selectedDate: null,
      clickedDate: null,
      guestList: [], // 予約データを格納する配列
      reservationData: [],

      userList: [], // カウンセラーのデータを格納する配列
      
      selectedCounselor: null,
      
      deleteDialog: false,
      selectedId: null,
      
      // スナックバー
      snackbar: {
        show: false,
        message: '',
        color: 'success', // デフォルトの色を指定
        timeout: 3000,
      },

      // サイドバーのリスト
      sidebarItems: [
        { title: 'アカウント管理', icon: 'mdi-account-circle' },
        { title: '予約リスト', icon: 'mdi-account-details' },
      ],

      // カウンセラーリストのテーブルヘッダー
      counselorListHeaders: [
        { text: '予約リスト', value: 'actions', sortable: false },
        { text: '名前', value: 'name' },
        { text: '性別', value: 'gender' },
      ],

      // カウンセラー削除のテーブルヘッダー
      deleteCounselorHeaders: [
        { text: '名前', value: 'name' },
        { text: '性別', value: 'gender' },
        { text: 'メールアドレス', value: 'email' },
        { text: '削除', value: 'actions', sortable: false },
      ],

      // 予約リストのテーブルのヘッダー
      reservetionHeaders: [
        { text: '時間', value: 'timeslot', width: '140px', sortable: false },
        { text: 'お名前', value: 'name', width: '180px', sortable: false },
        { text: '詳細', value: 'actions', sortable: false },
      ],

    };
  },

  mounted() {
    this.fetchUserList();
  },

  // 当日の予約データを取得
  created() {
    this.todayReservaition(); // 当日の日付を設定
    this.reservationCounselor();
  },

  methods: {

    // サイドバーの表示・非表示
    toggleSidebar() {
      this.showSidebar = !this.showSidebar;
    },

    // サイドバーの項目クリックメソッド
    sidebarClick(item) {
      if (item.title === 'アカウント管理') {
        this.settingAccount = !this.settingAccount;

        this.register = false;
        this.deleteCounselor = false;
        this.counselorList = false;
        this.reservationPicker = false;
        this.reservationList = false;
        
      } else if (item.title === '予約リスト') {
        this.counselorList = !this.counselorList;
        this.reservationPicker = !this.reservationPicker;
        this.reservationList = !this.reservationList;

        this.settingAccount = false;
        this.register = false;
        this.deleteCounselor = false;
      } 
    },

    // ログアウト
    async logout() {
      try {
        // ローカルストレージからトークンを削除
        localStorage.removeItem('access_token');

        // フロント側でのログアウト処理
        await this.$auth.logout();

        this.$router.push("/login");
      } catch (error) {
        console.log(error);
      }
    },

    // snackbar
    showSnackbar({ message, color }) {
      this.snackbar.message = message;
      this.snackbar.color = color || 'success'; // デフォルト
      this.snackbar.show = true;
    },

    // 性別を数値に変換
    genderToNumber(gender) {
      console.log('genderToNumber - input gender:', gender);
      if (gender === '男性') {
        console.log('genderToNumber - matched condition: 男性');
        return 1;
      } else if (gender === '女性') {
        console.log('genderToNumber - matched condition: 女性');
        return 2;
      } 
    },

    // フォームのバリデーションを実行するメソッド
    async validateForm() {
      return this.$refs.registerserver.validate();
    },

    // 新規登録フォームを開く
    toggleRegister() {
      this.register = !this.register;
      this.settingAccount = false;
    },

    // フォームリセット
    resetForm() {
      this.name = '';
      this.gender = null;
      this.email = '';
      this.password = '';
      this.$refs.registerserver.reset();
    },

    // カウンセラー新規登録
    async userRegister() {
      try {
        const converteGender = this.genderToNumber(this.gender);

        if (await this.validateForm()) {

            const response = await this.$axios.post(`http://localhost/api/user/register`, {
            name: this.name,
            gender: converteGender,
            email: this.email,
            password: this.password,
          });

          // 登録が成功したらフォームをクリア
          this.resetForm();
          this.register = false;
          this.settingAccount = true;
          console.log('カウンセラーが登録されました。', response.data);
          this.showSnackbar({ message: 'カウンセラーが登録されました。', color: 'success' });
        }
      } catch (error) {
        console.error('新規登録に失敗しました:', error);
        this.showSnackbar({ message: 'カウンセラーの登録に失敗しました。', color: 'error' });
      }
    },

    // カウンセラーの削除テーブルを開く
    toggleDeleteAccount() {
      this.deleteCounselor = !this.deleteCounselor;
      this.settingAccount = false;
    },

     // 削除確認ダイアログを開く
    userDelete(itemId) {
      this.selectedId = itemId;
      this.deleteDialog = true;
    },

    // 削除処理を実行
    deleteUserId() {
      this.deleteUser(this.selectedId);
      this.deleteDialog = false;
      this.deleteCounselor = false;
      this.settingAccount = true;
    },

    // キャンセル時
    cancelDelete() {
      this.selectedId = null;
      this.deleteDialog = false;
      this.deleteCounselor = false;
      this.settingAccount = true;
    },

    // カウンセラーを削除
    async deleteUser(userId) {
      try {
        const response = await this.$axios.delete(`http://localhost/api/user/${userId}`);

        // 削除が成功した場合の処理
        console.log('カウンセラーのデータが削除されました:', response.data);
        this.showSnackbar({ message: 'カウンセラーのデータが削除されました。', color: 'error' });
        
        this.fetchUserList();
        
      } catch (error) {
        console.error('カウンセラーの削除に失敗しました', error);
      }
    },

    // カウンセラーのデータを取得
    async fetchUserList() {
      try {
        const response = await this.$axios.get(`http://localhost/api/user/`);
        const userList = response.data;

        // 各カウンセラーの予約を取得
        for (const counselor of userList) {
          const reservations = await this.reservationCounselor(counselor.id);
          counselor.reservations = reservations;
        }
        this.userList = userList;

      } catch (error) {
        console.error('カウンセラーの取得に失敗しました', error);
      }
    },

    // 当日の日付を設定
    todayReservaition() {
      const today = new Date().toISOString().split('T')[0];
      this.selectedDate = today;
      this.clickedDate = today;
    },

    // クリックされた日付を取得
    dateClick() {
      this.clickedDate = this.selectedDate;
      console.log('選択された日付:', this.clickedDate);
      this.reservationCounselor(this.selectedCounselor);
    },

    // 選択されたカウンセラーの予約
    reservationListData(counselor) {
      console.log('選択されたカウンセラー:', counselor);
      console.log('ID:', counselor);

      if (counselor) {
        this.reservationCounselor(counselor);
        this.selectedCounselor = counselor;
        
      }
    },

    // 各カウンセラーの予約データを取得
    async reservationCounselor(counselorId) {
      try {
        const response = await this.$axios.get('http://localhost/api/guest');

        const guestList = response.data;
        
        // 指定したカウンセラーIDに紐づく予約データだけを抽出
        const personGuestList = guestList.filter(guest => guest.user_id === counselorId);

        console.log(`カウンセラー ${counselorId} の予約一覧:`, personGuestList);
        this.reservationData = personGuestList.filter(item => item.date === this.clickedDate);

        this.reservationData.sort((a, b) => {
          const timeA = new Date(`1970/01/01 ${a.timeSlot}`);
          const timeB = new Date(`1970/01/01 ${b.timeSlot}`);
          return timeA - timeB;
        });
        console.log('ソートされた予約データ:', this.reservationData);

        this.$forceUpdate();
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
        return ''; // 1、2以外の値の場合
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
    
  },
};
</script>
