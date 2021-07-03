const initialState = {
  page: [],
  id: null,
  error: false,
  isLoading: false,
};

const getBoard = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_BOARD':
      return {
        ...state,
        id: action.payload.id,
        page: action.payload.page,
        error: false,
        isLoading: false,
      };
    case 'SET_ERROR':
      return {
        ...state,
        isLoading: false,
        error: true,
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

export default getBoard;
