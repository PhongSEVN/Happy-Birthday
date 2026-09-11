import { useRef, useEffect } from 'react';
import './Gallery.css';

// Auto-discovers every image dropped into src/assets/photos — no fixed
// filenames or count to maintain, add/remove files and the gallery follows.
const photoContext = require.context('../assets/photos', false, /\.(png|jpe?g|webp|gif)$/i);
const IMAGES = photoContext.keys().map((key) => photoContext(key));

const Gallery = ({ onClose }) => {
  const containerRef = useRef(null);
  
  // Auto-scroll logic
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const interval = setInterval(() => {
        const height = container.clientHeight;
        const currentScroll = container.scrollTop;
        const nextScroll = currentScroll + height;
        
        // Loop back to start or stop at end? 
        // Let's stop at the very end (scrollHeight).
        if (nextScroll < container.scrollHeight) {
             container.scrollTo({
                 top: nextScroll,
                 behavior: 'smooth'
             });
        } else {
            // Optional: Loop back to top? Or just stop.
            // User said "slide tick tok", usually endless or stops. 
            // Let's stop at end card. 
            clearInterval(interval);
        }
    }, 3000); // 3 seconds

    // Cleanup on unmount (or if user interaction logic added later)
    return () => clearInterval(interval);
  }, []);

  return (
      <div className="gallery-overlay mobile-mode">
          <button className="close-btn" onClick={onClose} style={{position: 'fixed', right: '30px', top: '30px', zIndex: 9999}}>✕</button>
          
          <div className="mobile-scroll-container" ref={containerRef}>
              <div className="mobile-card-wrapper">
                  <div className="intro-text">
                        <h2>Moments 360° 💫</h2>
                        <p>Scroll down to explore</p>
                        <div className="scroll-indicator">⬇</div>
                  </div>
              </div>

              {IMAGES.map((src, i) => (
                  <div className="mobile-card-wrapper" key={i}>
                      <img src={src} alt={`Moment ${i}`} className="mobile-img" loading="lazy" />
                      <div className="mobile-overlay-text">
                          <h3>Memory #{i+1}</h3>
                          <p>✨ A beautiful moment ✨</p>
                      </div>
                  </div>
              ))}
              
              <div className="mobile-card-wrapper end-card">
                    <h2>That's all for now! 👋</h2>
                    <button onClick={onClose} className="gallery-btn">Back to Party</button>
              </div>
          </div>
      </div>
  );
};

export default Gallery;
