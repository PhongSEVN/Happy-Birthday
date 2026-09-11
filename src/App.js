import { useLayoutEffect, useRef, useState, useEffect } from 'react';
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
  const [namePct, setNamePct] = useState(0);

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
      }
    }, comp);
    return () => ctx.revert();
  }, [isOpened]);

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
            ease: "elastic.out(1, 0.3)"
        }, "-=1.0")

        .to({}, {
            duration: 1.3,
            ease: "power1.inOut",
            onUpdate: function () {
                setNamePct(this.progress() * 100);
            }
        }, "-=0.1")

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
             <div className="instruction-text" style={{ top: '-70px' }}>
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
            
            <div className="envelope-body">
                <div className="mail-stamp" aria-hidden="true">✈️</div>
            </div>

            <div className="envelope-flap">
                <div className="wax-seal">P</div>
            </div>
        </div>
      </div>

      <div className={`birthday-card ${isOpened ? 'visible' : ''}`}>
        <div className="airmail-stamp" aria-hidden="true">🎉</div>
        <h1 className="title">
            {GREETING.TITLE_PREFIX} <br />
            {GREETING.TITLE_SUFFIX}
        </h1>
        <p className="name-reveal">
            <span className="name-box" style={{ clipPath: `inset(0 ${100 - namePct}% 0 0)` }}>
                <span className="highlight">{BIRTHDAY_USER.NAME}</span>
            </span>
            {namePct > 1 && namePct < 99 && (
                <span className="pen-tip" style={{ left: `${namePct}%` }} aria-hidden="true">✏️</span>
            )}
        </p>
        <p className="subtitle note">{GREETING.SUBTITLE}</p>
        <p className="subtitle sparkle">✨</p>

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
