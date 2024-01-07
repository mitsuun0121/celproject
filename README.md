# CELプロジェクト

・Child Edu Labolatoryという架空の会社のランディングページ

・管理画面／管理者用、ユーザー用


### `使用技術　環境構築`

`・フロントエンド`

  ・Nuxt.js　"nuxt": "^2.15.8"　"vue": "^2.7.10"
    
    $ npx create-nuxt-app <プロジェクト名>
    $ yarn install
    
`・バックエンド` 

  ・docker-compose.yml　version: '3.8'
  
  ・default.conf　nginx:1.21.1　- "80:80"
  
  ・Dockerfile　php:7.4.9-fpm
  
  ・php.ini
  
  ・Laravel8
  
    $ mkdir <プロジェクト名>
    $ mkdir docker src
    $ touch docker-compose.yml
    $ mkdir mysql nginx php
    $ mkdir mysql/data
    $ touch mysql/my.cnf
    $ touch nginx/default.conf
    $ touch php/Dockerfile
    $ touch php/php.ini
    $ docker-compose up -d --build
    $ docker-compose exec php bash
    $ composer create-project "laravel/laravel=8.*" . --prefer-dist

### `機能一覧`
  ※ユーザー＝カウンセラー

  ・無料カウンセリング予約
  
  　◦ 日程を選択、顧客情報を入力、DBに保存ができる<br><br>
  

  ・メール送信  
    
  　◦ 無料カウンセリングが予約されたら、顧客と担当ユーザーにメールが送信される
  
  　◦ カウンセリング当日に顧客にリマインドメールが送信される<br><br>
   
  
  ・マルチログイン（管理者）
  
  　◦ ユーザーのアカウントの作成、削除ができる
  
  　◦ ユーザーのカウンセリングの予定の確認ができる
  
  　◦ 全顧客リストの確認と顧客の検索ができる<br><br>
   

  ・マルチログイン（ユーザー）
  
  　◦ シフトの登録、変更、削除ができる
  
  　◦ 自分のカウンセリングの予定の確認、顧客の削除ができる<br><br>

   
### `テーブル設計`

usersテーブル

| カラム名 | 型 | primaryKey | Nullable | uniqueKey | 外部キー |
| --- | --- | --- | --- | --- | --- |
| id | unsigned bigint | 〇 |  |  |  |
| name | string |  |  |  |  |
| email | string |  |  | 〇 |  |
| password | string |  |  |  |  |
| gender | integer |  |  |  |  |
| user_id | unsigned bigint |  |  |  | 〇 |
| created_at | timestamp |  |  |  |  |
| updated_at | timestamp |  |  |  |  |
| delete_at | timestamp |  |  |  |  |
| api_token | string |  |  |  |  |

guestsテーブル

| カラム名 | 型 | primaryKey | Nullable | uniqueKey | 外部キー |
| --- | --- | --- | --- | --- | --- |
| id | unsigned bigint | 〇 |  |  |  |
| name | string |  |  |  |  |
| kana | string |  |  |  |  |
| email | string |  |  | 〇 |  |
| phone | string |  |  |  |  |
| gender | integer |  |  |  |  |
| message | string |  |  |  |  |
| date | date |  |  |  |  |
| timeSlot | time |  |  |  |  |
| user_id | unsigned bigint |  |  |  | 〇 |
| created_at | timestamp |  |  |  |  |
| updated_at | timestamp |  |  |  |  |
| delete_at | timestamp |  |  |  |  |

user_shiftsテーブル

| カラム名 | 型 | primaryKey | Nullable | uniqueKey | 外部キー |
| --- | --- | --- | --- | --- | --- |
| id | unsigned bigint | 〇 |  |  |  |
| users(id) | unsigned bigint |  |  |  | 〇 |
| guests(id) | unsigned bigint |  |  |  | 〇 |
| shift_date | date |  |  |  |  |
| start_time | time |  |  |  |  |
| end_time | time |  |  |  |  |
| created_at | timestamp |  |  |  |  |
| updated_at | timestamp |  |  |  |  |

adminsテーブル

| カラム名 | 型 | primaryKey | Nullable | uniqueKey | 外部キー |
| --- | --- | --- | --- | --- | --- |
| id | unsigned bigint | 〇 |  |  |  |
| name | string |  |  |  |  |
| email | string |  |  | 〇 |  |
| password | string |  |  |  |  |
| created_at | timestamp |  |  |  |  |
| updated_at | timestamp |  |  |  |  |

jobsテーブル

| カラム名 | 型 | primaryKey | Nullable | uniqueKey | 外部キー |
| --- | --- | --- | --- | --- | --- |
| id | bigintcrement | 〇 |  |  |  |
| queue | string |  |  |  |  |
| payload | longtext |  |  |  |  |
| attemps | unsigned tiny int |  |  |  |  |
| reserved_at | unsigned int |  |  |  |  |
| available_at | unsigned int |  |  |  |  |
| created_at | unsigned int |  |  |  |  |

# celproject
