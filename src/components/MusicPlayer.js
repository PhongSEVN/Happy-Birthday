import React, { useState, useRef, useEffect } from 'react';
import './MusicPlayer.css';

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const togglePlay = () => {
    if(!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(e => console.log("Audio play failed (interaction needed)", e));
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="music-player-container">
      <audio 
        ref={audioRef} 
        src={process.env.PUBLIC_URL + '/happy_birthday.mp3'} 
        loop
      />
      
      <button className={`music-btn ${isPlaying ? 'playing' : ''}`} onClick={togglePlay}>
        {isPlaying ? '⏸' : '🎵'}
      </button>

      {isPlaying && (
        <div className="visualizer">
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
      )}
    </div>
  );
};

export default MusicPlayer;
