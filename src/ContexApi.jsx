import { createContext, useState, useEffect } from "react";
import main from "./config/gemini.js";

export const context = createContext();

function ContextProvider(props) {
  const [inputValue, setInputValue] = useState("");
  const [recentPrompts, setRecentPrompts] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState("");

  const [previousPrompts, setPreviousPrompts] = useState(() => 
   JSON.parse(localStorage.getItem("prevPrompt")) ||[]
  );
 

  
  
  

  const onSend = async (prompt) => {
    setIsLoading(true);
    setResult("");

    if (prompt !== undefined) {
      setRecentPrompts(prompt);
      setInputValue("");
      setResult(await main(prompt));
            
    } else {
      setRecentPrompts(inputValue);
      setPreviousPrompts((prevPrompts) => [...prevPrompts, inputValue]);
      setInputValue("");
      setResult(await main(inputValue));

    }
    setIsLoading(false);
  };

  useEffect(() => { 
    localStorage.setItem("prevPrompt" ,JSON.stringify(previousPrompts ));
  },[previousPrompts])


  

  
  const [isDark, setIsDark] = useState(
    () => localStorage.getItem("dark") || "light",
  );

  function toggleDarkMode() {
    setIsDark(isDark === "light" ? "dark" : "light");
  }

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", isDark);
    localStorage.setItem("dark", isDark);
  }, [isDark]);

  const contextValue = {
    isDark,
    setIsDark,
    toggleDarkMode,
    onSend,
    recentPrompts,
    setRecentPrompts,
    isLoading,
    setIsLoading,
    previousPrompts,
    setPreviousPrompts,
    result,
    setResult,
    inputValue,
    setInputValue,
  };

  return (
    <context.Provider value={contextValue}>{props.children}</context.Provider>
  );
}

export default ContextProvider;
