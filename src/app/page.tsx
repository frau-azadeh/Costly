"use client";

import React from "react";
import {MainLayout} from "@/components/MainLayout"
import {ThemeSwitcher} from "@/components/ThemeSwitcher";
import { ExpenseForm } from "@/components/ExpenseForm";
import { ExpenseList } from "@/components/ExpenseList";

const HomePage: React.FC = () => {
  return (
    <MainLayout>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <ThemeSwitcher/>
        <ExpenseForm/>
        <ExpenseList/>
      </div>
    </MainLayout>
  );
};

export default HomePage;
