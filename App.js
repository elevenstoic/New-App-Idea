import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, StatusBar, Animated } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import QuoteMode from './components/QuoteMode';
import WallpaperMode from './components/WallpaperMode';
import LiquidGlassNav from './components/LiquidGlassNav';
import { setupNotifications, scheduleDailyQuotes } from './utils/notifications';
import { loadSettings, saveSettings } from './utils/storage';

export default function App() {
  const [mode, setMode] = useState('quote'); // 'quote' or 'wallpaper'
  const [settings, setSettings] = useState({
    notificationsEnabled: true,
    dailyQuoteCount: 1,
  });

  // Animation values for mode switching
  const quoteOpacity = useRef(new Animated.Value(1)).current;
  const wallpaperOpacity = useRef(new Animated.Value(0)).current;
  const quoteScale = useRef(new Animated.Value(1)).current;
  const wallpaperScale = useRef(new Animated.Value(0.9)).current;

  useEffect(() => {
    // Initialize app
    initializeApp();
  }, []);

  useEffect(() => {
    // Animate mode switching
    if (mode === 'quote') {
      Animated.parallel([
        Animated.timing(quoteOpacity, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.spring(quoteScale, {
          toValue: 1,
          tension: 50,
          friction: 7,
          useNativeDriver: true,
        }),
        Animated.timing(wallpaperOpacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(wallpaperScale, {
          toValue: 0.9,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(wallpaperOpacity, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.spring(wallpaperScale, {
          toValue: 1,
          tension: 50,
          friction: 7,
          useNativeDriver: true,
        }),
        Animated.timing(quoteOpacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(quoteScale, {
          toValue: 0.9,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [mode]);

  const initializeApp = async () => {
    // Setup notifications
    await setupNotifications();

    // Load user settings
    const savedSettings = await loadSettings();
    if (savedSettings) {
      setSettings(savedSettings);
      if (savedSettings.notificationsEnabled) {
        await scheduleDailyQuotes(savedSettings.dailyQuoteCount);
      }
    }
  };

  const handleModeSwitch = (newMode) => {
    setMode(newMode);
  };

  const updateSettings = async (newSettings) => {
    setSettings(newSettings);
    await saveSettings(newSettings);

    // Update notifications
    if (newSettings.notificationsEnabled) {
      await scheduleDailyQuotes(newSettings.dailyQuoteCount);
    }
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <View style={styles.container}>
        <Animated.View
          style={[
            styles.modeContainer,
            {
              opacity: quoteOpacity,
              transform: [{ scale: quoteScale }],
            },
          ]}
          pointerEvents={mode === 'quote' ? 'auto' : 'none'}
        >
          <QuoteMode />
        </Animated.View>

        <Animated.View
          style={[
            styles.modeContainer,
            StyleSheet.absoluteFill,
            {
              opacity: wallpaperOpacity,
              transform: [{ scale: wallpaperScale }],
            },
          ]}
          pointerEvents={mode === 'wallpaper' ? 'auto' : 'none'}
        >
          <WallpaperMode />
        </Animated.View>

        <LiquidGlassNav
          currentMode={mode}
          onModeSwitch={handleModeSwitch}
          settings={settings}
          onSettingsUpdate={updateSettings}
        />
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  modeContainer: {
    flex: 1,
  },
});
