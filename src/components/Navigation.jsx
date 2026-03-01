import '../styles/Navigation.css';

export default function Navigation({ activeSection, onSectionChange }) {
  const sections = [
    { id: 'love-letter', icon: '❤️', label: 'Love Letter' },
    { id: 'music', icon: '🎵', label: 'Music' },
    { id: 'gallery', icon: '🌷', label: 'Gallery' },
  ];

  return (
    <nav className="top-nav">
      {sections.map((section) => (
        <button
          key={section.id}
          className={`nav-btn ${activeSection === section.id ? 'active' : ''}`}
          onClick={() => onSectionChange(section.id)}
        >
          <span className="nav-icon">{section.icon}</span>
          <span className="nav-text">{section.label}</span>
        </button>
      ))}
    </nav>
  );
}
