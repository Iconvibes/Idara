import { useRef } from 'react';
import '../styles/GalleryItem.css';

export default function GalleryItem({ item, onClick }) {
  const videoRef = useRef(null);

  const handleMouseEnter = () => {
    if (item.type === 'video' && videoRef.current) {
      videoRef.current.play().catch(err => console.log('Play error:', err));
    }
  };

  const handleMouseLeave = () => {
    if (item.type === 'video' && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <div 
      className="gallery-item" 
      onClick={item.type === 'image' ? onClick : undefined}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {item.type === 'image' ? (
        <img src={item.src} alt={item.caption} />
      ) : (
        <video ref={videoRef} src={item.src} muted autoPlay loop />
      )}
      <div className="gallery-overlay">
        <p>{item.caption}</p>
      </div>
    </div>
  );
}
