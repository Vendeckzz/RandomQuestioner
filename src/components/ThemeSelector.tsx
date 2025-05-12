
import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { Button } from '@/components/ui/button';

const ThemeSelector = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="absolute top-4 left-4 z-10 flex gap-2">
      <Button 
        variant={theme === 'red' ? 'default' : 'outline'}
        className="h-8 w-8 rounded-full bg-theme-red-background p-0"
        onClick={() => setTheme('red')}
      />
      <Button 
        variant={theme === 'blue' ? 'default' : 'outline'}
        className="h-8 w-8 rounded-full bg-theme-blue-background p-0"
        onClick={() => setTheme('blue')}
      />
      <Button 
        variant={theme === 'purple' ? 'default' : 'outline'}
        className="h-8 w-8 rounded-full bg-theme-purple-background p-0"
        onClick={() => setTheme('purple')}
      />
    </div>
  );
};

export default ThemeSelector;
