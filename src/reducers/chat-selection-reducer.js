export const chatSelectionReducer = (state = false, action) => {
  switch (action.type) {
  case 'SELECT_CHAT':
    return !state;
  default:
    return state;
  }
};