import React, { useState, useEffect } from 'react';
import './StickyButton.css';

const StickyButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };


  return (
    <button onClick={scrollToTop} className={`sticky-button ${isVisible ? 'visible' : ''}`}>
      <span className='font'>Наверх</span>
      <div className='arrowUp'></div>
    </button>
  );
};

export default StickyButton;
