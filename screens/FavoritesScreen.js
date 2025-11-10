import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function FavoritesScreen({ theme, favorites, onToggleFavorite }) {
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
          <Text style={styles.title}>Your Favorites</Text>
          <Text style={styles.subtitle}>
            {favorites.length} {favorites.length === 1 ? 'quote' : 'quotes'} saved
          </Text>

          {favorites.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyIcon}>💭</Text>
              <Text style={styles.emptyText}>No favorites yet</Text>
              <Text style={styles.emptySubtext}>
                Tap the heart icon on quotes you love to save them here
              </Text>
            </View>
          ) : (
            <View style={styles.quotesContainer}>
              {favorites.map((quote, index) => (
                <View key={index} style={styles.quoteCard}>
                  <Text style={[styles.cardQuoteText, { fontFamily }]}>
                    "{quote.text}"
                  </Text>
                  <Text style={[styles.cardAuthorText, { fontFamily }]}>
                    — {quote.author}
                  </Text>
                  <TouchableOpacity
                    style={styles.removeButton}
                    onPress={() => onToggleFavorite(quote)}
                  >
                    <Text style={styles.removeIcon}>❤️</Text>
                    <Text style={styles.removeText}>Remove</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}
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
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 20,
  },
  emptyText: {
    fontSize: 22,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 10,
  },
  emptySubtext: {
    fontSize: 16,
    color: '#b8b8d1',
    textAlign: 'center',
    paddingHorizontal: 40,
    lineHeight: 24,
  },
  quotesContainer: {
    gap: 20,
  },
  quoteCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
    padding: 25,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  cardQuoteText: {
    fontSize: 18,
    color: '#ffffff',
    lineHeight: 28,
    fontStyle: 'italic',
    marginBottom: 15,
  },
  cardAuthorText: {
    fontSize: 14,
    color: '#b8b8d1',
    marginBottom: 15,
  },
  removeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingVertical: 10,
    borderRadius: 15,
    marginTop: 10,
  },
  removeIcon: {
    fontSize: 18,
    marginRight: 8,
  },
  removeText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
});
