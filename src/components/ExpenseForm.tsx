import { useExpenses } from '@/context/ExpenseContext';
import React from 'react'
import { useForm } from 'react-hook-form'

type FormData = {
  title: string;
  amount: number;
  date: string;
};

export const ExpenseForm: React.FC = () => {
  const {register, handleSubmit, reset} = useForm<FormData>();
  const {addExpense} = useExpenses();

  const onSubmit =  (data: FormData) =>{
    addExpense(data);
    reset();
  }

  return (
    <div>
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 max-w-md mx-auto">
    <input
        {...register("title", { required: true })}
        placeholder="Title"
        className="p-2 border rounded"
      />
      <input 
        {...register("amount", {required: true, valueAsNumber: true})}
        placeholder='Amount'
        type='number'
        className='p-2 border rounded'
      />
      <input
        {...register("date",{required: true})}
        placeholder='Date'
        type='date'
        className='p-2 border rounded'
      />
        <button type='submit' className='bg-blue-500 rounded-lg text-white p-2 '>
          Add Expense
        </button>
      </form>
    </div>
  )
}
