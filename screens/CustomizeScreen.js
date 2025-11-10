import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const THEMES = [
  {
    name: 'purple',
    label: 'Purple Dream',
    colors: ['#0f0c29', '#302b63', '#24243e'],
  },
  {
    name: 'sunset',
    label: 'Sunset Glow',
    colors: ['#ff6b6b', '#ee5a6f', '#c44569'],
  },
  {
    name: 'ocean',
    label: 'Ocean Blue',
    colors: ['#667eea', '#764ba2', '#f093fb'],
  },
  {
    name: 'forest',
    label: 'Forest Green',
    colors: ['#134e5e', '#71b280', '#0f2027'],
  },
  {
    name: 'midnight',
    label: 'Midnight Black',
    colors: ['#000000', '#1a1a2e', '#16213e'],
  },
  {
    name: 'rose',
    label: 'Rose Gold',
    colors: ['#ed4264', '#ffedbc', '#ff6e7f'],
  },
];

const FONTS = [
  { name: 'default', label: 'Default', preview: 'The quick brown fox' },
  { name: 'serif', label: 'Serif', preview: 'The quick brown fox' },
  { name: 'mono', label: 'Monospace', preview: 'The quick brown fox' },
];

export default function CustomizeScreen({ theme, onUpdateTheme, settings, onUpdateSettings }) {
  const handleThemeChange = (newThemeName) => {
    const selectedTheme = THEMES.find(t => t.name === newThemeName);
    onUpdateTheme({
      ...theme,
      name: newThemeName,
      colors: selectedTheme.colors,
    });
  };

  const handleFontChange = (fontName) => {
    onUpdateTheme({
      ...theme,
      font: fontName,
    });
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={theme.colors}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.title}>Customize</Text>
          <Text style={styles.subtitle}>Make it yours</Text>

          {/* Themes Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Color Theme</Text>
            <View style={styles.themesGrid}>
              {THEMES.map((t) => (
                <TouchableOpacity
                  key={t.name}
                  style={[
                    styles.themeCard,
                    theme.name === t.name && styles.themeCardActive,
                  ]}
                  onPress={() => handleThemeChange(t.name)}
                >
                  <LinearGradient
                    colors={t.colors}
                    style={styles.themePreview}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                  />
                  <Text style={styles.themeLabel}>{t.label}</Text>
                  {theme.name === t.name && (
                    <View style={styles.checkmark}>
                      <Text style={styles.checkmarkText}>✓</Text>
                    </View>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Fonts Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Font Style</Text>
            <View style={styles.fontsContainer}>
              {FONTS.map((font) => (
                <TouchableOpacity
                  key={font.name}
                  style={[
                    styles.fontCard,
                    theme.font === font.name && styles.fontCardActive,
                  ]}
                  onPress={() => handleFontChange(font.name)}
                >
                  <Text style={styles.fontLabel}>{font.label}</Text>
                  <Text
                    style={[
                      styles.fontPreview,
                      { fontFamily: font.name === 'serif' ? 'serif' : font.name === 'mono' ? 'monospace' : 'default' }
                    ]}
                  >
                    {font.preview}
                  </Text>
                  {theme.font === font.name && (
                    <View style={styles.fontCheckmark}>
                      <Text style={styles.checkmarkText}>✓</Text>
                    </View>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Notifications Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Notifications</Text>
            <View style={styles.settingRow}>
              <Text style={styles.settingLabel}>Daily Quote Reminders</Text>
              <Switch
                value={settings.notificationsEnabled}
                onValueChange={(value) =>
                  onUpdateSettings({ ...settings, notificationsEnabled: value })
                }
                trackColor={{ false: '#767577', true: '#8b7dd8' }}
                thumbColor={settings.notificationsEnabled ? '#fff' : '#f4f3f4'}
              />
            </View>

            {settings.notificationsEnabled && (
              <View style={styles.countContainer}>
                <Text style={styles.countLabel}>Quotes per day</Text>
                <View style={styles.countButtons}>
                  {[1, 2, 3].map((count) => (
                    <TouchableOpacity
                      key={count}
                      style={[
                        styles.countButton,
                        settings.dailyQuoteCount === count && styles.countButtonActive,
                      ]}
                      onPress={() =>
                        onUpdateSettings({ ...settings, dailyQuoteCount: count })
                      }
                    >
                      <Text
                        style={[
                          styles.countText,
                          settings.dailyQuoteCount === count && styles.countTextActive,
                        ]}
                      >
                        {count}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            )}
          </View>
        </ScrollView>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 100,
    paddingBottom: 120,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: '700',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#b8b8d1',
    textAlign: 'center',
    marginBottom: 40,
  },
  section: {
    marginBottom: 40,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 20,
  },
  themesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 15,
  },
  themeCard: {
    width: '47%',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 15,
    padding: 15,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  themeCardActive: {
    borderColor: '#ffffff',
  },
  themePreview: {
    height: 80,
    borderRadius: 10,
    marginBottom: 10,
  },
  themeLabel: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  checkmark: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmarkText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '700',
  },
  fontsContainer: {
    gap: 15,
  },
  fontCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 15,
    padding: 20,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  fontCardActive: {
    borderColor: '#ffffff',
  },
  fontLabel: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },
  fontPreview: {
    color: '#b8b8d1',
    fontSize: 18,
  },
  fontCheckmark: {
    position: 'absolute',
    top: 15,
    right: 15,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 15,
    padding: 20,
  },
  settingLabel: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '500',
  },
  countContainer: {
    marginTop: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 15,
    padding: 20,
  },
  countLabel: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 15,
  },
  countButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  countButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
  },
  countButtonActive: {
    backgroundColor: 'rgba(139, 125, 216, 0.5)',
  },
  countText: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 16,
    fontWeight: '600',
  },
  countTextActive: {
    color: '#ffffff',
  },
});
