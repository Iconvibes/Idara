# 🎉 Romantic Birthday Website

A beautifully crafted, interactive birthday website designed to celebrate a loved one with music, memories, and heartfelt messages.

## ✨ Features

### 🔐 Secret Code Access
- Protected entry with a secret code
- Beautiful animated entry screen with floating hearts
- Birthday popup with confetti animation upon successful entry

### ❤️ Love Letter Section
- A heartfelt personalized message expressing your love
- Smooth text animations with romantic styling
- Decorative hearts and emotional design

### 🎵 Music Player with Dynamic Backgrounds
- **5-Song Romantic Playlist:**
  - African Queen - 2Baba
  - Running To You - Chike ft. Simi
  - Fall In Love - T Classic ft. Mayorkun
  - Perfect - Ed Sheeran
  - Special Message - From Me

- **Smart Playback:**
  - Auto-play "Running To You" when site opens
  - Continuous playback (pause/resume remembers position)
  - Auto-play next song when current song ends
  - Click playlist items to instantly play songs
  - Next/Previous buttons auto-continue playback

- **Dynamic Background Images:**
  - Each song has a randomly assigned picture with gradient overlay
  - Changes automatically when you switch songs
  - Beautiful purple-blue gradient for consistent styling
  - New random assignments each page reload

### 🌷 Photo & Video Gallery
- **8 Photo Memories:**
  - First 6 photos visible on load
  - 2 additional photos unlocked via "Load More"

- **4 Video Memories:**
  - Auto-play on hover
  - Play/pause on click
  - Manual controls available
  - Built-in video player with fullscreen support

- **Interactive Lightbox:**
  - Click photos to view in fullscreen
  - Navigation arrows or keyboard arrows (← →)
  - Close with Escape key or close button
  - Smooth animations

### 🎨 Beautiful UI/UX
- Responsive design (works on desktop, tablet, mobile)
- Smooth animations and transitions
- Floating hearts background animation
- Gradient overlays and glass-morphism effects
- Romantic color palette (pinks, purples, whites)

### ⌨️ Keyboard Navigation
- Arrow keys to navigate between sections
- Escape to close popups/lightbox
- Enter to submit secret code
- Full accessibility support

## 🚀 Getting Started

### Setup
1. Extract all files to your desired location
2. Open `index.html` in your web browser
3. Enter the secret code (hint: our special date in DDMMYYYY format)

### File Structure
```
imisi-birthday-main/
├── index.html          # Main HTML file
├── script.js           # Interactive features & music control
├── styles.css          # Styling & animations
├── README.md           # This file
├── images/             # Photo and video assets
│   ├── pic1-8.jpeg    # Photo memories
│   └── vid1-4.mp4     # Video memories
└── music/              # Audio files
    ├── african-queen.mp3
    ├── running-to-you.mp3
    ├── fall-in-love.mp3
    ├── perfect.mp3
    └── From me.wav     # Special message
```

## 🎯 Customization

### Change the Secret Code
Edit `script.js` line 8:
```javascript
const SECRET_CODE = "DDMMYYYY"; // Change to your special date
```

### Update the Love Letter
Edit the text in `index.html` lines 75-125 with your personal message.

### Add Your Own Music
1. Add MP3/WAV files to the `music/` folder
2. Update the playlist in `script.js` (around line 43)
3. Ensure duration values are accurate in seconds

### Add Your Photos/Videos
1. Place images (JPG/PNG) in `images/` folder with names `pic1.jpeg`, `pic2.jpeg`, etc.
2. Place videos (MP4) with names `vid1.mp4`, `vid2.mp4`, etc.
3. Pictures are automatically randomly assigned to each song on load

### Personalize the Message
Edit the birthday popup message in `index.html` around line 570.

## 🎵 Music Features Explained

**Auto-Play on Site Open:**
- "Running To You" starts playing automatically after entering the code

**Pause & Resume:**
- Music remembers its position when paused
- Resume from exactly where you left off

**Continuous Playback:**
- When a song ends, the next one automatically plays
- Next/Previous buttons maintain playback if music is playing

**Dynamic Backgrounds:**
- Each song displays a different picture with gradient overlay
- Backgrounds shuffle randomly on each page reload
- Smooth transitions between songs

## 📱 Browser Support
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🎨 Color Palette
- **Primary Pink:** #778df8
- **Dark Pink:** #3f53b5
- **Coral:** #ff7f9c
- **Rose:** #f08080
- **Purple Accent:** #d946ef

## 💡 Tips

1. **Full Screen:** Press F11 or your browser's fullscreen button for a more immersive experience
2. **Volume Control:** Use the volume slider in the music player
3. **Load More Photos:** Scroll down and click "Load More Photos" to see additional memories
4. **Video Full Screen:** Click the fullscreen icon on any video in the gallery
5. **Music During Navigation:** Music continues playing as you navigate sections

## 🎁 Made With Love

This website was created as a special gift to celebrate someone truly special. Every detail—from the romantic color scheme to the personalized music selection—has been carefully chosen to express affection and create lasting memories.

---

**Enjoy the experience!** 💕

For questions, customization help or opinion, contact me at scofield5429@gmail.com
