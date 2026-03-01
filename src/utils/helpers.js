export const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const formatTime = (seconds) => {
  if (!seconds || isNaN(seconds)) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
};

export const getRandomEmojis = () => {
  const emojis = [
    "❤️", "💕", "💖", "💗", "💝", "💓", "💞", "💘",
    "🌹", "✨", "💐", "🦋", "⭐", "🌟"
  ];
  return emojis[Math.floor(Math.random() * emojis.length)];
};
