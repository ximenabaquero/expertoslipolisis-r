import React from 'react';

const ThemeToggle = ({ theme, toggleTheme }) => {
  return (
    <button
      onClick={toggleTheme}
      className="relative w-14 h-7 bg-gray-200 dark:bg-gray-700 rounded-full p-1 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      <div className="relative w-full h-full">
        {/* Sun icon - fixed position */}
        <div className="absolute left-1 top-1/2 -translate-y-1/2">
          <i className="fas fa-sun text-yellow-500 text-xs"></i>
        </div>
        
        {/* Moon icon - fixed position */}
        <div className="absolute right-1 top-1/2 -translate-y-1/2">
          <i className="fas fa-moon text-gray-300 text-xs"></i>
        </div>
        
        {/* Moving thumb */}
        <div className={`absolute top-1/2 w-5 h-5 bg-white rounded-full shadow-md -translate-y-1/2 transition-all duration-300 ease-in-out ${
          theme === 'light' ? 'left-1' : 'left-7'
        }`}>
          <div className="absolute inset-0 flex items-center justify-center">
            {theme === 'light' ? (
              <i className="fas fa-sun text-yellow-500 text-xs"></i>
            ) : (
              <i className="fas fa-moon text-gray-800 text-xs"></i>
            )}
          </div>
        </div>
      </div>
    </button>
  );
};

export default ThemeToggle;