import React, { useEffect, useState } from 'react';

interface GojoImageProps {
  questionState: string;
}

const GojoImage: React.FC<GojoImageProps> = ({ questionState }) => {
  const [sparkles, setSparkles] = useState<Array<{ id: number; left: string; top: string; size: string; delay: string }>>([]);
  const [showExplosion, setShowExplosion] = useState(false);

  useEffect(() => {
    const newSparkles = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: `${Math.random() * 4 + 2}px`,
      delay: `${Math.random() * 4 + 1}s`,
    }));
    
    setSparkles(newSparkles);

    if (questionState === 'chooseYesNoLame') {
      setShowExplosion(true);
      setTimeout(() => {
        setShowExplosion(false);
      }, 1000);
    }
  }, [questionState]);


  const getImageForState = () => {
    if (['chooseYesYes', 'chooseYesNoKidding', 'chooseNoImportantNoLied'].includes(questionState)) {
      return "/images/gojo-finger-guns.webp";
    }
    else if (questionState === 'chooseNoImportant') {
      return "/images/omniman.png";
    }
    else {
      return "/images/gojo-satoru.jpg";
    }
  };


  const getContainerClass = () => {
    let baseClass = "gojo-container w-48 h-48 md:w-64 md:h-64 mx-auto mb-10 transition-all duration-500";
    
    if (questionState === 'blackout') {
      return `${baseClass} domain-expansion`;
    } else if (['chooseYesYes', 'chooseYesNoKidding', 'chooseNoImportantNoLied'].includes(questionState)) {
      return `${baseClass} happy-animation`;
    } else if (['chooseNoImportantYes', 'chooseNoVL', 'chooseYesNo'].includes(questionState)) {
      return `${baseClass} annoyed-animation`;
    }
    
    return baseClass;
  };

  const getAltText = () => {
    if (questionState === 'chooseNoImportant') {
      return "Omni-Man Meme";
    } else if (['chooseYesYes', 'chooseYesNoKidding', 'chooseNoImportantNoLied'].includes(questionState)) {
      return "Gojo Satoru with Finger Guns";
    } else {
      return "Gojo Satoru";
    }
  };

  console.log("Current state:", questionState);

  return (
    <div className={getContainerClass()}>
      {sparkles.map((sparkle) => (
        <div
          key={sparkle.id}
          className="sparkle"
          style={{
            left: sparkle.left,
            top: sparkle.top,
            width: sparkle.size,
            height: sparkle.size,
            animationDelay: sparkle.delay,
            opacity: '0.6',
          }}
        />
      ))}

      <img
        src={getImageForState()}
        alt={getAltText()}
        className="gojo-image rounded-xl shadow-xl transition-all duration-300"
        onError={(e) => {
          console.error("Image failed to load:", (e.target as HTMLImageElement).src);
          const target = e.target as HTMLElement;
          target.style.backgroundColor = "#3b82f6";
          target.style.border = "2px solid white";
        }}
      />

      {showExplosion && (
        <div className="explosion-overlay">
          <img 
            src="/images/explosion.jpg" 
            alt="Explosion" 
            className="absolute top-0 left-0 w-full h-full object-cover rounded-xl z-20"
          />
        </div>
      )}
    </div>
  );
};

export default GojoImage;