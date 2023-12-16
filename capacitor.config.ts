import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'agendamento',
  webDir: 'dist//agendamento',
  server: {
    androidScheme: 'https'
  }
};

export default config;
