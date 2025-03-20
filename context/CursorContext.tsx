"use client";
import React, { createContext, useContext, useState } from "react";

// Define the shape of the context state
interface CursorContextType {
  cursorSize: { width: number; height: number };
  setCursorSize: React.Dispatch<
    React.SetStateAction<{ width: number; height: number }>
  >;
  isOverContact: boolean;
  setIsOverContact: React.Dispatch<React.SetStateAction<boolean>>;
  cursorOffset: number;
  setCursorOffset: React.Dispatch<React.SetStateAction<number>>;
}

// Create the context with default values
const CursorContext = createContext<CursorContextType | undefined>(undefined);

// Custom hook to access the context
export const useCursorContext = () => {
  const context = useContext(CursorContext);
  if (!context) {
    throw new Error("useCursorContext must be used within a CursorProvider");
  }
  return context;
};

// Define the props for the CursorProvider
interface CursorProviderProps {
  children: React.ReactNode; // Define children prop
}

// CursorProvider to manage and share the cursor size state
export const CursorProvider: React.FC<CursorProviderProps> = ({ children }) => {
  const [cursorSize, setCursorSize] = useState({ width: 20, height: 20 });
  const [isOverContact, setIsOverContact] = useState(false);
  const [cursorOffset, setCursorOffset] = useState(0);

  return (
    <CursorContext.Provider
      value={{
        cursorSize,
        setCursorSize,
        isOverContact,
        setIsOverContact,
        cursorOffset,
        setCursorOffset,
      }}
    >
      {children}
    </CursorContext.Provider>
  );
};
