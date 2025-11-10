import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Animated
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { useRouter } from 'expo-router';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function HomeScreen() {
  const [activeMode, setActiveMode] = useState('quotes'); // 'quotes' or 'wallpapers'
  const slideAnim = useRef(new Animated.Value(1)).current; // 0 = left (wallpapers), 1 = right (quotes)
  const router = useRouter();

  const handleModeSwitch = (mode) => {
    if (mode === activeMode) return;

    const toValue = mode === 'quotes' ? 1 : 0;

    Animated.spring(slideAnim, {
      toValue,
      tension: 50,
      friction: 8,
      useNativeDriver: true,
    }).start();

    setActiveMode(mode);

    if (mode === 'wallpapers') {
      // Navigate to wallpapers screen
      router.push('/wallpapers');
    }
  };

  return (
    <View style={styles.container}>
      {/* Background Gradient - Exact diagonal band */}
      <LinearGradient
        colors={['#bfeaf1', '#8ebfe0', '#4053a1', '#2b2f7a']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        {/* Subtle grain overlay */}
        <View style={styles.grainOverlay} />

        {/* Top Left: Brand Lockup */}
        <View style={styles.brandContainer}>
          <Text style={styles.brandText}>elevenstoic.</Text>
          <View style={styles.brandUnderline} />
        </View>

        {/* Top Center: Small Nav (Favorites / Customize) */}
        <View style={styles.topNavContainer}>
          <BlurView intensity={20} tint="light" style={styles.topNavBlur}>
            <View style={styles.topNavInner}>
              <TouchableOpacity style={styles.topNavItem}>
                <Text style={styles.topNavIcon}>♡</Text>
                <Text style={styles.topNavLabel}>Favorites</Text>
              </TouchableOpacity>

              <View style={styles.topNavDivider} />

              <TouchableOpacity style={styles.topNavItem}>
                <Text style={styles.topNavIcon}>✦</Text>
                <Text style={styles.topNavLabel}>Customize</Text>
              </TouchableOpacity>
            </View>
          </BlurView>
        </View>

        {/* Central Quote */}
        <View style={styles.quoteContainer}>
          <Text style={styles.quoteText}>big things{'\n'}take time.</Text>
        </View>

        {/* Heart Glyph Below Quote */}
        <View style={styles.heartContainer}>
          <Text style={styles.heartGlyph}>♡</Text>
        </View>

        {/* Bottom: Main Segmented Control (Liquid Glass) */}
        <View style={styles.segmentedContainer}>
          <BlurView intensity={26} tint="dark" style={styles.segmentedBlur}>
            <View style={styles.segmentedInner}>
              {/* Sliding Active Background */}
              <Animated.View
                style={[
                  styles.activeSlider,
                  {
                    transform: [{
                      translateX: slideAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, SCREEN_WIDTH * 0.43 / 2]
                      })
                    }]
                  }
                ]}
              >
                <BlurView intensity={40} tint="dark" style={styles.activeSliderInner}>
                  <View style={styles.activeSliderHighlight} />
                </BlurView>
              </Animated.View>

              {/* Left Pill: Wallpapers */}
              <TouchableOpacity
                style={styles.segmentedPill}
                onPress={() => handleModeSwitch('wallpapers')}
              >
                <Text style={[
                  styles.segmentedText,
                  activeMode === 'wallpapers' && styles.segmentedTextActive
                ]}>
                  wallpapers.
                </Text>
              </TouchableOpacity>

              {/* Right Pill: Quotes */}
              <TouchableOpacity
                style={styles.segmentedPill}
                onPress={() => handleModeSwitch('quotes')}
              >
                <Text style={[
                  styles.segmentedText,
                  activeMode === 'quotes' && styles.segmentedTextActive
                ]}>
                  quotes.
                </Text>
              </TouchableOpacity>
            </View>
          </BlurView>
        </View>
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
  grainOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.015)',
  },

  // Brand Lockup (Top Left)
  brandContainer: {
    position: 'absolute',
    top: 60,
    left: 30,
  },
  brandText: {
    fontFamily: 'System',
    fontSize: 38,
    fontWeight: '700',
    color: 'rgba(255, 255, 255, 0.95)',
    letterSpacing: -0.5,
  },
  brandUnderline: {
    width: 90,
    height: 2,
    backgroundColor: '#FFFFFF',
    marginTop: 6,
    marginLeft: -5,
  },

  // Top Nav (Favorites / Customize)
  topNavContainer: {
    position: 'absolute',
    top: 70,
    alignSelf: 'center',
    width: SCREEN_WIDTH * 0.45,
    height: 50,
    borderRadius: 30,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.85)',
  },
  topNavBlur: {
    flex: 1,
  },
  topNavInner: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  topNavItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  topNavIcon: {
    fontSize: 20,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  topNavLabel: {
    fontFamily: 'System',
    fontSize: 14,
    fontWeight: '300',
    color: 'rgba(255, 255, 255, 0.9)',
  },
  topNavDivider: {
    width: 1,
    height: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },

  // Central Quote
  quoteContainer: {
    position: 'absolute',
    top: SCREEN_HEIGHT * 0.35,
    left: 0,
    right: 0,
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  quoteText: {
    fontFamily: 'System',
    fontSize: 72,
    fontWeight: '300',
    fontStyle: 'italic',
    color: 'rgba(255, 255, 255, 0.95)',
    textAlign: 'center',
    lineHeight: 84,
    letterSpacing: -1,
    textShadowColor: 'rgba(0, 0, 0, 0.12)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
  },

  // Heart Glyph
  heartContainer: {
    position: 'absolute',
    top: SCREEN_HEIGHT * 0.35 + 200,
    alignSelf: 'center',
  },
  heartGlyph: {
    fontSize: 48,
    color: 'rgba(255, 255, 255, 0.9)',
  },

  // Bottom Segmented Control
  segmentedContainer: {
    position: 'absolute',
    bottom: 80,
    alignSelf: 'center',
    width: SCREEN_WIDTH * 0.86,
    height: 68,
    borderRadius: 36,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.9)',
    shadowColor: 'rgba(13, 19, 30, 0.35)',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 1,
    shadowRadius: 28,
    elevation: 10,
  },
  segmentedBlur: {
    flex: 1,
  },
  segmentedInner: {
    flex: 1,
    flexDirection: 'row',
    position: 'relative',
  },
  activeSlider: {
    position: 'absolute',
    left: 4,
    top: 4,
    bottom: 4,
    width: SCREEN_WIDTH * 0.43 / 2 - 8,
    borderRadius: 32,
    overflow: 'hidden',
    shadowColor: 'rgba(13, 19, 30, 0.45)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 5,
  },
  activeSliderInner: {
    flex: 1,
    backgroundColor: 'rgba(17, 26, 40, 0.65)',
  },
  activeSliderHighlight: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  segmentedPill: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  segmentedText: {
    fontFamily: 'System',
    fontSize: 22,
    fontWeight: '300',
    color: 'rgba(255, 255, 255, 0.7)',
    letterSpacing: 0.5,
  },
  segmentedTextActive: {
    fontWeight: '500',
    color: 'rgba(255, 255, 255, 1)',
  },
});
