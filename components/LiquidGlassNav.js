import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Animated,
  Modal,
  Switch,
  Dimensions,
  Platform,
} from 'react-native';
import { BlurView } from 'expo-blur';

const { width } = Dimensions.get('window');

export default function LiquidGlassNav({ currentMode, onModeSwitch, settings, onSettingsUpdate }) {
  const [settingsVisible, setSettingsVisible] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(settings.notificationsEnabled);
  const [dailyQuoteCount, setDailyQuoteCount] = useState(settings.dailyQuoteCount);

  const handleModePress = (mode) => {
    if (mode !== currentMode) {
      onModeSwitch(mode);
    }
  };

  const handleSaveSettings = () => {
    onSettingsUpdate({
      notificationsEnabled,
      dailyQuoteCount,
    });
    setSettingsVisible(false);
  };

  return (
    <>
      <View style={styles.navContainer}>
        <BlurView intensity={80} tint="dark" style={styles.blurContainer}>
          {/* Liquid glass effect overlay */}
          <View style={styles.liquidOverlay} />

          <View style={styles.navContent}>
            {/* Mode Switcher */}
            <View style={styles.modeContainer}>
              <TouchableOpacity
                style={[
                  styles.modeButton,
                  currentMode === 'quote' && styles.modeButtonActive,
                ]}
                onPress={() => handleModePress('quote')}
              >
                <Text
                  style={[
                    styles.modeText,
                    currentMode === 'quote' && styles.modeTextActive,
                  ]}
                >
                  Quotes
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.modeButton,
                  currentMode === 'wallpaper' && styles.modeButtonActive,
                ]}
                onPress={() => handleModePress('wallpaper')}
              >
                <Text
                  style={[
                    styles.modeText,
                    currentMode === 'wallpaper' && styles.modeTextActive,
                  ]}
                >
                  Wallpapers
                </Text>
              </TouchableOpacity>
            </View>

            {/* Settings Button */}
            <TouchableOpacity
              style={styles.settingsButton}
              onPress={() => setSettingsVisible(true)}
            >
              <Text style={styles.settingsIcon}>⚙</Text>
            </TouchableOpacity>
          </View>
        </BlurView>
      </View>

      {/* Settings Modal */}
      <Modal
        visible={settingsVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setSettingsVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <BlurView intensity={90} tint="dark" style={styles.modalContent}>
            <View style={styles.liquidOverlay} />

            <Text style={styles.modalTitle}>Settings</Text>

            <View style={styles.settingRow}>
              <Text style={styles.settingLabel}>Daily Quote Notifications</Text>
              <Switch
                value={notificationsEnabled}
                onValueChange={setNotificationsEnabled}
                trackColor={{ false: '#767577', true: '#8b7dd8' }}
                thumbColor={notificationsEnabled ? '#fff' : '#f4f3f4'}
              />
            </View>

            {notificationsEnabled && (
              <View style={styles.settingRow}>
                <Text style={styles.settingLabel}>Quotes per day</Text>
                <View style={styles.countButtons}>
                  {[1, 2, 3].map((count) => (
                    <TouchableOpacity
                      key={count}
                      style={[
                        styles.countButton,
                        dailyQuoteCount === count && styles.countButtonActive,
                      ]}
                      onPress={() => setDailyQuoteCount(count)}
                    >
                      <Text
                        style={[
                          styles.countText,
                          dailyQuoteCount === count && styles.countTextActive,
                        ]}
                      >
                        {count}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            )}

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setSettingsVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.saveButton}
                onPress={handleSaveSettings}
              >
                <Text style={styles.saveButtonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </BlurView>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  navContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    height: 70,
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
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  modeContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 25,
    padding: 4,
  },
  modeButton: {
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 20,
  },
  modeButtonActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
  },
  modeText: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 15,
    fontWeight: '600',
  },
  modeTextActive: {
    color: '#ffffff',
  },
  settingsButton: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingsIcon: {
    fontSize: 24,
    color: '#ffffff',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: width - 60,
    borderRadius: 30,
    padding: 30,
    overflow: 'hidden',
  },
  modalTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 30,
    textAlign: 'center',
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
  },
  settingLabel: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: '500',
  },
  countButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  countButton: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    justifyContent: 'center',
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
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
    gap: 15,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 15,
    borderRadius: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  saveButton: {
    flex: 1,
    paddingVertical: 15,
    borderRadius: 15,
    backgroundColor: '#8b7dd8',
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
});
