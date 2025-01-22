"use client"
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

type ThemeContextType = {
    theme: "light" | "dark";
    toggleTheme: ()=> void;
}

const ThemeContext= createContext<ThemeContextType | undefined>(undefined);


export const ThemeProvider :React.FC<{children: ReactNode}> = ({children})=>{
    const [theme, setTheme] = useState <"light" | "dark">("light");

    useEffect(()=>{
        const storedTheme = localStorage.getItem("theme") as "light" | "dark";
        if(storedTheme){
            setTheme(storedTheme);
        }
    },[]);

    const toggleTheme = () =>{
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme (newTheme);
        localStorage.setItem("theme", newTheme);
    };

    useEffect(()=>{
        document.documentElement.className = theme;
    },[theme]);
    return(
        <ThemeContext.Provider value={{theme, toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = ()=>{
    const context = useContext(ThemeContext);
    if(!context){
        throw new Error("useTheme must be used whithin a ThemeProvider");
    }
    return context;
};