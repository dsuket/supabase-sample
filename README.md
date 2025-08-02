# Next.js + Supabase ポータルサイト

Next.jsとSupabaseを使用したシンプルなポータルサイトのサンプルです。

## 機能

- ユーザー認証（サインアップ/ログイン）
- ダッシュボード
- プロフィール管理

## セットアップ

### 1. 依存関係のインストール

```bash
npm install
```

### 2. Supabaseプロジェクトの設定

1. [Supabase](https://supabase.com)でプロジェクトを作成
2. SQLエディタで以下のテーブルを作成：

```sql
-- プロフィールテーブルの作成
create table profiles (
  id uuid references auth.users on delete cascade not null primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  username text unique,
  full_name text,
  avatar_url text,
  bio text
);

-- RLSの有効化
alter table profiles enable row level security;

-- ポリシーの作成
create policy "Users can view own profile" on profiles
  for select using (auth.uid() = id);

create policy "Users can update own profile" on profiles
  for update using (auth.uid() = id);

create policy "Users can insert own profile" on profiles
  for insert with check (auth.uid() = id);
```

### 3. 環境変数の設定

`.env.local`ファイルを編集し、Supabaseの認証情報を設定：

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. 開発サーバーの起動

```bash
npm run dev
```

## 使い方

1. トップページから「新規登録」をクリックしてアカウントを作成
2. メールアドレスの確認後、ログイン
3. ダッシュボードでユーザー情報を確認
4. プロフィールページで情報を編集

## 技術スタック

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Supabase (認証・データベース)
- Lucide React (アイコン)