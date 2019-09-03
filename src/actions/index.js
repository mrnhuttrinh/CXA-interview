
export const ADD_NEW_ITEM = '@@__ADD_NEW_ITEM';
export const REMOVE_ITEM = '@@__REMOVE_ITEM';
export const MARK_ITEM_COMPLETED = '@@__MARK_ITEM_COMPLETED';
export const SEARCH_ITEM = '@@_SEARCH_ITEM';

export function addNewItem(data) {
  return {
    type: ADD_NEW_ITEM,
    payload: data,
  }
}

export function removeItem(data) {
  return {
    type: REMOVE_ITEM,
    payload: data,
  }
}

export function markItemCompleleted(data) {
  return {
    type: MARK_ITEM_COMPLETED,
    payload: data,
  }
}

export function searchItem(data) {
  return {
    type: SEARCH_ITEM,
    payload: data,
  }
}