import React from 'react';
import block from 'bem-cn';

import './Header.scss';

const b = block('header');

function Header () {
  return (
    <header className={b()}>
      A Header
    </header>
  );
}

export default Header;