import React from 'react';
import { block } from 'bem-cn';
import {Header, Footer, TodoList} from '../';

import './App.scss';

const b = block('app-container');

function App () {
  return (
    <div className={b()}>
      <Header />
      <div className={b('main')}>
        <TodoList />
      </div>
      <Footer />
    </div>
  );
}

export default App;