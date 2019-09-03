import { combineReducers } from 'redux';
import {
  ADD_NEW_ITEM, REMOVE_ITEM, MARK_ITEM_COMPLETED,
} from '../actions';

/**
 * Defined Item
 * {
 *  id: number
 *  value: string
 *  isCompleted: boolean
 *  isRemoved: boolean,
 * }
 */

function todoReducer(state = { data: [] }, action) {
  switch (action.type) {
    case ADD_NEW_ITEM:
      return {
        ...state,
        data: [...state.data, action.payload],
      };
    case REMOVE_ITEM:
      state.data.forEach(item => {
        if (item.id === action.payload.id) {
          item.isRemoved = true;
        }
      });
      return {
        ...state,
        data: [...state.data],
      };
    case MARK_ITEM_COMPLETED:
        state.data.forEach(item => {
          if (item.id === action.payload.id) {
            item.isCompleted = true;
          }
        });
      const completeItem = state.data.find(item => item.id === action.payload.id);
      return {
        ...state,
        data: [...state.data],
      };
    default:
      return state
  }
}

const rootReducer = combineReducers({
  todoReducer,
})

export default rootReducer
