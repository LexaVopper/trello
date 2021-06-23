const initialState = {
  page: [],
  id: null,
  isLoading: false,
  error: false,
};

const getBoard = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_BOARD':
      return {
        ...state,
        id: action.payload.id,
        page: action.payload.page,
      };
    default:
      return state;
  }
};

export default getBoard;
