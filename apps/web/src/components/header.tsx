'use client';
import Button from '@zyxui/button';
import Flex from '@zyxui/flex';
import { useTheme } from '@zyxui/theme';
import React from 'react';

const Header = () => {
  const { changeTheme, selectedTheme, themesList } = useTheme();

  return (
    <header>
      <Flex gap={'md'}>
        <Button onPress={() => changeTheme('dark')}>Dark</Button>
        <Button onPress={() => changeTheme('light')}>Light</Button>
      </Flex>
    </header>
  );
};

export default Header;
