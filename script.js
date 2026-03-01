/* ============================================
   ROMANTIC BIRTHDAY WEBSITE - JAVASCRIPT
   ============================================ */

// ============================================
// CONFIGURATION & STATE
// ============================================

const SECRET_CODE = "23062025";
let isCodeEntered = false;
let currentSong = 0;
let isPlaying = false;
let currentLoadedSong = -1; // Track which song is currently loaded to avoid reset
// Prevent creating duplicate intervals for floating hearts
let heartsIntervalId = null;
// Track touch start target to avoid swipes from controls
let touchStartTarget = null;

// Array of available pictures for backgrounds
const availablePictures = [
  "./images/pic1.jpeg",
  "./images/pic2.jpeg",
  "./images/pic3.jpeg",
  "./images/pic4.jpeg",
  "./images/pic5.jpeg",
  "./images/pic6.jpeg",
  "./images/pic7.jpeg",
  "./images/pic8.jpeg",
];

// Function to randomly shuffle array
function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Music playlist data
const playlist = [
  {
    name: "African Queen",
    artist: "2Baba",
    duration: 210,
    url: "./music/african-queen.mp3",
  },
  {
    name: "Running To You",
    artist: "Chike ft. Simi",
    duration: 212,
    url: "./music/running-to-you.mp3",
  },
  {
    name: "Fall In Love",
    artist: "T classic ft. Mayorkun",
    duration: 220,
    url: "./music/fall-in-love.mp3",
  },
  {
    name: "Perfect",
    artist: "Ed Sheeran",
    duration: 210,
    url: "./music/perfect.mp3",
  },
  {
    name: "Special Message",
    artist: "From Me",
    duration: 180,
    url: "./music/From me.wav",
  },
];

// Assign random background pictures to each song
function assignBackgroundPictures() {
  const shuffledPictures = shuffleArray(availablePictures);
  playlist.forEach((song, index) => {
    song.backgroundImage = shuffledPictures[index];
  });
}

// Update music section background and gradient
function updateMusicBackground() {
  const musicSection = document.getElementById("music");
  const song = playlist[currentSong];
  
  if (musicSection && song.backgroundImage) {
    // Apply background to the music section
    musicSection.style.backgroundImage = `
      linear-gradient(135deg, rgba(120, 141, 248, 0.7), rgba(63, 83, 181, 0.7)),
      url('${song.backgroundImage}')
    `;
    musicSection.style.backgroundSize = "cover";
    musicSection.style.backgroundPosition = "center";
    musicSection.style.backgroundAttachment = "fixed";
    musicSection.style.minHeight = "100vh";
    musicSection.style.paddingTop = "40px";
    musicSection.style.paddingBottom = "40px";
  }
}

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener("DOMContentLoaded", () => {
  assignBackgroundPictures();
  initializeAudioPlayer();
  initializeEventListeners();
  createFloatingHearts();
  checkAutoplay();
});

function initializeEventListeners() {
  // Secret code verification
  const codeInput = document.getElementById("code-input");
  const codeBtn = document.getElementById("code-btn");
  const errorMessage = document.getElementById("error-message");

  codeBtn.addEventListener("click", verifyCode);
  codeInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") verifyCode();
  });

  // Show/hide password as dots
  codeInput.addEventListener("input", () => {
    // Just let the input work normally
  });

  // Navigation buttons
  const navButtons = document.querySelectorAll(".nav-btn");
  navButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const sectionId = btn.getAttribute("data-section");
      switchSection(sectionId);
    });
  });

  // Music player controls
  document
    .getElementById("play-pause-btn")
    .addEventListener("click", togglePlayPause);
  document.getElementById("prev-btn").addEventListener("click", previousSong);
  document.getElementById("next-btn").addEventListener("click", nextSong);
  document
    .getElementById("progress-slider")
    .addEventListener("input", seekMusic);
  document
    .getElementById("volume-slider")
    .addEventListener("input", changeVolume);

  // Playlist item selection
  const playlistItems = document.querySelectorAll(".playlist-item");
  playlistItems.forEach((item, index) => {
    item.addEventListener("click", () => {
      currentSong = index;
      currentLoadedSong = -1; // Reset to ensure new song loads when play is pressed
      updateSongDisplay();
      
      // Auto-play the selected song
      if (!isPlaying) {
        isPlaying = true;
        const btn = document.getElementById("play-pause-btn");
        btn.innerHTML = '<i class="fas fa-pause"></i>';
      }
      startMusicSimulation();
    });
  });

  // Birthday popup close
  document
    .querySelector(".popup-close-btn")
    .addEventListener("click", closeBirthdayPopup);

  // Gallery lightbox
  initializeGallery();
}

