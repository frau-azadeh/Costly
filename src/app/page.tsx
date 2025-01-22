"use client";

import React from "react";
import {MainLayout} from "@/components/MainLayout"
import {ThemeSwitcher} from "@/components/ThemeSwitcher";

const HomePage: React.FC = () => {
  return (
    <MainLayout>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <ThemeSwitcher/>
      </div>
    </MainLayout>
  );
};

export default HomePage;
