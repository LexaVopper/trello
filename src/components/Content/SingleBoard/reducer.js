const initialState = {
  page: [],
  isLoading: false,
  error: false,
};

const getBoard = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_BOARD':
      return {
        ...state,
        page: action.payload,
      };
    default:
      return state;
  }
};

export default getBoard;
