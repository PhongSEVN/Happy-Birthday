import gsap from 'gsap';
import { CONFETTI_COLORS, CONFIG } from './constants';

export const triggerExplosion = (containerRef) => {
  if (!containerRef.current) return;

  const count = CONFIG.CONFETTI_COUNT;
  const colors = CONFETTI_COLORS;

  for (let i = 0; i < count; i++) {
    const confetti = document.createElement('div');
    confetti.classList.add('confetti');
    containerRef.current.appendChild(confetti);

    const color = colors[Math.floor(Math.random() * colors.length)];
    
    const angle = Math.random() * Math.PI * 2;
    const velocity = 300 + Math.random() * 500;
    const x = Math.cos(angle) * velocity;
    const y = Math.sin(angle) * velocity;
    const z = (Math.random() - 0.5) * 800;

    gsap.set(confetti, {
      x: 0,
      y: 0,
      z: 0,
      backgroundColor: color,
      left: '50%',
      top: '50%',
      scale: Math.random() * 0.8 + 0.2,
      rotationX: Math.random() * 360,
      rotationY: Math.random() * 360
    });

    const tl = gsap.timeline();

    tl.to(confetti, {
      x: x * (Math.random() * 1.5 + 0.5), 
      y: y * (Math.random() * 1.5 + 0.5) - 200, 
      z: z,
      rotationX: "+=1440",
      rotationY: "+=1440",
      opacity: 1,
      duration: 1.5 + Math.random(),
      ease: "power4.out"
    })
    .to(confetti, {
      y: "+=800",
      opacity: 0,
      rotationX: "+=720",
      duration: 2 + Math.random(),
      ease: "power1.in"
    });

    tl.then(() => confetti.remove());
  }
};

export const floatBalloons = (containerRef) => {
    if (!containerRef.current) return;

    const balloonCount = CONFIG.BALLOON_COUNT;
    const colors = CONFETTI_COLORS;

    for (let i = 0; i < balloonCount; i++) {
        const balloon = document.createElement('div');
        balloon.classList.add('balloon');
        containerRef.current.appendChild(balloon);

        const color = colors[Math.floor(Math.random() * colors.length)];
        
        const startX = (Math.random() - 0.5) * window.innerWidth * 1.2;
        const startY = window.innerHeight / 2 + 300; 
        
        gsap.set(balloon, {
            backgroundColor: color,
            x: startX,
            y: startY, 
            z: (Math.random() - 0.5) * 600,
            left: '50%',
            top: '50%',
            scale: 0.5,
            cursor: 'pointer'
        });

        balloon.onclick = (e) => {
            e.stopPropagation();
            
            gsap.killTweensOf(balloon);
            
            const rect = balloon.getBoundingClientRect();
            createMiniExplosion(containerRef, rect.left + rect.width/2, rect.top + rect.height/2, color);
            
            balloon.remove();
        };

        gsap.to(balloon, {
            y: -window.innerHeight - 300, 
            x: `+=${(Math.random() - 0.5) * 200}`, 
            rotationZ: (Math.random() - 0.5) * 45, 
            scale: 1,
            duration: 8 + Math.random() * 5,
            ease: "sine.in",
            delay: Math.random() * 0.5,
            onComplete: () => balloon.remove()
        });
    }
}

const createMiniExplosion = (containerRef, x, y, color) => {
    const count = 20;
    for(let i=0; i<count; i++){
        const p = document.createElement('div');
        p.classList.add('confetti');
        p.style.backgroundColor = color;
        containerRef.current.appendChild(p);

        gsap.set(p, {
            position: 'fixed',
            left: x,
            top: y,
            width: 8,
            height: 8,
            borderRadius: '50%'
        });
        
        const angle = Math.random() * Math.PI * 2;
        const velocity = 50 + Math.random() * 100;

        gsap.to(p, {
            x: Math.cos(angle) * velocity,
            y: Math.sin(angle) * velocity,
            opacity: 0,
            duration: 0.5,
            onComplete: () => p.remove()
        });
    }
};

export const startFireworks = (containerRef) => {
    const createFirework = () => {
         if (!containerRef.current) return;
         
         const fireworksCount = 20; 
         const centerX = (Math.random() - 0.5) * window.innerWidth;
         const centerY = (Math.random() - 0.5) * window.innerHeight;
         const colors = CONFETTI_COLORS;
         const color = colors[Math.floor(Math.random() * colors.length)];

         for(let i=0; i<fireworksCount; i++) {
            const p = document.createElement('div');
            p.classList.add('confetti'); 
            p.style.backgroundColor = color;
            p.style.width = '6px';
            p.style.height = '6px';
            p.style.borderRadius = '50%';
            containerRef.current.appendChild(p);

            const angle = Math.random() * Math.PI * 2;
            const velocity = 50 + Math.random() * 100;
            
            gsap.set(p, {
                x: centerX,
                y: centerY,
                z: -200 + Math.random() * 400, 
                left: '50%',
                top: '50%'
            });

            gsap.to(p, {
                x: centerX + Math.cos(angle) * velocity,
                y: centerY + Math.sin(angle) * velocity,
                opacity: 0,
                duration: 0.8 + Math.random() * 0.5,
                ease: "expo.out",
                onComplete: () => p.remove()
            });
         }

         gsap.delayedCall(0.3 + Math.random() * 0.5, createFirework); 
    };
    
    createFirework();
    gsap.delayedCall(1, createFirework);
    gsap.delayedCall(2, createFirework);
};
