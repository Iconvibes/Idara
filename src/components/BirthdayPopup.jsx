import '../styles/BirthdayPopup.css';

export default function BirthdayPopup({ onClose }) {
  return (
    <div className="birthday-popup show">
      <div className="birthday-content">
        <h1>🎉 Happy Birthday Precious 🎉</h1>
        <p>💕 You are absolutely beautiful and I love you so much 💕</p>
        <button className="popup-close-btn" onClick={onClose}>
          Let's Continue
        </button>
      </div>
    </div>
  );
}
