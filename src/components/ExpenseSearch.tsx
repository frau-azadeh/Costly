"use client"

import { useExpenses } from '@/context/ExpenseContext'
import React from 'react'

export const ExpenseSearch:React.FC = () => {
   const {searchQuery, setSearchQuery} = useExpenses(); 
   const handelSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
   }
  return (
    <div className='my-4'>
        <input
            type="text"
            placeholder='search expenses...'
            value={searchQuery}
            onChange={handelSearchChange}
            className='p-2 border rounded w-full'
        />
    </div>
  )
}
