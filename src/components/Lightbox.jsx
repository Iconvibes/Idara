import { useEffect } from 'react';
import '../styles/Lightbox.css';

export default function Lightbox({
  items,
  selectedIndex,
  onClose,
  onNext,
  onPrev,
}) {
  useEffect(() => {
    const handleKeydown = (e) => {
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeydown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeydown);
      document.body.style.overflow = 'auto';
    };
  }, [onNext, onPrev, onClose]);

  const currentItem = items[selectedIndex];

  return (
    <div className="lightbox-modal show" onClick={onClose}>
      <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
        <button className="lightbox-close" onClick={onClose}>
          ×
        </button>
        <button className="lightbox-prev" onClick={onPrev}>
          ❮
        </button>

        {currentItem.type === 'image' ? (
          <img
            src={currentItem.src}
            alt={currentItem.caption}
            className="lightbox-image"
          />
        ) : (
          <video
            src={currentItem.src}
            className="lightbox-image"
            controls
            autoPlay
          />
        )}

        <button className="lightbox-next" onClick={onNext}>
          ❯
        </button>
        <div className="lightbox-caption">{currentItem.caption}</div>
      </div>
    </div>
  );
}
