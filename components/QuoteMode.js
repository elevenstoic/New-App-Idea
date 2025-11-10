import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Animated, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { getTodaysQuote } from '../data/quotes';

const { width, height } = Dimensions.get('window');

export default function QuoteMode() {
  const [quote, setQuote] = useState(null);
  const fadeAnim = new Animated.Value(0);
  const scaleAnim = new Animated.Value(0.8);

  useEffect(() => {
    loadQuote();
  }, []);

  const loadQuote = async () => {
    const todaysQuote = await getTodaysQuote();
    setQuote(todaysQuote);

    // Animate quote in
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();
  };

  if (!quote) return null;

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#0f0c29', '#302b63', '#24243e']}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Animated.View
          style={[
            styles.quoteContainer,
            {
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          <Text style={styles.quoteText}>"{quote.text}"</Text>
          <View style={styles.authorContainer}>
            <View style={styles.decorativeLine} />
            <Text style={styles.authorText}>{quote.author}</Text>
            <View style={styles.decorativeLine} />
          </View>
        </Animated.View>

        {/* Decorative elements */}
        <View style={styles.topLeftDecor} />
        <View style={styles.bottomRightDecor} />
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  quoteContainer: {
    paddingHorizontal: 40,
    alignItems: 'center',
  },
  quoteText: {
    fontSize: 28,
    fontWeight: '300',
    color: '#ffffff',
    textAlign: 'center',
    lineHeight: 42,
    letterSpacing: 0.5,
    fontStyle: 'italic',
  },
  authorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
  },
  authorText: {
    fontSize: 16,
    color: '#b8b8d1',
    marginHorizontal: 15,
    fontWeight: '400',
    letterSpacing: 1,
  },
  decorativeLine: {
    width: 40,
    height: 1,
    backgroundColor: '#b8b8d1',
    opacity: 0.5,
  },
  topLeftDecor: {
    position: 'absolute',
    top: 80,
    left: 30,
    width: 60,
    height: 60,
    borderTopWidth: 2,
    borderLeftWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  bottomRightDecor: {
    position: 'absolute',
    bottom: 120,
    right: 30,
    width: 60,
    height: 60,
    borderBottomWidth: 2,
    borderRightWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
});
