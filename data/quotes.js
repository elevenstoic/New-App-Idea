import {
  getCurrentQuoteIndex,
  saveCurrentQuoteIndex,
  getLastQuoteDate,
  saveLastQuoteDate,
} from '../utils/storage';

export const quotes = [
  {
    text: "The only way to do great work is to love what you do",
    author: "Steve Jobs"
  },
  {
    text: "Life is what happens when you're busy making other plans",
    author: "John Lennon"
  },
  {
    text: "The future belongs to those who believe in the beauty of their dreams",
    author: "Eleanor Roosevelt"
  },
  {
    text: "It is during our darkest moments that we must focus to see the light",
    author: "Aristotle"
  },
  {
    text: "Be yourself; everyone else is already taken",
    author: "Oscar Wilde"
  },
  {
    text: "The only impossible journey is the one you never begin",
    author: "Tony Robbins"
  },
  {
    text: "In the end, we only regret the chances we didn't take",
    author: "Lewis Carroll"
  },
  {
    text: "The best time to plant a tree was 20 years ago. The second best time is now",
    author: "Chinese Proverb"
  },
  {
    text: "Your time is limited, don't waste it living someone else's life",
    author: "Steve Jobs"
  },
  {
    text: "The only limit to our realization of tomorrow is our doubts of today",
    author: "Franklin D. Roosevelt"
  },
  {
    text: "Life isn't about finding yourself. Life is about creating yourself",
    author: "George Bernard Shaw"
  },
  {
    text: "The purpose of our lives is to be happy",
    author: "Dalai Lama"
  },
  {
    text: "You miss 100% of the shots you don't take",
    author: "Wayne Gretzky"
  },
  {
    text: "Whether you think you can or you think you can't, you're right",
    author: "Henry Ford"
  },
  {
    text: "The best revenge is massive success",
    author: "Frank Sinatra"
  },
  {
    text: "Do what you can, with what you have, where you are",
    author: "Theodore Roosevelt"
  },
  {
    text: "Everything you've ever wanted is on the other side of fear",
    author: "George Addair"
  },
  {
    text: "Success is not final, failure is not fatal: it is the courage to continue that counts",
    author: "Winston Churchill"
  },
  {
    text: "Believe you can and you're halfway there",
    author: "Theodore Roosevelt"
  },
  {
    text: "The only way to achieve the impossible is to believe it is possible",
    author: "Charles Kingsleigh"
  },
  {
    text: "Dream big and dare to fail",
    author: "Norman Vaughan"
  },
  {
    text: "The secret of getting ahead is getting started",
    author: "Mark Twain"
  },
  {
    text: "What lies behind us and what lies before us are tiny matters compared to what lies within us",
    author: "Ralph Waldo Emerson"
  },
  {
    text: "Act as if what you do makes a difference. It does",
    author: "William James"
  },
  {
    text: "Success usually comes to those who are too busy to be looking for it",
    author: "Henry David Thoreau"
  },
  {
    text: "Don't watch the clock; do what it does. Keep going",
    author: "Sam Levenson"
  },
  {
    text: "The harder you work for something, the greater you'll feel when you achieve it",
    author: "Anonymous"
  },
  {
    text: "Don't be pushed around by the fears in your mind. Be led by the dreams in your heart",
    author: "Roy T. Bennett"
  },
  {
    text: "Change your thoughts and you change your world",
    author: "Norman Vincent Peale"
  },
  {
    text: "The only person you are destined to become is the person you decide to be",
    author: "Ralph Waldo Emerson"
  }
];

export async function getTodaysQuote() {
  try {
    const today = new Date().toDateString();
    const lastDate = await getLastQuoteDate();

    let currentIndex = await getCurrentQuoteIndex();

    // If it's a new day, get the next quote
    if (lastDate !== today) {
      currentIndex = (currentIndex + 1) % quotes.length;
      await saveCurrentQuoteIndex(currentIndex);
      await saveLastQuoteDate(today);
    }

    return quotes[currentIndex];
  } catch (error) {
    console.error('Error getting today\'s quote:', error);
    return quotes[0]; // Return first quote as fallback
  }
}

export async function getRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  return quotes[randomIndex];
}
