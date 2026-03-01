import { useState } from 'react';
import { GALLERY_ITEMS } from '../../utils/constants';
import GalleryItem from '../GalleryItem';
import Lightbox from '../Lightbox';
import '../../styles/Gallery.css';

export default function Gallery() {
  const [visibleCount, setVisibleCount] = useState(6);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const visibleItems = GALLERY_ITEMS.slice(0, visibleCount);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 6);
  };

  const handleGalleryItemClick = (index) => {
    // Find the index in visible items
    const visibleIndex = visibleItems.findIndex((item) => item.id === GALLERY_ITEMS[index].id);
    setSelectedIndex(visibleIndex);
  };

  return (
    <section className="section active gallery-section">
      <div className="gallery-container">
        <h2 className="section-title">🌷 Our Memories</h2>

        <div className="gallery-grid">
          {visibleItems.map((item, index) => (
            <GalleryItem
              key={item.id}
              item={item}
              onClick={() => handleGalleryItemClick(index)}
            />
          ))}
        </div>

        {visibleCount < GALLERY_ITEMS.length && (
          <div className="load-more-container">
            <button className="load-more-btn" onClick={handleLoadMore}>
              Load More Photos 📸
            </button>
          </div>
        )}
      </div>

      {selectedIndex !== null && (
        <Lightbox
          items={visibleItems}
          selectedIndex={selectedIndex}
          onClose={() => setSelectedIndex(null)}
          onNext={() =>
            setSelectedIndex((prev) => (prev + 1) % visibleItems.length)
          }
          onPrev={() =>
            setSelectedIndex(
              (prev) => (prev - 1 + visibleItems.length) % visibleItems.length
            )
          }
        />
      )}
    </section>
  );
}
