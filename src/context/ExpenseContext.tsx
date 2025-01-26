"use client";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

type Expense = {
  id: number;
  title: string;
  amount: number;
  date: string;
};

type ExpenseContextType = {
  expenses: Expense[];
  addExpense: (expense: Omit<Expense, "id">) => void;
  removeExpense: (id: number) => void;
  updateExpense: (id: number, updatedExpense: Partial<Expense>) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
};

const ExpenseContext = createContext<ExpenseContextType | undefined>(undefined);
export const ExpenseProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [search, setSearchQuery] = useState<string>("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedExpenses = localStorage.getItem("expenses");
      if (storedExpenses) {
        try {
          setExpenses(JSON.parse(storedExpenses));
        } catch (error) {
          console.error("Error parsing localStorage data", error);
          setExpenses([]);
        }
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined" && expenses.length > 0) {
      localStorage.setItem("expenses", JSON.stringify(expenses));
    }
  }, [expenses]);

  const addExpense = (expense: Omit<Expense, "id">) => {
    const newExpense = { ...expense, id: Date.now() };
    setExpenses((prev) => [...prev, newExpense]);
  };

  const removeExpense = (id: number) => {
    setExpenses((prev) => {
      const updatedExpenses = prev.filter((expense) => expense.id !== id);
      localStorage.setItem("expenses", JSON.stringify(updatedExpenses));
      return updatedExpenses;
    });
  };

  const updateExpense = (id: number, updatedExpense: Partial<Expense>) => {
    setExpenses((prev) => {
      const updatedExpenses = prev.map((expense) =>
        expense.id === id ? { ...expense, ...updatedExpense } : expense
      );
      localStorage.setItem("expenses", JSON.stringify(updatedExpenses));
      return updatedExpenses;
    });
  };

  

  return (
    <ExpenseContext.Provider value={{ expenses, addExpense, removeExpense, updateExpense, searchQuery,setSearchQuery }}>
      {children}
    </ExpenseContext.Provider>
  );
};

export const useExpenses = () => {
  const context = useContext(ExpenseContext);
  if (!context) {
    throw new Error("useExpenses must be used within an ExpenseProvider");
  }
  return context;
};
