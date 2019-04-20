import React from 'react';
import { Menu } from '../Menu';

export const Header: React.FunctionComponent = () => (
  <header role="banner" aria-label="React SSR Weather">
    <Menu />
  </header>
);
