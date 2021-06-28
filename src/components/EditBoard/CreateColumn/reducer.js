const initialState = {
  columns: {},
  tasks: [],
  columnOrder: [],
  error: false,
  isLoading: false,
};

const getBoardBody = (state = initialState, action) => {
  switch (action.type) {
    case 'CLEAR_BOARD_COLUMNS':
      return {
        ...state,
        columns: {},
      };
    case 'GET_BOARD_COLUMNS':
      return {
        ...state,
        columns: action.payload.columns,
        columnOrder: action.payload.columnOrders,
        isLoading: false,
      };
    case 'SET_BOARD_LOADING':
      return {
        ...state,
        isLoading: true,
      };
    default:
      return state;
  }
};

export default getBoardBody;
