import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Platform } from 'react-native';
import { getRandomQuote } from '../data/quotes';

// Configure notification behavior
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export async function setupNotifications() {
  if (!Device.isDevice) {
    console.log('Notifications only work on physical devices');
    return null;
  }

  try {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      console.log('Failed to get push notification permissions');
      return null;
    }

    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('daily-quotes', {
        name: 'Daily Quotes',
        importance: Notifications.AndroidImportance.HIGH,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#8b7dd8',
      });
    }

    return true;
  } catch (error) {
    console.error('Error setting up notifications:', error);
    return null;
  }
}

export async function scheduleDailyQuotes(count = 1) {
  try {
    // Cancel all existing scheduled notifications
    await Notifications.cancelAllScheduledNotificationsAsync();

    // Schedule times: morning (9 AM), afternoon (2 PM), evening (7 PM)
    const times = [
      { hour: 9, minute: 0 },
      { hour: 14, minute: 0 },
      { hour: 19, minute: 0 },
    ];

    // Schedule notifications based on count
    for (let i = 0; i < count; i++) {
      const time = times[i];
      const quote = await getRandomQuote();

      await Notifications.scheduleNotificationAsync({
        content: {
          title: 'Daily Quote ✨',
          body: `"${quote.text}" - ${quote.author}`,
          sound: true,
          priority: Notifications.AndroidNotificationPriority.HIGH,
          vibrate: [0, 250, 250, 250],
        },
        trigger: {
          hour: time.hour,
          minute: time.minute,
          repeats: true,
        },
      });
    }

    console.log(`Scheduled ${count} daily quote notifications`);
    return true;
  } catch (error) {
    console.error('Error scheduling notifications:', error);
    return false;
  }
}

export async function sendTestNotification() {
  const quote = await getRandomQuote();

  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Daily Quote ✨',
      body: `"${quote.text}" - ${quote.author}`,
      sound: true,
    },
    trigger: {
      seconds: 2,
    },
  });
}
