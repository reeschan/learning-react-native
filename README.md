# Next.js 15 + TypeScript + App Router から Capacitor を使った iOS アプリ開発入門

## 環境準備

まず開発環境を整えましょう：

1. **Node.js のインストール**
   - 最新版の Node.js と npm をインストールしてください
   - `node -v` と `npm -v` で確認

2. **Xcode のインストール**
   - Mac App Store から最新の Xcode をインストール
   - コマンドラインツールも必要です: `xcode-select --install`

3. **iOS シミュレータの準備**
   - Xcode から iOS シミュレータをインストール

## 学習ステップ

### ステップ 1: Next.js アプリ作成 (TypeScript + App Router)

```bash
# Next.js アプリをセットアップ (TypeScript と App Router を使用)
npx create-next-app@latest my-capacitor-app
```

セットアップ時に以下のように選択します:
```
✔ Would you like to use TypeScript? Yes
✔ Would you like to use ESLint? Yes 
✔ Would you like to use Tailwind CSS? Yes
✔ Would you like to use `src/` directory? Yes
✔ Would you like to use App Router? (recommended) Yes
✔ Would you like to customize the default import alias (@/*)? Yes
```

```bash
cd my-capacitor-app
```

### ステップ 2: Capacitor の追加

```bash
# Capacitor のインストール
npm install @capacitor/core @capacitor/cli

# Capacitor の初期化
npx cap init "My Capacitor App" "com.example.mycapacitorapp"

# iOS プラットフォームを追加
npm install @capacitor/ios
```

### ステップ 3: Next.js の設定

Next.js の出力形式を静的サイトに設定します。`next.config.mjs` ファイルを編集します:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // 静的出力を有効にする
  distDir: 'out',    // ビルド出力ディレクトリを設定
  images: {
    unoptimized: true, // 静的出力でNext.js画像を使用する場合に必要
  },
};

export default nextConfig;
```

### ステップ 4: 簡単なアプリを作成

`src/app/page.tsx` を編集して、カウンターとスタイルを実装しましょう。

### ステップ 5: ビルドと同期

```bash
# アプリのビルド
npm run build

# capacitor.config.ts を作成・編集
```

capacitor.config.ts を作成します:

```typescript
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.mycapacitorapp',
  appName: 'My Capacitor App',
  webDir: 'out',
  bundledWebRuntime: false,
  ios: {
    contentInset: 'always',
  }
};

export default config;
```

```bash
# iOS プラットフォームを追加して同期
npx cap add ios
npx cap sync
```

### ステップ 6: iOS アプリを開く

```bash
# Xcode でプロジェクトを開く
npx cap open ios
```

### ステップ 7: ネイティブ機能の追加

カメラと位置情報機能を追加してみましょう:

```bash
# 必要なプラグインのインストール
npm install @capacitor/camera @capacitor/geolocation
```

## カスタムコンポーネントの作成

以下に、カウンター、カメラ、位置情報機能を含む TypeScript コンポーネントを作成します。

## iOS パーミッションの設定

Info.plist に必要な権限を追加します:

```xml
<!-- Info.plist に追加 (カメラ許可) -->
<key>NSCameraUsageDescription</key>
<string>アプリがカメラにアクセスする必要があります</string>
<key>NSPhotoLibraryAddUsageDescription</key>
<string>アプリが写真ライブラリに画像を保存します</string>
<key>NSPhotoLibraryUsageDescription</key>
<string>アプリが写真ライブラリから画像を選択できるようにします</string>

<!-- Info.plist に追加 (位置情報許可) -->
<key>NSLocationWhenInUseUsageDescription</key>
<string>アプリが現在地を表示するために位置情報にアクセスします</string>
```

## トラブルシューティング

以下のトラブルシューティングのヒントも役立つでしょう：

1. **ビルドエラー**
   - node_modules を削除して再インストール: `rm -rf node_modules && npm install`
   - iOS プロジェクトを削除して再作成: `rm -rf ios && npx cap add ios`

2. **パーミッションの問題**
   - Info.plist が正しく設定されているか確認
   - Xcode のケーパビリティ設定を確認

3. **Next.js の静的生成の問題**
   - サーバーサイドの機能を使用していないか確認
   - 動的ルートが正しく静的生成されているか確認

4. **シミュレータでカメラが動作しない**
   - シミュレータはカメラをサポートしていないため、実機で確認が必要です
   - または Camera.pickImages() を使って写真ライブラリからの選択に切り替える

## 次のステップ

このチュートリアルが完了したら、以下の機能を実装して学習を深めましょう：

1. **データ永続化**
   - Capacitor Storage プラグインを使ってデータを保存

2. **プッシュ通知**
   - Firebase Cloud Messaging と Capacitor Push Notifications プラグインを追加

3. **アプリアイコンとスプラッシュスクリーン**
   - iOS 用のアイコンとスプラッシュスクリーンをカスタマイズ

4. **アプリ配布の準備**
   - App Store へ公開するための設定と手順