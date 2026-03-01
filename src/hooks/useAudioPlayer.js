import { useRef, useState, useEffect } from 'react';

export const useAudioPlayer = (playlist, autoPlayIndex = null) => {
  const audioRef = useRef(new Audio());
  const [currentSong, setCurrentSong] = useState(autoPlayIndex ?? 0);
  const [isPlaying, setIsPlaying] = useState(!!autoPlayIndex);
  const [isMuted, setIsMuted] = useState(false); // Music plays normally
  const autoplayInitialized = useRef(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);

  // Update audio element when song changes
  useEffect(() => {
    if (playlist && playlist.length > 0) {
      const audio = audioRef.current;
      audio.src = playlist[currentSong].url;
      audio.volume = isMuted ? 0 : volume;
      audio.crossOrigin = 'anonymous';

      // Auto-play if already playing (to continue playback when switching songs)
      if (isPlaying) {
        audio.play().catch(err => console.log('Play error:', err));
      }
    }
  }, [currentSong, volume, isPlaying, isMuted]);

  // Setup audio event listeners
  useEffect(() => {
    const audio = audioRef.current;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    const handleEnded = () => {
      setCurrentSong((prev) => (prev + 1) % playlist.length);
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [playlist.length]);

  // Handle play/pause
  useEffect(() => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.play().catch(err => console.log('Play error:', err));
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const play = () => {
    setIsPlaying(true);
  };

  const pause = () => {
    setIsPlaying(false);
  };

  const nextSong = () => {
    setCurrentSong((prev) => (prev + 1) % playlist.length);
  };

  const previousSong = () => {
    setCurrentSong((prev) => (prev - 1 + playlist.length) % playlist.length);
  };

  const seek = (time) => {
    audioRef.current.currentTime = time;
    setCurrentTime(time);
  };

  const setVolumeLevel = (vol) => {
    audioRef.current.volume = vol;
    setVolume(vol);
  };

  const playSong = (index) => {
    setCurrentSong(index);
    setIsPlaying(true);
  };

  return {
    audioRef,
    currentSong,
    isPlaying,
    currentTime,
    duration,
    volume,
    isMuted,
    togglePlay,
    play,
    pause,
    nextSong,
    previousSong,
    seek,
    setVolumeLevel,
    playSong,
    setCurrentSong,
  };
};
