import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.mycapacitorapp',
  appName: 'My Capacitor App',
  webDir: 'out',
  bundledWebRuntime: false,
  server: {
    // 開発中は以下のコメントを外してローカルサーバーを使用することもできます
    // url: 'http://localhost:3000',
    // cleartext: true
  },
  ios: {
    contentInset: 'always',
    scheme: 'mycapacitorapp',
    limitsNavigationsToAppBoundDomains: true,
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#121212",
    },
  }
};

export default config;