import React from "react";
import { useTheme } from "@/context/ThemeContext";
import { FiMoon, FiSun } from "react-icons/fi";

export const ThemeSwitcher: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  if (!theme) return null;

  return (
    <div>
      <button
        onClick={toggleTheme}
        className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 hover:bg-gray-300  dark:hover:bg-gray-700 fixed top-4 right-4 shadow-lg transition duration-300"
        aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      >
        {theme === "dark" ? (
          <FiSun className=" text-yellow-400 w-6 h-6" />
        ) : (
          <FiMoon className=" text-gray-800 w-6 h-6" />
        )}
      </button>
    </div>
  );
};
