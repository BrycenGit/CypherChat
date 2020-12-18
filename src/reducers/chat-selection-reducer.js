export const chatSelectionReducer = (state = null, action) => {
  switch (action.type) {
  case 'SELECT_CHAT':
    return action.recipient;
  case "UNSELECT_CHAT":
    return null;
  default:
    return state;
  }
};