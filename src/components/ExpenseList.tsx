"use client";

import React from "react";
import { useExpenses } from "@/context/ExpenseContext";

type FormData = {
  id?: number;
  title: string;
  amount: number;
  date: string;
};

type ExpenseListProps = {
  setEditingExpense: React.Dispatch<React.SetStateAction<FormData | null>>;
};

export const ExpenseList: React.FC<ExpenseListProps> = ({ setEditingExpense }) => {
  const { expenses, removeExpense, searchQuery } = useExpenses();

  const filterdExpenses = expenses.filter((expense)=>
  expense.title.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <ul className="flex flex-col gap-4">
      {filterdExpenses.map((expense) => (
        <li key={expense.id} className="flex justify-between items-center border-b pb-2">
          <div>
            <p>{expense.title}</p>
            <p>${expense.amount}</p>
            <p>{expense.date}</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setEditingExpense(expense)}
              className="bg-yellow-500 text-white p-2 rounded"
            >
              Edit
            </button>
            <button
              onClick={() => removeExpense(expense.id)}
              className="bg-red-500 text-white p-2 rounded"
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};
