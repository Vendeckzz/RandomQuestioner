import React from 'react';

interface QuestionProps {
  question: string;
  children?: React.ReactNode;
}

const Question: React.FC<QuestionProps> = ({ question, children }) => {
  return (
    <div className="animate-fade-in py-4">
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-8 animate-slide-in">{question}</h2>
      <div className="flex flex-col gap-4">
        {children}
      </div>
    </div>
  );
};

export default Question;
