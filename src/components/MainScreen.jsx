import { useState, useEffect } from 'react';
import Navigation from './Navigation';
import LoveLetter from './sections/LoveLetter';
import MusicPlayer from './sections/MusicPlayer';
import Gallery from './sections/Gallery';
import BirthdayPopup from './BirthdayPopup';
import Confetti from './Confetti';
import { useFloatingHearts } from '../hooks/useFloatingHearts';
import '../styles/MainScreen.css';

export default function MainScreen({ showBirthdayPopup, setShowBirthdayPopup }) {
  const [activeSection, setActiveSection] = useState('love-letter');
  const heartsRef = useFloatingHearts();

  useEffect(() => {
    if (showBirthdayPopup) {
      // Birthday popup will be shown
    }
  }, [showBirthdayPopup]);

  return (
    <div id="main-screen" className="screen active">
      <div className="bg-gradient"></div>
      <div id="hearts-container" ref={heartsRef}></div>

      <Navigation activeSection={activeSection} onSectionChange={setActiveSection} />

      <div className="content-wrapper">
        {activeSection === 'love-letter' && <LoveLetter />}
        {activeSection === 'music' && <MusicPlayer />}
        {activeSection === 'gallery' && <Gallery />}
      </div>

      {showBirthdayPopup && (
        <BirthdayPopup onClose={() => setShowBirthdayPopup(false)} />
      )}

      <Confetti />
    </div>
  );
}
