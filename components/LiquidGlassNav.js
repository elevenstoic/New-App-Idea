import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Platform } from 'react-native';
import { BlurView } from 'expo-blur';

export default function LiquidGlassNav({ currentScreen, onNavigate }) {
  return (
    <View style={styles.navContainer}>
      <BlurView intensity={80} tint="dark" style={styles.blurContainer}>
        <View style={styles.liquidOverlay} />

        <View style={styles.navContent}>
          <TouchableOpacity
            style={styles.navButton}
            onPress={() => onNavigate('home')}
          >
            <Text style={styles.navIcon}>
              {currentScreen === 'home' ? '🏠' : '🏘️'}
            </Text>
            <Text
              style={[
                styles.navLabel,
                currentScreen === 'home' && styles.navLabelActive,
              ]}
            >
              Home
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navButton}
            onPress={() => onNavigate('favorites')}
          >
            <Text style={styles.navIcon}>
              {currentScreen === 'favorites' ? '❤️' : '🤍'}
            </Text>
            <Text
              style={[
                styles.navLabel,
                currentScreen === 'favorites' && styles.navLabelActive,
              ]}
            >
              Favorites
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navButton}
            onPress={() => onNavigate('customize')}
          >
            <Text style={styles.navIcon}>
              {currentScreen === 'customize' ? '🎨' : '🖌️'}
            </Text>
            <Text
              style={[
                styles.navLabel,
                currentScreen === 'customize' && styles.navLabelActive,
              ]}
            >
              Customize
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navButton}
            onPress={() => onNavigate('wallpaper')}
          >
            <Text style={styles.navIcon}>
              {currentScreen === 'wallpaper' ? '🖼️' : '🌄'}
            </Text>
            <Text
              style={[
                styles.navLabel,
                currentScreen === 'wallpaper' && styles.navLabelActive,
              ]}
            >
              Wallpaper
            </Text>
          </TouchableOpacity>
        </View>
      </BlurView>
    </View>
  );
}

const styles = StyleSheet.create({
  navContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    height: 75,
    borderRadius: 35,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 20,
      },
      android: {
        elevation: 10,
      },
    }),
  },
  blurContainer: {
    flex: 1,
    borderRadius: 35,
    overflow: 'hidden',
  },
  liquidOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 35,
  },
  navContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 10,
  },
  navButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  navIcon: {
    fontSize: 24,
    marginBottom: 4,
  },
  navLabel: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 11,
    fontWeight: '600',
  },
  navLabelActive: {
    color: '#ffffff',
  },
});
