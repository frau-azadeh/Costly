"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useExpenses } from "@/context/ExpenseContext";

type FormData = {
  id?: number;
  title: string;
  amount: number;
  date: string;
};

type ExpenseFormProps = {
  editingExpense: FormData | null;
  setEditingExpense: React.Dispatch<React.SetStateAction<FormData | null>>;
};

export const ExpenseForm: React.FC<ExpenseFormProps> = ({ editingExpense, setEditingExpense }) => {
  const { register, handleSubmit, reset, setValue } = useForm<FormData>();
  const { addExpense, updateExpense } = useExpenses();

  useEffect(() => {
    if (editingExpense) {
      setValue("title", editingExpense.title);
      setValue("amount", editingExpense.amount);
      setValue("date", editingExpense.date);
    }
  }, [editingExpense, setValue]);

  const onSubmit = (data: FormData) => {
    if (editingExpense) {
      updateExpense(editingExpense.id!, data); 
    } else {
      addExpense(data); 
    }
    reset();
    setEditingExpense(null);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 max-w-md mx-auto">
      <input
        {...register("title", { required: true })}
        placeholder="Title"
        className="p-2 border rounded"
      />
      <input
        {...register("amount", { required: true, valueAsNumber: true })}
        placeholder="Amount"
        type="number"
        className="p-2 border rounded"
      />
      <input
        {...register("date", { required: true })}
        placeholder="Date"
        type="date"
        className="p-2 border rounded"
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        {editingExpense ? "Update Expense" : "Add Expense"}
      </button>
    </form>
  );
};
