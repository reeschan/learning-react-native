# React Native から Capacitor を使った iOS アプリ開発入門

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

### ステップ 1: React アプリ作成

```bash
# React アプリをセットアップ
npx create-react-app my-first-app
cd my-first-app
```

### ステップ 2: Capacitor の追加

```bash
# Capacitor のインストール
npm install @capacitor/core @capacitor/cli

# Capacitor の初期化
npx cap init "My First App" "com.example.myfirstapp"

# iOS プラットフォームを追加
npm install @capacitor/ios
```

### ステップ 3: 簡単なアプリを作成

src/App.js を編集して、以下のような簡単な機能を実装してみましょう。

```javascript
import React, { useState } from 'react';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <header className="App-header">
        <h1>My First React + Capacitor App</h1>
        <p>カウント: {count}</p>
        <div className="button-container">
          <button onClick={() => setCount(count - 1)}>減らす</button>
          <button onClick={() => setCount(count + 1)}>増やす</button>
        </div>
      </header>
    </div>
  );
}

export default App;
```

```css
/* App.css */
.App {
  text-align: center;
}

.App-header {
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
  padding: 20px;
}

.feature-section {
  margin: 20px 0;
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  width: 100%;
  max-width: 500px;
}

.button-container {
  display: flex;
  gap: 20px;
  margin-top: 20px;
}

.camera-section {
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.camera-button {
  background-color: #4caf50;
  margin-bottom: 20px;
}

.geo-button {
  background-color: #ff9800;
  margin-bottom: 20px;
}

.location-info {
  background-color: rgba(255, 255, 255, 0.15);
  padding: 15px;
  border-radius: 8px;
  width: 100%;
  font-size: 16px;
}

.photo-container {
  margin-top: 20px;
  max-width: 300px;
  border: 2px solid white;
  border-radius: 8px;
  overflow: hidden;
}

.photo-container img {
  width: 100%;
  height: auto;
  display: block;
}

button {
  background-color: #61dafb;
  border: none;
  color: #282c34;
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
}

button:hover {
  background-color: #4fa8c5;
}
```

### ステップ 4: ビルドと同期

```bash
# アプリのビルド
npm run build
```

capacitor.config.js を作成・編集：

```javascript
const config = {
  appId: 'com.example.myfirstapp',
  appName: 'My First App',
  webDir: 'build',
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

### ステップ 5: iOS アプリを開く

```bash
# Xcode でプロジェクトを開く
npx cap open ios
```

### ステップ 6: ネイティブ機能の追加（実践課題）

次に、カメラ機能を追加してみましょう:

```bash
# カメラプラグインのインストール
npm install @capacitor/camera
```

```javascript
// App.js
import React, { useState } from 'react';
import { Camera, CameraResultType } from '@capacitor/camera';
import './App.css';

function App() {
  const [count, setCount] = useState(0);
  const [photoUrl, setPhotoUrl] = useState('');

  const takePhoto = async () => {
    try {
      const photo = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.Uri
      });
      
      // 撮影した写真のURLを取得
      setPhotoUrl(photo.webPath);
    } catch (error) {
      console.error('カメラエラー:', error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>My First React + Capacitor App</h1>
        <p>カウント: {count}</p>
        <div className="button-container">
          <button onClick={() => setCount(count - 1)}>減らす</button>
          <button onClick={() => setCount(count + 1)}>増やす</button>
        </div>
        
        <div className="camera-section">
          <button className="camera-button" onClick={takePhoto}>
            写真を撮る
          </button>
          
          {photoUrl && (
            <div className="photo-container">
              <img src={photoUrl} alt="撮影した写真" />
            </div>
          )}
        </div>
      </header>
    </div>
  );
}

export default App;
```

```bash
# ビルドと同期
npm run build
npx cap sync ios
```

### ステップ 7: iOS パーミッションの設定

Info.plist にカメラの使用許可を追加します。Xcode で ios/App/App/Info.plist を開いて編集するか、以下のようなキーを追加します：

```xml
<!-- Info.plist に追加 -->
<key>NSCameraUsageDescription</key>
<string>アプリがカメラにアクセスする必要があります</string>
<key>NSPhotoLibraryAddUsageDescription</key>
<string>アプリが写真ライブラリに画像を保存します</string>
<key>NSPhotoLibraryUsageDescription</key>
<string>アプリが写真ライブラリから画像を選択できるようにします</string>
```

### ステップ 8: シミュレータまたは実機で実行

1. Xcode でプロジェクトを開く
2. 対象のデバイス（シミュレータまたは接続した実機）を選択
3. 実行ボタンをクリック

## チュートリアル課題: 位置情報機能を追加

次の課題として、デバイスの位置情報を取得して表示する機能を追加してみましょう。

```javascript
// App.js
import React, { useState } from 'react';
import { Camera, CameraResultType } from '@capacitor/camera';
import { Geolocation } from '@capacitor/geolocation';
import './App.css';

function App() {
  const [count, setCount] = useState(0);
  const [photoUrl, setPhotoUrl] = useState('');
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);

  const takePhoto = async () => {
    try {
      const photo = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.Uri
      });
      
      setPhotoUrl(photo.webPath);
    } catch (error) {
      console.error('カメラエラー:', error);
    }
  };

  const getCurrentPosition = async () => {
    setLoading(true);
    try {
      const position = await Geolocation.getCurrentPosition();
      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        accuracy: position.coords.accuracy
      });
    } catch (error) {
      console.error('位置情報エラー:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>My First React + Capacitor App</h1>
        
        <div className="feature-section">
          <h2>カウンター機能</h2>
          <p>カウント: {count}</p>
          <div className="button-container">
            <button onClick={() => setCount(count - 1)}>減らす</button>
            <button onClick={() => setCount(count + 1)}>増やす</button>
          </div>
        </div>
        
        <div className="feature-section">
          <h2>カメラ機能</h2>
          <button className="camera-button" onClick={takePhoto}>
            写真を撮る
          </button>
          
          {photoUrl && (
            <div className="photo-container">
              <img src={photoUrl} alt="撮影した写真" />
            </div>
          )}
        </div>
        
        <div className="feature-section">
          <h2>位置情報機能</h2>
          <button 
            className="geo-button" 
            onClick={getCurrentPosition}
            disabled={loading}
          >
            {loading ? '取得中...' : '現在地を取得'}
          </button>
          
          {location && (
            <div className="location-info">
              <p>緯度: {location.latitude.toFixed(6)}</p>
              <p>経度: {location.longitude.toFixed(6)}</p>
              <p>精度: {location.accuracy.toFixed(1)}m</p>
            </div>
          )}
        </div>
      </header>
    </div>
  );
}

export default App;
```


インストールと追加設定：

```bash
# Geolocationプラグインのインストール
npm install @capacitor/geolocation

# ビルドと同期
npm run build
npx cap sync ios
```

Info.plist に位置情報のアクセス許可も追加します：

```xml
<!-- Info.plist に追加 -->
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

3. **シミュレータでカメラが動作しない**
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