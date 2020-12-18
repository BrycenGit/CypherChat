
export default (state = false, action) => {
  switch (action.type) {
  case 'TOGGLE_BLANK':
    return !state;
  default:
    return state;
  }
};