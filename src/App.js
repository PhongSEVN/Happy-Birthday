import React, { useLayoutEffect, useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import './App.css';
import { GREETING, BIRTHDAY_USER } from './utils/constants';
import { triggerExplosion, floatBalloons, startFireworks } from './utils/confetti';
import MusicPlayer from './components/MusicPlayer';
import Gallery from './components/Gallery';

function App() {
  const comp = useRef(null);
  const sceneRef = useRef(null);
  const [isOpened, setIsOpened] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  const [displayText, setDisplayText] = useState(""); 

  // Parallax Effect
  useEffect(() => {
    if (isOpened) return; 
    
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const xPos = (clientX / window.innerWidth - 0.5) * 2; 
      const yPos = (clientY / window.innerHeight - 0.5) * 2;

      gsap.to(sceneRef.current, {
        rotationY: xPos * 15, 
        rotationX: -yPos * 15, 
        duration: 0.5,
        ease: "power2.out"
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isOpened]);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      if (!isOpened) {
        gsap.to(".scene", {
          y: -15,
          duration: 2,
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut"
        });
        
        gsap.to(".instruction-text", {
             scale: 1.1,
             duration: 0.8,
             yoyo: true,
             repeat: -1
        });
      }
    }, comp);
    return () => ctx.revert();
  }, [isOpened]);

  const scrambleText = (finalText, setFunction) => {
    const chars = "!<>-_\\/[]{}—=+*^?#________";
    let iterations = 0;
    
    const interval = setInterval(() => {
      setFunction(finalText
        .split("")
        .map((letter, index) => {
          if(index < iterations) {
            return finalText[index];
          }
          return chars[Math.floor(Math.random() * chars.length)];
        })
        .join("")
      );
      
      if(iterations >= finalText.length){ 
        clearInterval(interval);
      }
      
      iterations += 1/2; 
    }, 50);
  };

  const handleOpen = () => {
    if (isOpened) return;
    setIsOpened(true);

    gsap.context(() => {
        const tl = gsap.timeline();

        tl.to(".scene", {
            rotation: 0,
            rotationY: 0,
            rotationX: 0,
            duration: 0.5
        })
        .to(".envelope-flap", {
            rotationX: 180,
            duration: 0.6,
            ease: "power2.in"
        })
        .set(".envelope-flap", { zIndex: 1 })
        
        .to(".letter", {
            y: -150,
            duration: 0.8,
            ease: "back.out(1.5)"
        })
        
        .to(".scene", {
            scale: 1.2,
            duration: 0.2,
            ease: "power1.in"
        })
        .to(".flash-overlay", {
            opacity: 1,
            duration: 0.05,
            onComplete: () => {
                 triggerExplosion(comp); 
                 floatBalloons(comp);    
                 startFireworks(comp); 
            }
        })
        .to(".flash-overlay", { opacity: 0, duration: 2 })
        
        .to(".envelope-container", {
            opacity: 0,
            scale: 0,
            duration: 0.5
        }, "-=1.5")
        
        .to(".birthday-card", {
            scale: 1,
            opacity: 1,
            rotation: 0,
            duration: 0.8,
            ease: "elastic.out(1, 0.3)",
            onStart: () => {
                setTimeout(() => {
                    scrambleText(`${GREETING.TITLE_SUFFIX} ${BIRTHDAY_USER.NAME}`, setDisplayText);
                }, 200); 
            }
        }, "-=1.0")
        
        .to(".subtitle", {
            opacity: 1,
            y: 0,
            stagger: 0.2, 
            duration: 0.8,
            ease: "back.out(2)"
        });
        
    }, comp);
  };

  return (
    <div className="App" ref={comp}>
      <div className="flash-overlay"></div>
      
      {/* Music Player */}
      <MusicPlayer />

      {/* Gallery Overlay */}
      {showGallery && <Gallery onClose={() => setShowGallery(false)} />}
      
      <div className="scene" onClick={handleOpen} ref={sceneRef}>
        {!isOpened && (
             <div className="instruction-text" style={{ bottom: '-60px' }}>
                You have a letter! ✉️
            </div>
        )}

        <div className="envelope-container">
            <div className="letter">
                <div style={{textAlign: 'center'}}>
                    <div style={{fontSize: '3rem'}}>🎂</div>
                    For {BIRTHDAY_USER.NAME}
                </div>
            </div>
            
            <div className="envelope-body"></div>
            
            <div className="envelope-flap">
                <div className="wax-seal">P</div>
            </div>
        </div>
      </div>

      <div className={`birthday-card ${isOpened ? 'visible' : ''}`}>
        <h1 className="title">
            {GREETING.TITLE_PREFIX} <br />
            <span className="highlight">
                 {displayText || "_"} 
            </span>
        </h1>
        <p className="subtitle">{GREETING.SUBTITLE}</p>
        <p className="subtitle" style={{ fontSize: '2.5rem'}}>✨</p>
        
        {/* Gallery Button */}
        <button 
            className="gallery-btn"
            onClick={() => setShowGallery(true)}
            style={{ opacity: isOpened ? 1 : 0, transition: 'opacity 1s 2s' }}
        >
            View Memories 📸
        </button>
      </div>
    </div>
  );
}

export default App;
