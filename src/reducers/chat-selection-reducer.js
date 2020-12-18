export const chatSelectionReducer = (state = null, action) => {
  const {recipient} = action;
  switch (action.type) {
  case 'SELECT_CHAT':
    console.log(recipient)
    return recipient;
  case "UNSELECT_CHAT":
    return null;
  default:
    return state;
  }
};