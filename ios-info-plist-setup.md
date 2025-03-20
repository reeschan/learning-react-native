# iOS 設定ガイド

## Info.plist の設定

Xcode で `ios/App/App/Info.plist` を開き、以下の権限を追加します。

### カメラと写真ライブラリのアクセス許可

```xml
<key>NSCameraUsageDescription</key>
<string>アプリがカメラにアクセスする必要があります</string>
<key>NSPhotoLibraryAddUsageDescription</key>
<string>アプリが写真ライブラリに画像を保存します</string>
<key>NSPhotoLibraryUsageDescription</key>
<string>アプリが写真ライブラリから画像を選択できるようにします</string>
```

### 位置情報のアクセス許可

```xml
<key>NSLocationWhenInUseUsageDescription</key>
<string>アプリが現在地を表示するために位置情報にアクセスします</string>
```

## App Transport Security の設定

開発中に HTTP リソースにアクセスする必要がある場合、以下の設定を追加します：

```xml
<key>NSAppTransportSecurity</key>
<dict>
    <key>NSAllowsArbitraryLoads</key>
    <true/>
    <key>NSExceptionDomains</key>
    <dict>
        <key>localhost</key>
        <dict>
            <key>NSExceptionAllowsInsecureHTTPLoads</key>
            <true/>
        </dict>
    </dict>
</dict>
```

## Universal Links / Associated Domains の設定

特定のURLでアプリを開きたい場合は、Xcode のケーパビリティタブで「Associated Domains」を有効にし、以下のようなドメインを追加します：

```
applinks:example.com
```

また、アプリの `apple-app-site-association` ファイルを設定する必要があります。

## ビルド設定

- **ビルド番号**: Xcode の `TARGET` > `General` > `Identity` > `Build` で設定
- **バージョン番号**: Xcode の `TARGET` > `General` > `Identity` > `Version` で設定

## カスタムURLスキーム

アプリをカスタムURLスキームで開けるようにするには、`Info.plist` に以下を追加します：

```xml
<key>CFBundleURLTypes</key>
<array>
    <dict>
        <key>CFBundleURLName</key>
        <string>com.example.mycapacitorapp</string>
        <key>CFBundleURLSchemes</key>
        <array>
            <string>mycapacitorapp</string>
        </array>
    </dict>
</array>
```

## App Store へのアップロード準備

1. **証明書とプロビジョニングプロファイル**: Apple Developer サイトで設定
2. **App Store Connect**: アプリの情報を登録
3. **スクリーンショット**: 各デバイスサイズのスクリーンショット
4. **App Review 情報**: テストアカウントやアプリの特殊な機能説明