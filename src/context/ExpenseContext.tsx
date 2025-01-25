"use client";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

type Expense = {
    id: number;
    title: string;
    amount: number;
    date: string;
}

type ExpenseContextType = {
    expenses: Expense[];
    addExpense: (expense: Omit<Expense, "id">)=> void;
    removeExpense: (id: number) => void;
    updateExpense: (id: number, updateExpense: Partial<Expense>) => void;
}

const ExpenseContext = createContext<ExpenseContextType | undefined > (undefined);

export const ExpenseProvider: React.FC<{ children: ReactNode }> = ({ children }) =>{
    const[expenses, setExponses] = useState <Expense[]>([]);

    useEffect(()=>{
     if(typeof window !== "undefined"){
        const storedExpenses = localStorage.getItem("expenses");
        if(storedExpenses) {
            try{
                setExponses(JSON.parse(storedExpenses));
            }catch(error){
                console.error("Error parsing localstorage date", error)
                setExponses([]);
            }
        }
     }
    },[]);

useEffect(()=>{
    if(typeof window !== "undefined" && expenses.length > 0){
        localStorage.setItem("expenses", JSON.stringify(expenses));
    }
},[expenses]);

const addExpense = (exponse: Omit<Expense, "id">) =>{
    const newExponse = { ...exponse, id: Date.now() };
    setExponses((prev) => [...prev, newExponse]);
};

const removeExpense = (id: number)=>{
    setExponses((prev) => {
        const updatedExpenses = prev.filter((expense)=> expense.id !== id);
        localStorage.setItem("expenses" , JSON.stringify(updatedExpenses));
        return updatedExpenses
        })
};
const updateExpense = (id: number, updateExpense: Partial<Expense>) =>{
    setExponses((prev)=>{
        const updatedExpenses = prev.map((expense)=>
        expense.id === id? {...expense, ...updateExpense} : expense
        );
        localStorage.setItem("expenses", JSON.stringify(updatedExpenses));
        return updatedExpenses;
    })
}

return(
    <ExpenseContext.Provider value={{expenses, addExpense, removeExpense, updateExpense(id, updateExpense) {
    },}}>
        {children}
    </ExpenseContext.Provider>
);
};
export const useExpenses = () =>{
    const context= useContext(ExpenseContext);
    if (!context){
        throw new Error("useExpenses must be used whithin in ExpenseProvider");
    }
    return context;
}

