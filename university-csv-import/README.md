# 大学サッカー部データ CSV→Firebase インポート手順

## 📋 概要

CSVファイル「お品書き最新 秋山作業用.csv」のデータをFirebaseに投入するためのツールです。

## 🚀 セットアップ手順

### 1. 必要なファイルの準備

以下のファイルを同じフォルダに配置してください：

```
project-folder/
├── csv-to-firebase.js          # メインの変換・投入スクリプト
├── test-conversion.js          # テスト用スクリプト
├── package.json                # Node.js依存関係
├── serviceAccountKey.json      # Firebase認証情報（要作成）
├── お品書き最新  秋山作業用.csv # CSVデータファイル
└── README.md                   # この手順書
```

### 2. Firebase認証情報の設定

1. Firebase Console (https://console.firebase.google.com/) にアクセス
2. プロジェクトを選択
3. 「プロジェクト設定」→「サービスアカウント」→「新しい秘密鍵の生成」
4. ダウンロードしたJSONファイルを `serviceAccountKey.json` として保存

### 3. Node.js依存関係のインストール

```bash
npm install
```

## 🧪 変換テスト（推奨）

実際にFirebaseに投入する前に、データ変換が正しく動作するかテストします：

```bash
npm run test-conversion
```

または

```bash
node test-conversion.js
```

### テスト結果の確認ポイント

- ✅ 大学名が正しく変換されているか
- ✅ リーグ名が正規化されているか
- ✅ Boolean値（寮の有無など）が正しく変換されているか
- ✅ 数値データ（部員数、J内定数など）が正しく変換されているか
- ✅ PLAYMAKERコメントが正しく設定されているか

## 🔥 Firebase投入

### 方法1: 対話式実行（推奨）

```bash
npm run import
```

実行すると以下の確認画面が表示されます：

```
📋 大学サッカー部データ CSV→Firebase インポートツール
📄 CSVファイル: ./お品書き最新  秋山作業用.csv
🔥 Firebase プロジェクト: あなたのプロジェクト

🚀 CSVファイル読み込み開始...
📊 302行のデータを読み込みました
  ✓ 関西学院大学 を変換
  ✓ 阪南大学 を変換
  ✓ 関西大学 を変換
  ...

📝 300校のデータを準備完了

=== 投入予定データサンプル ===
1. 関西学院大学
   リーグ: 関西学生サッカーリーグ1部
   部員数: 116名
   J内定: 10名

🔥 Firebaseに300校のデータを投入しますか？ (y/n)
```

### 方法2: 直接実行

```bash
node csv-to-firebase.js "./お品書き最新  秋山作業用.csv"
```

## 📊 投入後の確認

投入完了後、Firebaseコンソールで以下を確認してください：

1. **Firestore Database** → **universities** コレクション
2. ドキュメント数が想定通りか（300校程度）
3. サンプルドキュメントの構造が正しいか

## 🔧 トラブルシューティング

### エラー：「serviceAccountKey.json not found」

Firebase認証ファイルが正しく配置されていません。
上記「Firebase認証情報の設定」を再度確認してください。

### エラー：「Permission denied」

Firebase Firestoreのルールで書き込み権限が制限されています。
Firebase Console → Firestore → ルール で一時的に書き込みを許可してください：

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true; // 一時的に全権限を許可
    }
  }
}
```

**⚠️ 注意：本番運用前に適切なセキュリティルールに戻してください**

### エラー：「CSV parsing failed」

CSVファイルの文字コードやフォーマットに問題がある可能性があります。
以下を確認してください：

- ファイルがUTF-8エンコードか
- カンマ区切り形式（CSV）か
- ヘッダー行が正しく設定されているか

## 📁 出力ファイル

### sample-converted-data.json

テスト実行時に作成される、変換後データのサンプルファイルです。
Firebase投入前に構造を確認できます。

## 🔄 データ更新時の手順

CSVデータが更新された場合：

1. 新しいCSVファイルを配置
2. テスト実行で変換を確認
3. 必要に応じてFirestoreの既存データを削除
4. 新しいデータを投入

### 既存データの削除

```bash
# Firestore コンソールで手動削除
# または、削除スクリプトを実行（別途作成が必要）
```

## 📈 データ構造説明

変換後のFirestoreドキュメント構造：

```javascript
{
  id: 1,
  university_name: "関西学院大学",
  area: "関西",
  location: "大阪府・京都府・兵庫県・奈良県他",
  academic_rank: "B：上位私大",
  genres: ["A：大学経由でプロを目指したい", "D：学生主体の活動..."],
  soccer_club: {
    league: "関西学生サッカーリーグ1部",
    coach_name: "早﨑 義晃",
    total_members: 116,
    j_league_nominees_2022_24: 10, // 3年分の合計
    dorm_available: false,
    // ...その他の情報
  },
  entry_conditions: {
    sports_recommend: true,
    recommend_criteria: "評定3.3以上、受入人数8名程度",
    // ...その他の条件
  },
  extended_data: {
    playmaker_comment: "関西の超名門校。選手の自主性を重んじ...",
    career_paths: [...]
  }
}
```

## ⚡ 次のステップ

データ投入完了後：

1. **React アプリの更新**：大学詳細ページをCSVデータ構造に合わせて修正
2. **検索機能の調整**：新しいフィールド（エリア、学力ランク等）に対応
3. **フィルター機能の拡張**：ジャンル、学力ランクによるフィルタリング追加
4. **データ表示の改善**：PLAYMAKERコメント、詳細な入部条件等の表示

## 📞 サポート

問題が発生した場合は、以下の情報を含めてお知らせください：

- エラーメッセージの全文
- 実行環境（Node.jsバージョン等）
- CSVファイルの状態（行数、文字コード等）
- Firebase プロジェクトの設定状況