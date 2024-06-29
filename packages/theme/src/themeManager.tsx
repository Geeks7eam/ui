'use client';

import React, {
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import {
  ThemeProvider as NextThemeProvider,
  useTheme as useNextTheme,
} from 'next-themes';

type Config = {
  glassEffect?: boolean;
};

type NextThemesProps = {
  attribute?: string;
  themes?: string[];
  defaultTheme?: string;
  enableSystem?: boolean;
  enableColorScheme?: boolean;
  storageKey?: string;
  value?: { [key: string]: string };
  forcedTheme?: string;
  nonce?: string;
  disableTransitionOnChange?: boolean;
};

type ThemeContextProps = {
  selectedTheme?: string;
  changeTheme: (theme: string) => void;
  config?: Config;
  themesList: string[];
};

const ThemeContext = React.createContext<ThemeContextProps | undefined>(
  undefined,
);

const __themes: Record<string, string> = {
  light: 'light',
  dark: 'dark',
};

type ThemeProviderProps = PropsWithChildren<{
  config?: Config;
  nextThemeConfig?: NextThemesProps;
}>;

export function ThemeProvider({
  children,
  config,
  nextThemeConfig,
}: ThemeProviderProps) {
  return (
    <NextThemeProvider
      {...nextThemeConfig}
      attribute={nextThemeConfig?.attribute || 'class'}
    >
      <ThemeProviderWrapper config={config}>{children}</ThemeProviderWrapper>
    </NextThemeProvider>
  );
}

const ThemeProviderWrapper = ({
  children,
  config: initialConfig = {},
}: ThemeProviderProps) => {
  const [config, setConfig] = useState<Config>(initialConfig);
  const [themes, setThemes] = useState<Record<string, string>>(__themes);

  const { theme, setTheme } = useNextTheme();

  useEffect(() => {
    setConfig(initialConfig);
  }, []);

  // change the theme
  const changeTheme = useCallback(
    (name: string) => {
      if (themes[name]) {
        setTheme(themes[name]);
      } else {
        throw new Error(`Theme ${name} does not exist`);
      }
    },
    [themes, setTheme],
  );

  const themesList = Object.keys(themes);

  return (
    <ThemeContext.Provider
      value={{ selectedTheme: theme, changeTheme, config, themesList }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
