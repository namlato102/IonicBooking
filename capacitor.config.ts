import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.booking.app',
  appName: 'IonicBooking',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  }
};

export default config;