// ============================================
// SECRET CODE VERIFICATION
// ============================================

function verifyCode() {
  const codeInput = document.getElementById("code-input");
  const errorMessage = document.getElementById("error-message");
  const enteredCode = codeInput.value;

  if (enteredCode === SECRET_CODE) {
    // Correct code
    errorMessage.textContent = "";
    document.getElementById("secret-code-screen").classList.remove("active");
    document.getElementById("main-screen").classList.add("active");
    isCodeEntered = true;

    // Show birthday popup and confetti
    showBirthdayPopup();
    playConfetti();
    createFloatingHearts();

    // Auto-play music
    simulateAutoPlay();
  } else if (enteredCode.length === 8 || enteredCode !== SECRET_CODE) {
    // Wrong code with full length
    errorMessage.textContent =
      "❌ Oops, that's not our special date ❤️ Try again.";
    codeInput.value = "";
    codeInput.focus();
    animateError(codeInput);
  }
}

function animateError(element) {
  element.style.animation = "none";
  setTimeout(() => {
    element.style.animation = "shake 0.5s ease-in-out";
  }, 10);
}

// ============================================
// SECTION SWITCHING
// ============================================

function switchSection(sectionId) {
  // Hide all sections
  document.querySelectorAll(".section").forEach((section) => {
    section.classList.remove("active");
  });

  // Remove active from all nav buttons
  document.querySelectorAll(".nav-btn").forEach((btn) => {
    btn.classList.remove("active");
  });

  // Show selected section
  document.getElementById(sectionId).classList.add("active");

  // Add active to clicked button
  document
    .querySelector(`[data-section="${sectionId}"]`)
    .classList.add("active");

  // Update music background when switching to music section
  if (sectionId === "music") {
    updateMusicBackground();
  }

  // Scroll to top only on desktop - disabled on mobile for page-based navigation
  const isMobile = window.innerWidth <= 768;
  if (!isMobile) {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

// ============================================
// FLOATING HEARTS ANIMATION
// ============================================

function createFloatingHearts() {
  const container = document.getElementById("hearts-container");
  if (!container) return;
  const loveEmojis = [
    "❤️",
    "💕",
    "💖",
    "💗",
    "💝",
    "💓",
    "💞",
    "💘",
    "🌹",
    "✨",
    "💐",
    "🦋",
    "⭐",
    "🌟",
  ];

  function createHeart() {
    const heart = document.createElement("div");
    heart.className = "heart";
    heart.textContent =
      loveEmojis[Math.floor(Math.random() * loveEmojis.length)];

    const startX = Math.random() * window.innerWidth;
    const startY = window.innerHeight;
    const duration = 6 + Math.random() * 6; // 6-12 seconds
    const delay = Math.random() * 0.5; // Random start delay

    heart.style.left = startX + "px";
    heart.style.top = startY + "px";
    heart.style.animationDuration = duration + "s";
    heart.style.animationDelay = delay + "s";
    heart.style.fontSize = 1.5 + Math.random() * 1.5 + "rem"; // Random sizes

    container.appendChild(heart);

    setTimeout(() => heart.remove(), (duration + delay) * 1000);
  }

  // Prevent creating multiple intervals if called repeatedly
  if (heartsIntervalId) return;
  heartsIntervalId = setInterval(createHeart, 400); // Create more frequently for fuller effect
}

// ============================================
// BIRTHDAY POPUP
// ============================================

function showBirthdayPopup() {
  const popup = document.getElementById("birthday-popup");
  popup.classList.add("show");

  // Auto-close after 5 seconds
  setTimeout(() => {
    closeBirthdayPopup();
  }, 5000);
}

function closeBirthdayPopup() {
  document.getElementById("birthday-popup").classList.remove("show");
}

// ============================================
// CONFETTI ANIMATION
// ============================================

function playConfetti() {
  const canvas = document.getElementById("confetti-canvas");
  const ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = [];
  const particleCount = 100;

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      vx: (Math.random() - 0.5) * 8,
      vy: Math.random() * 4 + 4,
      life: 1,
      decay: Math.random() * 0.015 + 0.015,
      size: Math.random() * 3 + 2,
      color: ["#FF69B4", "#FFB6C1", "#FF6B9D", "#F08080", "#FF7F9C"][
        Math.floor(Math.random() * 5)
      ],
    });
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((p, index) => {
      p.y += p.vy;
      p.x += p.vx;
      p.vy += 0.1; // gravity
      p.life -= p.decay;

      if (p.life > 0) {
        ctx.globalAlpha = p.life;
        ctx.fillStyle = p.color;
        ctx.fillRect(p.x, p.y, p.size, p.size);
      }
    });

    if (particles.some((p) => p.life > 0)) {
      requestAnimationFrame(animate);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      canvas.style.display = "none";
    }
  }

  animate();
}

