"use client";

import React from "react";
import { useExpenses } from "@/context/ExpenseContext";

type FormData = {
  id?: number;
  title: string;
  amount: number;
  date: string;
  category: string;
};

type ExpenseListProps = {
  setEditingExpense: React.Dispatch<React.SetStateAction<FormData | null>>;
};

export const ExpenseList: React.FC<ExpenseListProps> = ({
  setEditingExpense,
}) => {
  const {
    expenses,
    removeExpense,
    searchQuery,
    filterCategory,
    setFilterCategory,
  } = useExpenses();

  const filterdExpenses = expenses
    .filter((expense) =>
      expense.title.toLowerCase().includes(searchQuery.toLowerCase()),
    )
    .filter((expense) =>
      filterCategory ? expense.category === filterCategory : true,
    );
  return (
    <div className="max-w-md max-auto mt-4">
      <select
        value={filterCategory}
        onChange={(e) => setFilterCategory(e.target.value)}
        className="p-2 border rounded w-full mb-4"
      >
        <option value="">All Categories</option>
        <option value="Food">Food</option>
        <option value="Transportation">Transportation</option>
        <option value="Entertainment">Entertainment</option>
        <option value="Other">Other</option>
      </select>
      <ul className="flex flex-col gap-4">
        {filterdExpenses.map((expense) => (
          <li
            key={expense.id}
            className="flex justify-between items-center border-b pb-2"
          >
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
    </div>
  );
};
