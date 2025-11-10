# Aesthetic Quotes & Wallpapers App

A beautiful, minimalist mobile app that combines daily inspirational quotes with stunning wallpapers. Built with React Native and Expo.

## Features

- **Dual Mode Interface**: Switch seamlessly between Quote Mode and Wallpaper Mode
- **Liquid Glass Navigation**: Modern glassmorphism UI with a frosted glass effect
- **Daily Quotes**: New inspirational quote every day
- **Daily Wallpapers**: Fresh aesthetic wallpaper daily from curated collection
- **Smart Notifications**: Customizable daily quote notifications (1-3 per day)
- **Smooth Animations**: Beautiful transitions when switching between modes
- **Aesthetic Design**: Dark theme with gradient backgrounds and elegant typography

## Tech Stack

- React Native
- Expo
- expo-notifications
- expo-blur (for glassmorphism effects)
- expo-linear-gradient
- AsyncStorage (for data persistence)
- react-native-reanimated

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd New-App-Idea
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Run on your device:
- Scan the QR code with the Expo Go app (Android)
- Scan the QR code with the Camera app (iOS)

Or run on emulator/simulator:
```bash
npm run android  # For Android
npm run ios      # For iOS
```

## Features Details

### Quote Mode
- Displays a centered, beautifully formatted quote
- Author attribution with decorative elements
- Gradient background for aesthetic appeal
- Daily rotation of quotes from curated collection

### Wallpaper Mode
- Full-screen high-quality wallpapers
- Category tags for wallpaper themes
- Smooth image loading with fade-in effect
- Daily wallpaper rotation

### Navigation
- Liquid glass effect using blur and transparency
- Mode switcher with active state indication
- Settings access for notification preferences
- Fixed position at bottom with rounded corners

### Notifications
- Schedule 1-3 daily quote notifications
- Customizable notification times (morning, afternoon, evening)
- Toggle notifications on/off
- Beautiful notification format with quote and author

## Project Structure

```
├── App.js                  # Main application entry point
├── components/
│   ├── QuoteMode.js       # Quote display screen
│   ├── WallpaperMode.js   # Wallpaper display screen
│   └── LiquidGlassNav.js  # Navigation bar with glassmorphism
├── utils/
│   ├── notifications.js   # Notification setup and scheduling
│   └── storage.js         # AsyncStorage utilities
├── data/
│   ├── quotes.js          # Quote collection and logic
│   └── wallpapers.js      # Wallpaper collection and logic
├── assets/                # App icons and images
├── app.json              # Expo configuration
├── package.json          # Dependencies
└── README.md            # This file
```

## Customization

### Adding More Quotes
Edit `data/quotes.js` and add quotes to the `quotes` array:

```javascript
{
  text: "Your quote here",
  author: "Author Name"
}
```

### Adding More Wallpapers
Edit `data/wallpapers.js` and add wallpaper URLs to the `wallpapers` array:

```javascript
{
  url: 'https://example.com/image.jpg',
  category: 'Category Name'
}
```

### Customizing Notification Times
Edit `utils/notifications.js` and modify the `times` array in the `scheduleDailyQuotes` function.

## Building for Production

### Android
```bash
expo build:android
```

### iOS
```bash
expo build:ios
```

## License

MIT License

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