// Handle window resize for confetti
window.addEventListener("resize", () => {
  const canvas = document.getElementById("confetti-canvas");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// ============================================
// MUSIC PLAYER
// ============================================

function updateSongDisplay() {
  const song = playlist[currentSong];
  document.getElementById("song-name").textContent = song.name;
  document.getElementById("song-artist").textContent = song.artist;

  // Update playlist highlight
  document.querySelectorAll(".playlist-item").forEach((item, index) => {
    if (index === currentSong) {
      item.style.background = "rgba(255, 107, 157, 0.3)";
    } else {
      item.style.background = "rgba(255, 240, 245, 0.8)";
    }
  });

  // Reset progress
  document.getElementById("progress-slider").value = 0;
  document.getElementById("progress-slider").max = song.duration;
  document.getElementById("current-time").textContent = "0:00";
  updateDurationDisplay(song.duration);
  
  // Update music background with new picture
  updateMusicBackground();
}

function updateDurationDisplay(duration) {
  const minutes = Math.floor(duration / 60);
  const seconds = duration % 60;
  document.getElementById("duration-time").textContent =
    `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

function togglePlayPause() {
  const btn = document.getElementById("play-pause-btn");
  isPlaying = !isPlaying;

  if (isPlaying) {
    btn.innerHTML = '<i class="fas fa-pause"></i>';
    startMusicSimulation();
  } else {
    btn.innerHTML = '<i class="fas fa-play"></i>';
    stopMusicSimulation();
  }
}

let musicSimulationInterval;
let audioPlayer = null;

function initializeAudioPlayer() {
  audioPlayer = document.getElementById("audio-player");
  if (audioPlayer) {
    audioPlayer.addEventListener("timeupdate", updateProgressFromAudio);
    audioPlayer.addEventListener("loadedmetadata", updateDurationFromAudio);
    audioPlayer.addEventListener("ended", nextSong);
  }
}

function updateProgressFromAudio() {
  if (audioPlayer && audioPlayer.duration) {
    const currentTime = Math.floor(audioPlayer.currentTime);
    document.getElementById("progress-slider").value = currentTime;
    document.getElementById("current-time").textContent =
      formatTime(currentTime);
    updateProgressBar();
  }
}

function updateDurationFromAudio() {
  if (audioPlayer && audioPlayer.duration) {
    const duration = Math.floor(audioPlayer.duration);
    document.getElementById("progress-slider").max = duration;
    document.getElementById("duration-time").textContent = formatTime(duration);
  }
}

function startMusicSimulation() {
  const song = playlist[currentSong];

  if (audioPlayer && song.url) {
    // Only set the source if it's a different song to avoid restart on pause/resume
    if (currentLoadedSong !== currentSong) {
      audioPlayer.src = song.url;
      currentLoadedSong = currentSong;
    }
    audioPlayer.play().catch((err) => {
      console.log("Audio play error:", err);
      // Fallback to simulation if audio can't play
      fallbackMusicSimulation();
    });
  } else {
    // Fallback to simulation
    fallbackMusicSimulation();
  }
}

function fallbackMusicSimulation() {
  const song = playlist[currentSong];
  let currentTime =
    parseInt(document.getElementById("progress-slider").value) || 0;

  musicSimulationInterval = setInterval(() => {
    if (currentTime >= song.duration) {
      nextSong();
      return;
    }

    currentTime += 1;
    document.getElementById("progress-slider").value = currentTime;
    document.getElementById("current-time").textContent =
      formatTime(currentTime);
    updateProgressBar();
  }, 1000);
}

function stopMusicSimulation() {
  clearInterval(musicSimulationInterval);
  if (audioPlayer) {
    audioPlayer.pause();
  }
}

function nextSong() {
  const wasPlaying = isPlaying;
  currentSong = (currentSong + 1) % playlist.length;
  currentLoadedSong = -1; // Reset to ensure new song loads
  isPlaying = false;
  document.getElementById("play-pause-btn").innerHTML =
    '<i class="fas fa-play"></i>';
  stopMusicSimulation();
  updateSongDisplay();
  
  // Auto-play next song if music was playing
  if (wasPlaying) {
    isPlaying = true;
    document.getElementById("play-pause-btn").innerHTML =
      '<i class="fas fa-pause"></i>';
    startMusicSimulation();
  }
}

function previousSong() {
  const wasPlaying = isPlaying;
  currentSong = (currentSong - 1 + playlist.length) % playlist.length;
  currentLoadedSong = -1; // Reset to ensure new song loads
  isPlaying = false;
  document.getElementById("play-pause-btn").innerHTML =
    '<i class="fas fa-play"></i>';
  stopMusicSimulation();
  updateSongDisplay();
  
  // Auto-play previous song if music was playing
  if (wasPlaying) {
    isPlaying = true;
    document.getElementById("play-pause-btn").innerHTML =
      '<i class="fas fa-pause"></i>';
    startMusicSimulation();
  }
}

function seekMusic(e) {
  const value = e.target.value;
  document.getElementById("current-time").textContent = formatTime(value);
  updateProgressBar();
  if (audioPlayer) {
    audioPlayer.currentTime = value;
  }
}

function updateProgressBar() {
  const slider = document.getElementById("progress-slider");
  const fill = document.querySelector(".progress-fill");
  const value = (slider.value / slider.max) * 100;
  fill.style.width = value + "%";
}

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

function changeVolume(e) {
  const volume = e.target.value / 100; // Convert to 0-1 range
  if (audioPlayer) {
    audioPlayer.volume = volume;
  }
}

function simulateAutoPlay() {
  // Auto-play "Running To You" as first song
  currentSong = 1;
  currentLoadedSong = -1;
  updateSongDisplay();
  // Auto-play music when code is entered
  togglePlayPause();
}

function checkAutoplay() {
  if (!isCodeEntered) return;
  // Check if we need to trigger autoplay
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

// Add smooth scrolling for internal links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

// Handle page visibility for music player
document.addEventListener("visibilitychange", () => {
  if (document.hidden && isPlaying) {
    stopMusicSimulation();
  }
});

// ============================================
// INTERACTIVE EFFECTS
// ============================================

// Add click effect on sticky notes
document.querySelectorAll(".sticky-note").forEach((note) => {
  note.addEventListener("click", function () {
    this.style.transform = "scale(1.05) rotate(0deg)";
    setTimeout(() => {
      this.style.transform = "scale(1) rotate(0deg)";
    }, 300);
  });
});

// Add hover scale effect to gallery items
document.querySelectorAll(".gallery-item").forEach((item) => {
  item.addEventListener("mouseenter", function () {
    // CSS handles this with hover
  });
});

// ============================================
// PERFORMANCE OPTIMIZATIONS
// ============================================

// Debounce function for resize events
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// ============================================
// ACCESSIBILITY FEATURES
// ============================================

// Keyboard navigation
document.addEventListener("keydown", (e) => {
  // Don't interfere while typing or when editable elements are focused
  const activeEl = document.activeElement;
  if (
    activeEl &&
    (activeEl.tagName === "INPUT" ||
      activeEl.tagName === "TEXTAREA" ||
      activeEl.isContentEditable)
  ) {
    return;
  }

  if (e.key === "Escape") {
    closeBirthdayPopup();
    return;
  }

  // Arrow key navigation for nav buttons — only when main screen visible and no modal open
  if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
    const mainScreen = document.getElementById("main-screen");
    const popup = document.getElementById("birthday-popup");
    const lightbox = document.getElementById("lightbox-modal");
    if (
      !mainScreen ||
      !mainScreen.classList.contains("active") ||
      (popup && popup.classList.contains("show")) ||
      (lightbox && lightbox.classList.contains("show"))
    ) {
      return;
    }

    const activeBtn = document.querySelector(".nav-btn.active");
    if (activeBtn) {
      const allBtns = Array.from(document.querySelectorAll(".nav-btn"));
      const currentIndex = allBtns.indexOf(activeBtn);
      let nextIndex;

      if (e.key === "ArrowRight") {
        nextIndex = (currentIndex + 1) % allBtns.length;
      } else {
        nextIndex = (currentIndex - 1 + allBtns.length) % allBtns.length;
      }

      allBtns[nextIndex].click();
    }
  }
});

// ============================================
// GALLERY & LIGHTBOX FUNCTIONALITY
// ============================================

let currentLightboxIndex = 0;
let visibleCount = 6;

function initializeGallery() {
  // Gallery item click to open lightbox
  const galleryItems = document.querySelectorAll(".gallery-item");
  galleryItems.forEach((item, index) => {
    // Check if this item contains a video
    const video = item.querySelector("video");
    
    // Add hover events for videos
    if (video) {
      item.addEventListener("mouseenter", () => {
        video.play();
      });
      item.addEventListener("mouseleave", () => {
        video.pause();
        video.currentTime = 0; // Reset to start
      });
      
      // Double click or single click to play/pause
      item.addEventListener("click", (e) => {
        e.preventDefault();
        if (video.paused) {
          video.play();
        } else {
          video.pause();
        }
      });
    } else {
      // For images, still allow click to open lightbox
      item.addEventListener("click", () => {
        openLightbox(index);
      });
    }
  });

  // Lightbox controls
  const lightboxModal = document.getElementById("lightbox-modal");
  const closeBtn = document.querySelector(".lightbox-close");
  const prevBtn = document.querySelector(".lightbox-prev");
  const nextBtn = document.querySelector(".lightbox-next");

  closeBtn.addEventListener("click", closeLightbox);
  prevBtn.addEventListener("click", previousImage);
  nextBtn.addEventListener("click", nextImage);

  // Close lightbox when clicking outside the image
  lightboxModal.addEventListener("click", (e) => {
    if (e.target === lightboxModal) {
      closeLightbox();
    }
  });

  // Load more button
  const loadMoreBtn = document.getElementById("load-more-btn");
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener("click", loadMorePhotos);
  }

  // Keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (lightboxModal.classList.contains("show")) {
      if (e.key === "ArrowLeft") previousImage();
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "Escape") closeLightbox();
    }
  });
}

function openLightbox(index) {
  currentLightboxIndex = index;
  const visibleItems = Array.from(
    document.querySelectorAll(
      ".gallery-item:not(.hidden-item), .gallery-item.show",
    ),
  );
  const clickedItem = visibleItems[index];

  if (clickedItem) {
    const img = clickedItem.querySelector("img");
    const caption = clickedItem.querySelector(".gallery-overlay p");

    const lightboxImage = document.getElementById("lightbox-image");
    const lightboxCaption = document.getElementById("lightbox-caption");
    const lightboxModal = document.getElementById("lightbox-modal");

    lightboxImage.src = img.src;
    lightboxImage.alt = img.alt;
    lightboxCaption.textContent = caption.textContent;

    lightboxModal.classList.add("show");
    document.body.style.overflow = "hidden";
  }
}

function closeLightbox() {
  const lightboxModal = document.getElementById("lightbox-modal");
  lightboxModal.classList.remove("show");
  document.body.style.overflow = "auto";
}

function nextImage() {
  const visibleItems = Array.from(
    document.querySelectorAll(
      ".gallery-item:not(.hidden-item), .gallery-item.show",
    ),
  );
  currentLightboxIndex = (currentLightboxIndex + 1) % visibleItems.length;
  openLightbox(currentLightboxIndex);
}

function previousImage() {
  const visibleItems = Array.from(
    document.querySelectorAll(
      ".gallery-item:not(.hidden-item), .gallery-item.show",
    ),
  );
  currentLightboxIndex =
    (currentLightboxIndex - 1 + visibleItems.length) % visibleItems.length;
  openLightbox(currentLightboxIndex);
}

function loadMorePhotos() {
  const hiddenItems = document.querySelectorAll(".gallery-item.hidden-item");
  const itemsToShow = 6;
  let count = 0;

  hiddenItems.forEach((item) => {
    if (count < itemsToShow && item.classList.contains("hidden-item")) {
      item.classList.add("show");
      item.classList.remove("hidden-item");
      count++;
    }
  });

  // Hide load more button if all items are shown
  const remainingHidden = document.querySelectorAll(
    ".gallery-item.hidden-item",
  );
  const loadMoreBtn = document.getElementById("load-more-btn");
  if (remainingHidden.length === 0 && loadMoreBtn) {
    loadMoreBtn.classList.add("hidden");
  }

  // Re-initialize gallery items
  const galleryItems = document.querySelectorAll(".gallery-item");
  galleryItems.forEach((item, index) => {
    item.removeEventListener("click", null);
    item.addEventListener("click", () => {
      const allVisibleItems = document.querySelectorAll(
        ".gallery-item:not(.hidden-item)",
      );
      const clickedIndex = Array.from(allVisibleItems).indexOf(item);
      openLightbox(clickedIndex);
    });
  });
}

// Console Easter Egg
console.log(
  "%cHappy Birthday My Love! ❤️",
  "font-size: 24px; color: #FF69B4; font-weight: bold;",
);
console.log(
  "%cThis website was made with love just for you 💕",
  "font-size: 16px; color: #FF7F9C;",
);
console.log(
  "%cSecret Code: 23062025 (Your special date)",
  "font-size: 12px; color: #FFB6C1;",
);

// ============================================
// ENHANCED FEATURES
// ============================================

// Preload images for better performance
function preloadImages() {
  const images = ["./images"];

  images.forEach((url) => {
    const img = new Image();
    img.src = url;
  });
}

preloadImages();

// ============================================
// MOBILE OPTIMIZATIONS
// ============================================

// Touch event handling
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener(
  "touchstart",
  (e) => {
    touchStartX = e.changedTouches[0].screenX;
    // store the original target to avoid swipes originating from controls
    touchStartTarget = e.target;
  },
  false,
);

document.addEventListener(
  "touchend",
  (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
    // reset start target after handling
    touchStartTarget = null;
  },
  false,
);

function handleSwipe() {
  const swipeThreshold = 50;
  const diff = touchStartX - touchEndX;

  // Ignore swipes that started from inputs or player controls
  try {
    if (
      touchStartTarget &&
      (touchStartTarget.tagName === "INPUT" ||
        touchStartTarget.tagName === "TEXTAREA" ||
        (touchStartTarget.closest &&
          (touchStartTarget.closest(".music-player") ||
            touchStartTarget.closest(".playlist") ||
            touchStartTarget.closest(".progress-bar") ||
            touchStartTarget.closest(".volume-control"))))
    ) {
      return;
    }
  } catch (err) {
    // ignore errors from DOM queries, proceed with swipe handling
  }

  if (Math.abs(diff) > swipeThreshold) {
    const navBtns = Array.from(document.querySelectorAll(".nav-btn"));
    const activeBtn = document.querySelector(".nav-btn.active");
    const currentIndex = navBtns.indexOf(activeBtn);

    let nextIndex;
    if (diff > 0) {
      // Swiped left
      nextIndex = (currentIndex + 1) % navBtns.length;
    } else {
      // Swiped right
      nextIndex = (currentIndex - 1 + navBtns.length) % navBtns.length;
    }

    if (navBtns[nextIndex]) navBtns[nextIndex].click();
  }
}
