import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ImageBackground, Animated, Dimensions, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { getTodaysWallpaper } from '../data/wallpapers';

const { width, height } = Dimensions.get('window');

export default function WallpaperMode() {
  const [wallpaper, setWallpaper] = useState(null);
  const fadeAnim = new Animated.Value(0);

  useEffect(() => {
    loadWallpaper();
  }, []);

  const loadWallpaper = async () => {
    const todaysWallpaper = await getTodaysWallpaper();
    setWallpaper(todaysWallpaper);

    // Animate wallpaper in
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  if (!wallpaper) return null;

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.imageContainer, { opacity: fadeAnim }]}>
        <ImageBackground
          source={{ uri: wallpaper.url }}
          style={styles.wallpaper}
          resizeMode="cover"
        >
          {/* Gradient overlay for better text visibility */}
          <LinearGradient
            colors={['rgba(0,0,0,0.3)', 'transparent', 'rgba(0,0,0,0.5)']}
            style={styles.overlay}
          >
            <View style={styles.infoContainer}>
              <Text style={styles.categoryText}>{wallpaper.category}</Text>
            </View>
          </LinearGradient>
        </ImageBackground>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  imageContainer: {
    flex: 1,
  },
  wallpaper: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
  },
  infoContainer: {
    position: 'absolute',
    top: 60,
    left: 30,
  },
  categoryText: {
    fontSize: 14,
    color: '#ffffff',
    fontWeight: '600',
    letterSpacing: 2,
    textTransform: 'uppercase',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    overflow: 'hidden',
  },
});
