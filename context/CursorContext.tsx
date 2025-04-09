"use client";
import React, { createContext, useContext, useState } from "react";

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

const CursorContext = createContext<CursorContextType | undefined>(undefined);

export const useCursorContext = () => {
  const context = useContext(CursorContext);
  if (!context) {
    throw new Error("useCursorContext must be used within a CursorProvider");
  }
  return context;
};

interface CursorProviderProps {
  children: React.ReactNode;
}

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
