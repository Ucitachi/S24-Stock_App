import React, { createContext, useContext,useState } from 'react';

// Step 1: Create a context
const TokenContext = createContext();

// Step 2: Create a provider component
export const TokenProvider = ({ children }) => {
  const [token,setToken]=useState<{ name: string } | null>(null);

  return (
    <TokenContext.Provider value={{token,setToken}}>
      {children}
    </TokenContext.Provider>
  );
};

export default function useTokenContext(){
    return useContext(TokenContext)
}