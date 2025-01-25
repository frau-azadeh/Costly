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
}

const ExpenseContext = createContext<ExpenseContextType | undefined > (undefined);

export const ExpenseProvider: React.FC<{ children: ReactNode }> = ({ children }) =>{
    const[expenses, setExponses] = useState <Expense[]>(());

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

return(
    <ExpenseContext.Provider value={{expenses, addExpense}}>
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

