import { useExpenses } from '@/context/ExpenseContext'
import React from 'react'

export const ExpenseList:React.FC = () => {
  const{expenses, removeExpense}= useExpenses();

  return (
    <div className='max-w-md mx-auto mt-6'>
      <h2 className='text-2xl font-bold mb-4'>Expenses</h2>
      {expenses.length === 0 ?(
        <p> No item added yet.</p>
      ) : (
        <ul>
          {expenses.map((expense)=>(
            <li className="p-4 border rounded" key={expense.id}>
              <h3 className='text-lg font-bold'>{expense.title}</h3>
              <p>Amount: ${expense.amount}</p>
              <p>Date: {expense.date}</p>
              <button 
                onClick={()=> removeExpense(expense.id)}
                className='text-white bg-red-500 p-2 rounded-lg'
              >
                remove
              </button>
            </li>
          ))}
        </ul>
      )

      }

    </div>
  )
}
