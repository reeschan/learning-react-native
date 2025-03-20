import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.mycapacitorapp',
  appName: 'My Capacitor App',
  webDir: 'out',
  ios: {
    contentInset: 'always',
  }
};

export default config;
