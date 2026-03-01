import { useState, useEffect } from 'react';
import './App.css';
import SecretCodeScreen from './components/SecretCodeScreen';
import MainScreen from './components/MainScreen';

function App() {
  const [isCodeEntered, setIsCodeEntered] = useState(false);
  const [showBirthdayPopup, setShowBirthdayPopup] = useState(false);

  useEffect(() => {
    // Check if code was entered in session
    const codeEntered = sessionStorage.getItem('codeEntered');
    if (codeEntered === 'true') {
      setIsCodeEntered(true);
    }
  }, []);

  const handleCodeEntered = () => {
    setIsCodeEntered(true);
    setShowBirthdayPopup(true);
    sessionStorage.setItem('codeEntered', 'true');
  };

  return (
    <>
      {!isCodeEntered ? (
        <SecretCodeScreen onCodeEntered={handleCodeEntered} />
      ) : (
        <MainScreen showBirthdayPopup={showBirthdayPopup} setShowBirthdayPopup={setShowBirthdayPopup} />
      )}
    </>
  );
}

export default App;
