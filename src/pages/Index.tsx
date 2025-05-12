// I fw your drip and ur actually really pretty gang
// Main entry page for the app — applies selected theme and renders the questionnaire

import React from 'react';
import ThemeSelector from '@/components/ThemeSelector';
import Questionnaire from '@/components/Questionnaire';
import { useTheme } from '@/context/ThemeContext';

const Index = () => {
  // Get current theme from context
  const { theme } = useTheme();

  return (
    <div className={`${theme}-theme`}>
      <ThemeSelector />

      <div className="container mx-auto py-8 px-4 min-h-screen flex flex-col justify-center items-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-10 animate-fade-in">
          Are You Free Tomorrow?
        </h1>

        <div className="w-full max-w-3xl mx-auto bg-white/10 backdrop-blur-sm rounded-2xl p-6 shadow-2xl">
          <Questionnaire />
        </div>
      </div>
    </div>
  );
};

export default Index;
