'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useLayoutEffect,
} from 'react';

interface ThemeContextProps {
  theme: string;
  addTheme: (name: string, className: string) => void;
  removeTheme: (name: string) => void;
  changeTheme: (name: string) => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

const themes: Record<string, string> = {
  light: 'light',
  dark: 'dark',
};

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider = ({
  children,
}: ThemeProviderProps): React.ReactNode => {
  const [theme, setTheme] = useState<string>('dark');

  useLayoutEffect(() => {
    const root = document.documentElement;
    Object.keys(themes).forEach((key) => {
      root.classList.remove(themes[key]);
    });
    root.classList.add(themes[theme]);
  }, [theme]);

  const addTheme = (name: string, className: string) => {
    themes[name] = className;
  };

  const removeTheme = (name: string) => {
    delete themes[name];
  };

  const changeTheme = (name: string) => {
    if (themes[name]) {
      setTheme(name);
    } else {
      console.warn(`Theme ${name} does not exist`);
    }
  };

  return (
    <ThemeContext.Provider
      value={{ theme, addTheme, removeTheme, changeTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextProps => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
