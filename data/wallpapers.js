import {
  getCurrentWallpaperIndex,
  saveCurrentWallpaperIndex,
  getLastWallpaperDate,
  saveLastWallpaperDate,
} from '../utils/storage';

// Beautiful aesthetic wallpaper URLs from Unsplash
export const wallpapers = [
  {
    url: 'https://images.unsplash.com/photo-1579547945413-497e1b99dac0?w=1080&q=80',
    category: 'Nature'
  },
  {
    url: 'https://images.unsplash.com/photo-1557683316-973673baf926?w=1080&q=80',
    category: 'Gradient'
  },
  {
    url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1080&q=80',
    category: 'Mountain'
  },
  {
    url: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1080&q=80',
    category: 'Forest'
  },
  {
    url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1080&q=80',
    category: 'Nature'
  },
  {
    url: 'https://images.unsplash.com/photo-1511884642898-4c92249e20b6?w=1080&q=80',
    category: 'Sunset'
  },
  {
    url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1080&q=80',
    category: 'Beach'
  },
  {
    url: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=1080&q=80',
    category: 'Ocean'
  },
  {
    url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1080&q=80',
    category: 'Landscape'
  },
  {
    url: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1080&q=80',
    category: 'Nature'
  },
  {
    url: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=1080&q=80',
    category: 'Minimal'
  },
  {
    url: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1080&q=80',
    category: 'Mountain'
  },
  {
    url: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=1080&q=80',
    category: 'Landscape'
  },
  {
    url: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=1080&q=80',
    category: 'Nature'
  },
  {
    url: 'https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=1080&q=80',
    category: 'Forest'
  },
  {
    url: 'https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?w=1080&q=80',
    category: 'Sunset'
  },
  {
    url: 'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?w=1080&q=80',
    category: 'Ocean'
  },
  {
    url: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=1080&q=80',
    category: 'Sky'
  },
  {
    url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1080&q=80',
    category: 'Mountain'
  },
  {
    url: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=1080&q=80',
    category: 'Lake'
  },
  {
    url: 'https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=1080&q=80',
    category: 'Landscape'
  },
  {
    url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1080&q=80',
    category: 'Mountain'
  },
  {
    url: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=1080&q=80',
    category: 'Nature'
  },
  {
    url: 'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=1080&q=80',
    category: 'Mountain'
  },
  {
    url: 'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=1080&q=80',
    category: 'Sunset'
  },
  {
    url: 'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?w=1080&q=80',
    category: 'Beach'
  },
  {
    url: 'https://images.unsplash.com/photo-1484496229713-5c3b9b7d161c?w=1080&q=80',
    category: 'Sky'
  },
  {
    url: 'https://images.unsplash.com/photo-1501630834273-4b5604d2ee31?w=1080&q=80',
    category: 'Forest'
  },
  {
    url: 'https://images.unsplash.com/photo-1478147427282-58a87a120781?w=1080&q=80',
    category: 'Landscape'
  },
  {
    url: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=1080&q=80',
    category: 'Mountain'
  }
];

export async function getTodaysWallpaper() {
  try {
    const today = new Date().toDateString();
    const lastDate = await getLastWallpaperDate();

    let currentIndex = await getCurrentWallpaperIndex();

    // If it's a new day, get the next wallpaper
    if (lastDate !== today) {
      currentIndex = (currentIndex + 1) % wallpapers.length;
      await saveCurrentWallpaperIndex(currentIndex);
      await saveLastWallpaperDate(today);
    }

    return wallpapers[currentIndex];
  } catch (error) {
    console.error('Error getting today\'s wallpaper:', error);
    return wallpapers[0]; // Return first wallpaper as fallback
  }
}
