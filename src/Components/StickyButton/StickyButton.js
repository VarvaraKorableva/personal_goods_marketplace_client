import React, { useState, useEffect } from 'react';
import './StickyButton.css';
import {LanguageContext} from '../../contexts/TranslationContext'
import choose from '../../const/CategoryData'

const StickyButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const { language, changeLanguage } = React.useContext(LanguageContext)

  const { en, rus, hebrew } = choose;

  let translatedContext = '';
  if (language === 'en') {
    translatedContext = en;
  } else if (language === 'rus') {
    translatedContext = rus;
  } else if (language === 'hebrew') {
    translatedContext = hebrew;
  }

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
      <span className='font'>{translatedContext.upBtn}</span>
      <div className='arrowUp'></div>
    </button>
  );
};

export default StickyButton;
