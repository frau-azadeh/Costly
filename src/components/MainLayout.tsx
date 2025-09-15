"use client";

import React from "react";

import { useTheme } from "@/context/ThemeContext";

export const MainLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { theme } = useTheme();

  return (
    <div
      className={
        theme === "dark"
          ? "dark bg-gray-900 text-white"
          : "light bg-gray-100 text-black"
      }
    >
      {children}
    </div>
  );
};
