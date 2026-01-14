import { useState, useEffect } from 'react';

export default function App() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHoveringButton, setIsHoveringButton] = useState(false);
  const [isHoveringHamburger, setIsHoveringHamburger] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isHamburgerClicked, setIsHamburgerClicked] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseDown = () => {
      setIsMouseDown(true);
    };

    const handleMouseUp = () => {
      setIsMouseDown(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Sigmar&family=Oooh+Baby&display=swap" rel="stylesheet" />
      <style>{`
        * {
          cursor: none;
          user-select: none;
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
        }
        .custom-button {
          transition: all 0.3s ease;
        }
        .custom-button:hover {
          background-color: #3a3a3a !important;
          color: #d4d4d4 !important;
          border: 2px solid #d4d4d4 !important;
        }
        .custom-button.clicked {
          background-color: #4a4a4a !important;
        }
        .cursor-dot {
          position: fixed;
          width: 8px;
          height: 8px;
          background-color: #d4d4d4;
          border-radius: 50%;
          pointer-events: none;
          z-index: 9999;
          transform: translate(-50%, -50%);
          transition: background-color 0.3s ease;
        }
        .cursor-dot.golden {
          background-color: #a0a0a0;
        }
        .cursor-circle {
          position: fixed;
          width: 40px;
          height: 40px;
          border: 2px solid #d4d4d4;
          border-radius: 50%;
          pointer-events: none;
          z-index: 9998;
          transform: translate(-50%, -50%);
          transition: all 0.15s ease-out;
        }
        .cursor-circle.golden {
          border-color: #a0a0a0;
        }
        .cursor-glow {
          position: fixed;
          width: 200px;
          height: 200px;
          background: radial-gradient(circle, rgba(212, 212, 212, 0.15) 0%, rgba(212, 212, 212, 0) 70%);
          border-radius: 50%;
          pointer-events: none;
          z-index: 9997;
          transform: translate(-50%, -50%);
          transition: all 0.2s ease-out;
          mix-blend-mode: screen;
        }
        .cursor-glow.golden {
          background: radial-gradient(circle, rgba(160, 160, 160, 0.15) 0%, rgba(160, 160, 160, 0) 70%);
        }
        .hamburger-menu {
          position: fixed;
          top: 30px;
          left: 30px;
          width: 60px;
          height: 60px;
          background-color: #2a2a2a;
          border-radius: 50%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 6px;
          transition: all 0.3s ease;
          z-index: 1000;
          padding: 0;
          border: 2px solid transparent;
        }
        .hamburger-menu:hover {
          background-color: #3a3a3a;
          border: 2px solid #d4d4d4;
        }
        .hamburger-menu.clicked {
          background-color: #4a4a4a;
        }
        .hamburger-line {
          width: 24px;
          height: 2px;
          background-color: #7d7d7d;
          transition: all 0.3s ease;
          display: block;
        }
        .hamburger-menu:hover .hamburger-line {
          background-color: #d4d4d4;
        }
        .content-blur {
          transition: filter 0.3s ease;
        }
        .content-blur.blurred {
          filter: blur(3px);
        }
      `}</style>
      
      <div className={`cursor-glow ${isHoveringButton || isHoveringHamburger || isMouseDown ? 'golden' : ''}`} style={{ left: mousePos.x, top: mousePos.y }} />
      <div className={`cursor-dot ${isHoveringButton || isHoveringHamburger || isMouseDown ? 'golden' : ''}`} style={{ left: mousePos.x, top: mousePos.y }} />
      <div className={`cursor-circle ${isHoveringButton || isHoveringHamburger || isMouseDown ? 'golden' : ''}`} style={{ left: mousePos.x, top: mousePos.y }} />
      
      <div className={`content-blur ${isHoveringButton ? 'blurred' : ''}`}>
        <button 
          className={`hamburger-menu ${isHamburgerClicked ? 'clicked' : ''}`}
          onMouseEnter={() => setIsHoveringHamburger(true)}
          onMouseLeave={() => setIsHoveringHamburger(false)}
          onMouseDown={() => setIsHamburgerClicked(true)}
          onMouseUp={() => setIsHamburgerClicked(false)}
        >
          <div className="hamburger-line"></div>
          <div className="hamburger-line"></div>
          <div className="hamburger-line"></div>
        </button>
      </div>
      
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#222323' }}>
        <div className="text-center">
          <div className={`content-blur ${isHoveringButton || isHoveringHamburger ? 'blurred' : ''}`}>
            <h1 className="text-7xl font-bold tracking-wide" style={{ fontFamily: 'Sigmar, cursive', color: '#d4d4d4' }}>
              Anurag Sur
            </h1>
            <h2 className="text-5xl mt-1" style={{ fontFamily: 'Oooh Baby, cursive', color: '#d4d4d4' }}>
              Product Designer.
            </h2>
          </div>
          <div className={`content-blur ${isHoveringHamburger ? 'blurred' : ''}`}>
            <button 
              className={`mt-6 custom-button ${isClicked ? 'clicked' : ''}`}
            style={{ 
              backgroundColor: '#2a2a2a',
              borderRadius: '50px',
              color: '#7d7d7d',
              fontFamily: 'Helvetica, Arial, sans-serif',
              border: '2px solid transparent',
              paddingLeft: '30px',
              paddingRight: '30px',
              paddingTop: '12px',
              paddingBottom: '12px',
              textAlign: 'left'
            }}
              onMouseEnter={() => setIsHoveringButton(true)}
              onMouseLeave={() => setIsHoveringButton(false)}
              onMouseDown={() => setIsClicked(true)}
              onMouseUp={() => setIsClicked(false)}
            >
              Know more about me
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
