import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Modal, Animated } from 'react-native';
import { BlurView } from 'expo-blur';

export default function HamburgerMenu({ isOpen, onToggle, onNavigate, currentScreen }) {
  return (
    <>
      {/* Hamburger Button */}
      <TouchableOpacity
        style={styles.hamburgerButton}
        onPress={onToggle}
      >
        <View style={styles.hamburgerLine} />
        <View style={styles.hamburgerLine} />
        <View style={styles.hamburgerLine} />
      </TouchableOpacity>

      {/* Menu Modal */}
      <Modal
        visible={isOpen}
        transparent
        animationType="fade"
        onRequestClose={onToggle}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={onToggle}
        >
          <BlurView intensity={90} tint="dark" style={styles.menuContainer}>
            <View style={styles.liquidOverlay} />

            <View style={styles.menuContent}>
              <Text style={styles.menuTitle}>Menu</Text>

              <TouchableOpacity
                style={[
                  styles.menuItem,
                  currentScreen === 'home' && styles.menuItemActive,
                ]}
                onPress={() => onNavigate('home')}
              >
                <Text style={styles.menuIcon}>🏠</Text>
                <Text style={styles.menuText}>Home</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.menuItem,
                  currentScreen === 'favorites' && styles.menuItemActive,
                ]}
                onPress={() => onNavigate('favorites')}
              >
                <Text style={styles.menuIcon}>❤️</Text>
                <Text style={styles.menuText}>Favorites</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.menuItem,
                  currentScreen === 'customize' && styles.menuItemActive,
                ]}
                onPress={() => onNavigate('customize')}
              >
                <Text style={styles.menuIcon}>🎨</Text>
                <Text style={styles.menuText}>Customize</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.menuItem,
                  currentScreen === 'wallpaper' && styles.menuItemActive,
                ]}
                onPress={() => onNavigate('wallpaper')}
              >
                <Text style={styles.menuIcon}>🖼️</Text>
                <Text style={styles.menuText}>Wallpaper</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.closeButton} onPress={onToggle}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </BlurView>
        </TouchableOpacity>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  hamburgerButton: {
    position: 'absolute',
    top: 60,
    right: 20,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
    zIndex: 1000,
  },
  hamburgerLine: {
    width: 24,
    height: 2,
    backgroundColor: '#ffffff',
    borderRadius: 1,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuContainer: {
    width: '85%',
    maxWidth: 350,
    borderRadius: 30,
    overflow: 'hidden',
  },
  liquidOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 30,
  },
  menuContent: {
    padding: 30,
  },
  menuTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 30,
    textAlign: 'center',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
  },
  menuItemActive: {
    backgroundColor: 'rgba(139, 125, 216, 0.3)',
  },
  menuIcon: {
    fontSize: 24,
    marginRight: 15,
  },
  menuText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
  closeButton: {
    marginTop: 20,
    paddingVertical: 15,
    borderRadius: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});
