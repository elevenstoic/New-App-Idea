import React, { useState, useEffect } from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import HomeScreen from './screens/HomeScreen';
import FavoritesScreen from './screens/FavoritesScreen';
import CustomizeScreen from './screens/CustomizeScreen';
import WallpaperScreen from './screens/WallpaperScreen';
import LiquidGlassNav from './components/LiquidGlassNav';
import HamburgerMenu from './components/HamburgerMenu';
import { setupNotifications, scheduleDailyQuotes } from './utils/notifications';
import { loadSettings, saveSettings, loadFavorites, saveFavorites, loadTheme, saveTheme } from './utils/storage';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('home'); // 'home', 'favorites', 'customize', 'wallpaper'
  const [menuOpen, setMenuOpen] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [theme, setTheme] = useState({
    name: 'purple',
    colors: ['#0f0c29', '#302b63', '#24243e'],
    font: 'default'
  });
  const [settings, setSettings] = useState({
    notificationsEnabled: true,
    dailyQuoteCount: 1,
  });

  useEffect(() => {
    initializeApp();
  }, []);

  const initializeApp = async () => {
    await setupNotifications();

    const savedSettings = await loadSettings();
    if (savedSettings) {
      setSettings(savedSettings);
      if (savedSettings.notificationsEnabled) {
        await scheduleDailyQuotes(savedSettings.dailyQuoteCount);
      }
    }

    const savedFavorites = await loadFavorites();
    if (savedFavorites) {
      setFavorites(savedFavorites);
    }

    const savedTheme = await loadTheme();
    if (savedTheme) {
      setTheme(savedTheme);
    }
  };

  const handleNavigate = (screen) => {
    setCurrentScreen(screen);
    setMenuOpen(false);
  };

  const handleToggleFavorite = async (quote) => {
    const isFavorite = favorites.some(fav => fav.text === quote.text);
    let newFavorites;

    if (isFavorite) {
      newFavorites = favorites.filter(fav => fav.text !== quote.text);
    } else {
      newFavorites = [...favorites, quote];
    }

    setFavorites(newFavorites);
    await saveFavorites(newFavorites);
  };

  const handleUpdateTheme = async (newTheme) => {
    setTheme(newTheme);
    await saveTheme(newTheme);
  };

  const handleUpdateSettings = async (newSettings) => {
    setSettings(newSettings);
    await saveSettings(newSettings);

    if (newSettings.notificationsEnabled) {
      await scheduleDailyQuotes(newSettings.dailyQuoteCount);
    }
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return (
          <HomeScreen
            theme={theme}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
          />
        );
      case 'favorites':
        return (
          <FavoritesScreen
            theme={theme}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
          />
        );
      case 'customize':
        return (
          <CustomizeScreen
            theme={theme}
            onUpdateTheme={handleUpdateTheme}
            settings={settings}
            onUpdateSettings={handleUpdateSettings}
          />
        );
      case 'wallpaper':
        return <WallpaperScreen theme={theme} />;
      default:
        return (
          <HomeScreen
            theme={theme}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
          />
        );
    }
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <View style={styles.container}>
        {renderScreen()}

        <HamburgerMenu
          isOpen={menuOpen}
          onToggle={() => setMenuOpen(!menuOpen)}
          onNavigate={handleNavigate}
          currentScreen={currentScreen}
        />

        <LiquidGlassNav
          currentScreen={currentScreen}
          onNavigate={handleNavigate}
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
