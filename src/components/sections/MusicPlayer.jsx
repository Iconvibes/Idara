import { PLAYLIST } from '../../utils/constants';
import { useAudioPlayer } from '../../hooks/useAudioPlayer';
import { formatTime } from '../../utils/helpers';
import '../../styles/MusicPlayer.css';

export default function MusicPlayer() {
  const {
    currentSong,
    isPlaying,
    currentTime,
    duration,
    volume,
    togglePlay,
    nextSong,
    previousSong,
    seek,
    setVolumeLevel,
    playSong,
  } = useAudioPlayer(PLAYLIST, 1); // Auto-play track 1 (Running To You)

  const handleSongSelect = (index) => {
    playSong(index);
  };

  const handleNextSong = () => {
    nextSong();
  };

  const handlePreviousSong = () => {
    previousSong();
  };

  const currentTrack = PLAYLIST[currentSong];

  return (
    <section className="section active music-section">
      <div className="music-card">
        <h2 className="section-title">🎵 Our Love Song</h2>

        <div className="music-player">
          <div className="album-art">
            <div className="album-placeholder">
              <i className="fas fa-music"></i>
            </div>
          </div>

          <div className="song-info">
            <h3>{currentTrack?.name || 'Loading...'}</h3>
            <p>{currentTrack?.artist || 'Loading...'}</p>
          </div>

          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{
                width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%`,
              }}
            ></div>
            <input
              type="range"
              className="progress-slider"
              min="0"
              max={duration || 100}
              value={currentTime}
              onChange={(e) => seek(parseFloat(e.target.value))}
            />
          </div>

          <div className="time-display">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>

          <div className="controls">
            <button className="control-btn" onClick={handlePreviousSong}>
              <i className="fas fa-step-backward"></i>
            </button>
            <button className="control-btn play-btn" onClick={togglePlay}>
              <i className={`fas fa-${isPlaying ? 'pause' : 'play'}`}></i>
            </button>
            <button className="control-btn" onClick={handleNextSong}>
              <i className="fas fa-step-forward"></i>
            </button>
          </div>

          <div className="volume-control">
            <i className="fas fa-volume-low"></i>
            <input
              type="range"
              className="volume-slider"
              min="0"
              max="100"
              value={volume * 100}
              onChange={(e) => setVolumeLevel(parseFloat(e.target.value) / 100)}
            />
            <i className="fas fa-volume-high"></i>
          </div>
        </div>



        <div className="playlist">
          <h3>Romantic Playlist</h3>
          <div className="playlist-items">
            {PLAYLIST.map((song, index) => (
              <div
                key={song.id}
                className={`playlist-item ${currentSong === index ? 'active' : ''}`}
                onClick={() => handleSongSelect(index)}
              >
                <span className="song-number">{index + 1}</span>
                <span className="song-title">{song.name}</span>
                <span className="song-duration">{formatTime(song.duration)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
