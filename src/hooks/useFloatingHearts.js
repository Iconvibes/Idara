import { useEffect, useRef } from 'react';
import { getRandomEmojis } from '../utils/helpers';

export const useFloatingHearts = () => {
  const containerRef = useRef(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const createHeart = () => {
      if (!containerRef.current) return;

      const heart = document.createElement('div');
      heart.className = 'heart';
      heart.textContent = getRandomEmojis();

      const startX = Math.random() * window.innerWidth;
      const startY = window.innerHeight;
      const duration = 6 + Math.random() * 6;
      const delay = Math.random() * 0.5;

      heart.style.left = startX + 'px';
      heart.style.top = startY + 'px';
      heart.style.animationDuration = duration + 's';
      heart.style.animationDelay = delay + 's';
      heart.style.fontSize = (1.5 + Math.random() * 1.5) + 'rem';

      containerRef.current.appendChild(heart);
      setTimeout(() => heart.remove(), (duration + delay) * 1000);
    };

    if (intervalRef.current) clearInterval(intervalRef.current);
    
    // Create one heart per 500ms
    intervalRef.current = setInterval(createHeart, 500);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return containerRef;
};
