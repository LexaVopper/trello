const initialState = {
  mail: false,
  id: '',
  error: false,
};

const checkEmail = (state = initialState, action) => {
  switch (action.type) {
    case 'CHECK_EMAIL':
      return {
        ...state,
        mail: true,
        id: action.payload,
        error: false,
      };
    case 'NOT_FOUND_EMAIL':
      return {
        ...state,
        mail: false,
        id: action.payload,
        error: true,
      };
    default:
      return state;
  }
};

export default checkEmail;
