'use client';
import Button from '@zyxui/button/dist/button';
import { useTheme } from '@zyxui/theme';
import React from 'react';

const Header = () => {
  const { changeTheme, theme } = useTheme();

  return (
    <header>
      <Button onPress={() => changeTheme(theme === 'light' ? 'dark' : 'light')}>
        Change Theme
      </Button>
    </header>
  );
};

export default Header;
