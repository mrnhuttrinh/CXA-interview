import React, { useState, useRef, useEffect } from 'react';
import block from 'bem-cn';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';

import * as actions from '../../actions';
import { selectedTodoList } from '../../reducers/selectors';

import './TodoList.scss';

const b = block('todo-list');

const TYPE_ALL = 'all';
const TYPE_ACTIVE = 'active';
const TYPE_COMPLETED = 'completed';

function TodoList(props) {
  const {
    todos,
    addNewItem,
    removeItem,
    markItemCompleleted,
  } = props;

  const inputRef = useRef(null);
  const [searchItems, setSearchItem] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [typeSelected, setTypeSelected] = useState(TYPE_ALL);

  useEffect(() => {
    if (isSearching) {
      const items= todos
      .filter(item => !item.isRemoved)
      .filter(item => {
        return item.value.includes(inputRef.current.value);
      });
      setSearchItem(items);
    }
  }, [isSearching]);

  const handleMarkComplete = (item) => (event) => {
    markItemCompleleted(item);
    event.preventDefault();
  }

  const handleRemoveItem = (item) => (event) => {
    removeItem(item);
    event.preventDefault();
  }

  const handleInputKeyPress = (event) => {
    if (event.charCode === 13) {
      if (isSearching) {
        const items= todos
        .filter(item => !item.isRemoved)
        .filter(item => {
          return item.value.includes(inputRef.current.value);
        });
        setSearchItem(items);
      } else if (event.target.value) {
        addNewItem({
          id: todos.length + 1,
          value: event.target.value,
          isCompleted: false,
          isRemoved: false,
        });
        setSearchItem([]);
        event.target.value = '';
      }
    }
  };

  const renderSearchItem = () => {
    return searchItems.map(item => (
        <div className={b('item')} key={`item__${item.id}`}>
          <div className={`check-circle ${item.isCompleted ? 'checked' : ''}`} onClick={handleMarkComplete(item)} />
          {item.value}
          <div className="close" onClick={handleRemoveItem(item)}/>
        </div>
      ));
  };

  const renderItem = () => {
    return todos
      .filter(item => !item.isRemoved)
      .filter(item => {
        if (typeSelected === TYPE_ACTIVE) {
          return !item.isCompleted;
        } else if (typeSelected === TYPE_COMPLETED) {
          return item.isCompleted;
        }
        return item;
      })
      .map(item => (
        <div className={b('item')} key={`item__${item.id}`}>
          <div className={`check-circle ${item.isCompleted ? 'checked' : ''}`} onClick={handleMarkComplete(item)} />
          {item.value}
          <div className="close" onClick={handleRemoveItem(item)}/>
        </div>
      ));
  };

  const getItemLeft = () => {
    return todos.filter(item => !item.isRemoved).length;
  };

  return (
    <div className={b()}>
      <div className={b('heading')}>
        <input
          ref={inputRef}
          className={b('input')}
          onKeyPress={handleInputKeyPress}
        />
        <div
          className={`${b('searching')} ${isSearching ? 'is-search' : ''}`}
          onClick={() => setIsSearching(!isSearching)}
        >Search</div>
      </div>

      <div className={b('items')}>
        {isSearching && renderSearchItem()}
        {!isSearching && renderItem()}
        {getItemLeft() === 0 ? (<div className={b('no-item')}>No Item</div>) : null}
        {getItemLeft() ? (<div className={b('summarize')}>
          <div className={b('left')}>{getItemLeft()} left</div>
          <div className={b('actions')}>
            <div
              className={`action--all ${typeSelected === TYPE_ALL ? 'selected' : ''}`}
              onClick={() => setTypeSelected(TYPE_ALL)}
            >All</div>
            <div
              className={`action--active ${typeSelected === TYPE_ACTIVE ? 'selected' : ''}`}
              onClick={() => setTypeSelected(TYPE_ACTIVE)}
            >Active</div>
            <div
              className={`action--completed ${typeSelected === TYPE_COMPLETED ? 'selected' : ''}`}
              onClick={() => setTypeSelected(TYPE_COMPLETED)}
            >Completed</div>
          </div>
        </div>) : null}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    todos: selectedTodoList(state),
  };
}

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
