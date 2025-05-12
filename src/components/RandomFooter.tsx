
import React, { useState, useEffect } from 'react';

const footerTexts = [
  "Yes, I actually spent time building this.",
  "I would say your fbi agent is watching you but you aint cool enough to have one.",
  "Im so awesome....",
  "Vrasim shtrriga.",
  "Click around 5 times for a surprise...(Dont i removed it cuz i fucked it up 😭)",
];

const RandomFooter = () => {
  const [footerText, setFooterText] = useState("");

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * footerTexts.length);
    setFooterText(footerTexts[randomIndex]);
    
    const interval = setInterval(() => {
      const newIndex = Math.floor(Math.random() * footerTexts.length);
      setFooterText(footerTexts[newIndex]);
    }, 10000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-center text-sm opacity-70 mt-6">
      {footerText}
    </div>
  );
};

export default RandomFooter;
