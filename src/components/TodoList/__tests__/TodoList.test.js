import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store'

import TodoList from '../TodoList';

const buildStore = configureStore();

describe('TodoList', () => {
  let store;
  let wrapper;
  const initialState = { data: [] };
  beforeEach(() => {
    store = buildStore(initialState);
    wrapper = shallow(
      <Provider store={store}>
        <TodoList />
      </Provider>
    );
  });

  it('should render TodoList Component', () => {
    expect(wrapper.find(TodoList)).not.toBe(null);
  });

  // simulate click add
});