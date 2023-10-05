import Vue from 'vue';
import { ValidationProvider, ValidationObserver, extend, localize, } from 'vee-validate';
import ja from 'vee-validate/dist/locale/ja.json';

import { required, email, min, max } from 'vee-validate/dist/rules';

extend('required', {
  ...required,
  message: '{_field_}を入力してください',
});

extend('email', {
  ...email,
  message: '{_field_}の形式で入力してください',
});

extend('min', {
  ...min,
  message: '{_field_}は{length}文字以上で入力してください',
});

extend('max', {
  ...max,
  message: '{_field_}は{length}文字以下で入力してください',
});

extend('password', {
  validate: value => /^[a-zA-Z0-9]*$/.test(value),
  message: '{_field_}は半角英数字で入力してください'
});

extend('phone', {
  validate: value => /^[0-9]+$/.test(value),
  message: '{_field_}は半角数字ハイフンなしで入力してください'
});


Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);

// 日本語に設定
localize('ja', ja);
