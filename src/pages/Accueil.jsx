import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Accueil() {
  const [hasStarted, setHasStarted] = useState(false);
  const videoRef = useRef(null);
  const navigate = useNavigate();

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 1;
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current && videoRef.current.currentTime >= 9) {
      videoRef.current.pause();
      navigate('/mur');
    }
  };

  const handleStart = () => {
    setHasStarted(true);
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  return (
    <div className="accueil-container">
      <video 
        ref={videoRef}
        className="video-bg"
        onLoadedMetadata={handleLoadedMetadata}
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => navigate('/mur')}
        playsInline
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 1
        }}
      >
        <source 
          src={`${import.meta.env.BASE_URL}videos/Animation10s0001-0240.mp4`} 
          type="video/mp4" 
        />
      </video>

      {!hasStarted && (
        <button 
          className="center-button" 
          onClick={handleStart}
        >
          Accéder au mur
        </button>
      )}
    </div>
  );
}