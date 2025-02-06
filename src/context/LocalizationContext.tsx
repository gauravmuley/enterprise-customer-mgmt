import React, { createContext, useContext, useState, ReactNode } from "react";

interface LocalizationContextType {
  locale: string;
  setLocale: (locale: string) => void;
}

const LocalizationContext = createContext<LocalizationContextType | undefined>(
  undefined
);

interface LocalizationProviderProps {
  children: ReactNode;
}

export const LocalizationProvider: React.FC<LocalizationProviderProps> = ({
  children,
}) => {
  const [locale, setLocale] = useState("en");

  return (
    <LocalizationContext.Provider value={{ locale, setLocale }}>
      {children}
    </LocalizationContext.Provider>
  );
};

export const useLocalization = (): LocalizationContextType => {
  const context = useContext(LocalizationContext);
  if (!context) {
    throw new Error(
      "useLocalization must be used within a LocalizationProvider"
    );
  }
  return context;
};
