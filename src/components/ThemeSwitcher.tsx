import React from 'react'
import { useTheme } from '@/context/ThemeContext'
import { FiMoon, FiSun } from 'react-icons/fi';

export const ThemeSwitcher: React.FC = () => {
    const {theme, toggleTheme} = useTheme();
    
    if(!theme) return null;

  return (
    <div>
        <button>
            {theme === "dark"? (
                <FiSun className=" text-yellow-400 w-6 h-6" />
            ):(
                <FiMoon className=" text-gray-800 w-6 h-6" />
            )}
        </button>
    </div>
  )
}
