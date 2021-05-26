const initialState = {
  user: {},
  isLoading: false,
  error: false,
};

const getUser = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_USER':
      return {
        ...state,
        user: action.payload,
        isLoading: false,
      };
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: true,
      };
    default:
      return state;
  }
};

export default getUser;
