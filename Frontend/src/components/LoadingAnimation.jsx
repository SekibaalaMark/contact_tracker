import React, { useEffect, useState } from 'react';
import './LoadingAnimation.css';

const LoadingAnimation = () => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
    }, 3000); // Animation will last for 3 seconds

    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <div className="loading-overlay">
      <div className="aits-animation">
        <span className="letter pulse">P</span>
        <span className="letter pulse">A</span>
        <span className="letter pulse">R</span>
        <span className="letter pulse">L</span>
        <span className="letter pulse">I</span>
        <span className="letter pulse">A</span>
        <span className="letter pulse">M</span>
        <span className="letter pulse">E</span>
        <span className="letter pulse">N</span>
        <span className="letter pulse">T</span>
        <span className="letter pulse">-</span>
        <span className="letter pulse">S</span>
        <span className="letter pulse">A</span>
        <span className="letter pulse">V</span>
        <span className="letter pulse">I</span>
        <span className="letter pulse">N</span>
        <span className="letter pulse">G</span>
        <span className="letter pulse">S</span>
        <span className="letter pulse">-</span>
        <span className="letter pulse">G</span>
        <span className="letter pulse">R</span>
        <span className="letter pulse">O</span>
        <span className="letter pulse">U</span>
        <span className="letter pulse">P</span>
      </div>
      <div className="subtitle">
        PARLIAMENT SAVINGS GROUP
      </div>
    </div>
  );
};

export default LoadingAnimation; 