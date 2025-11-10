import AsyncStorage from '@react-native-async-storage/async-storage';

const SETTINGS_KEY = '@app_settings';
const LAST_QUOTE_DATE_KEY = '@last_quote_date';
const LAST_WALLPAPER_DATE_KEY = '@last_wallpaper_date';
const CURRENT_QUOTE_INDEX_KEY = '@current_quote_index';
const CURRENT_WALLPAPER_INDEX_KEY = '@current_wallpaper_index';

export async function saveSettings(settings) {
  try {
    await AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    return true;
  } catch (error) {
    console.error('Error saving settings:', error);
    return false;
  }
}

export async function loadSettings() {
  try {
    const settings = await AsyncStorage.getItem(SETTINGS_KEY);
    return settings ? JSON.parse(settings) : null;
  } catch (error) {
    console.error('Error loading settings:', error);
    return null;
  }
}

export async function saveLastQuoteDate(date) {
  try {
    await AsyncStorage.setItem(LAST_QUOTE_DATE_KEY, date);
    return true;
  } catch (error) {
    console.error('Error saving last quote date:', error);
    return false;
  }
}

export async function getLastQuoteDate() {
  try {
    const date = await AsyncStorage.getItem(LAST_QUOTE_DATE_KEY);
    return date;
  } catch (error) {
    console.error('Error getting last quote date:', error);
    return null;
  }
}

export async function saveLastWallpaperDate(date) {
  try {
    await AsyncStorage.setItem(LAST_WALLPAPER_DATE_KEY, date);
    return true;
  } catch (error) {
    console.error('Error saving last wallpaper date:', error);
    return false;
  }
}

export async function getLastWallpaperDate() {
  try {
    const date = await AsyncStorage.getItem(LAST_WALLPAPER_DATE_KEY);
    return date;
  } catch (error) {
    console.error('Error getting last wallpaper date:', error);
    return null;
  }
}

export async function saveCurrentQuoteIndex(index) {
  try {
    await AsyncStorage.setItem(CURRENT_QUOTE_INDEX_KEY, index.toString());
    return true;
  } catch (error) {
    console.error('Error saving current quote index:', error);
    return false;
  }
}

export async function getCurrentQuoteIndex() {
  try {
    const index = await AsyncStorage.getItem(CURRENT_QUOTE_INDEX_KEY);
    return index ? parseInt(index, 10) : 0;
  } catch (error) {
    console.error('Error getting current quote index:', error);
    return 0;
  }
}

export async function saveCurrentWallpaperIndex(index) {
  try {
    await AsyncStorage.setItem(CURRENT_WALLPAPER_INDEX_KEY, index.toString());
    return true;
  } catch (error) {
    console.error('Error saving current wallpaper index:', error);
    return false;
  }
}

export async function getCurrentWallpaperIndex() {
  try {
    const index = await AsyncStorage.getItem(CURRENT_WALLPAPER_INDEX_KEY);
    return index ? parseInt(index, 10) : 0;
  } catch (error) {
    console.error('Error getting current wallpaper index:', error);
    return 0;
  }
}
