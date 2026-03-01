import { useState } from 'react';
import { SECRET_CODE } from '../utils/constants';
import { useFloatingHearts } from '../hooks/useFloatingHearts';
import '../styles/SecretCodeScreen.css';

export default function SecretCodeScreen({ onCodeEntered }) {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const heartsRef = useFloatingHearts();

  const handleSubmit = () => {
    if (code === SECRET_CODE) {
      setError('');
      onCodeEntered();
    } else {
      setError("❌ Oops, that's not our special date ❤️ Try again.");
      setCode('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="screen active secret-code-screen">
      <div id="hearts-container" ref={heartsRef}></div>
      
      <div className="secret-code-card">
        <div className="floating-hearts-small"></div>
        <h1 className="secret-title">✨ Enter the Secret Code ✨</h1>
        <p className="secret-subtitle">Only for someone special...</p>

        <div className="input-group">
          <input
            type="password"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            onKeyPress={handleKeyPress}
            className="code-input"
            placeholder="• • • • • •"
            maxLength="8"
            autoFocus
          />
          <button onClick={handleSubmit} className="btn-enter">
            Enter
          </button>
        </div>

        {error && <p className="error-message">{error}</p>}
        <p className="hint-text">💡 Hint: Our special date</p>
      </div>
    </div>
  );
}
