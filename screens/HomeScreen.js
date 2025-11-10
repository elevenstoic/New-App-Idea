import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Animated, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { getTodaysQuote } from '../data/quotes';

const { width, height } = Dimensions.get('window');

export default function HomeScreen({ theme, favorites, onToggleFavorite }) {
  const [quote, setQuote] = useState(null);
  const [fadeAnim] = useState(new Animated.Value(0));
  const [scaleAnim] = useState(new Animated.Value(0.9));

  useEffect(() => {
    loadQuote();
  }, []);

  const loadQuote = async () => {
    const todaysQuote = await getTodaysQuote();
    setQuote(todaysQuote);

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

  const isFavorite = quote && favorites.some(fav => fav.text === quote.text);

  if (!quote) return null;

  const fontFamily = theme.font === 'serif' ? 'serif' : theme.font === 'mono' ? 'monospace' : 'default';

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
          <Animated.View
            style={[
              styles.quoteContainer,
              {
                opacity: fadeAnim,
                transform: [{ scale: scaleAnim }],
              },
            ]}
          >
            {/* Quote Text */}
            <Text style={[styles.quoteText, { fontFamily }]}>
              "{quote.text}"
            </Text>

            {/* Author */}
            <View style={styles.authorContainer}>
              <View style={styles.decorativeLine} />
              <Text style={[styles.authorText, { fontFamily }]}>{quote.author}</Text>
              <View style={styles.decorativeLine} />
            </View>

            {/* Like Button */}
            <TouchableOpacity
              style={styles.likeButton}
              onPress={() => onToggleFavorite(quote)}
            >
              <Text style={styles.likeIcon}>
                {isFavorite ? '❤️' : '🤍'}
              </Text>
              <Text style={styles.likeText}>
                {isFavorite ? 'Saved' : 'Save to Favorites'}
              </Text>
            </TouchableOpacity>
          </Animated.View>

          {/* Decorative elements */}
          <View style={styles.topLeftDecor} />
          <View style={styles.bottomRightDecor} />
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
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 100,
    paddingHorizontal: 30,
    minHeight: height,
  },
  quoteContainer: {
    width: '100%',
    alignItems: 'center',
  },
  quoteText: {
    fontSize: 32,
    fontWeight: '300',
    color: '#ffffff',
    textAlign: 'center',
    lineHeight: 48,
    letterSpacing: 0.5,
    fontStyle: 'italic',
    marginBottom: 30,
  },
  authorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  authorText: {
    fontSize: 18,
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
  likeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 30,
    marginTop: 20,
  },
  likeIcon: {
    fontSize: 24,
    marginRight: 10,
  },
  likeText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
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
