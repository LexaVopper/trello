const initialState = {
  columns: {},
  tasks: [],
  columnOrder: {},
  error: false,
  isLoading: false,
  rerender: false,
};

const getBoardBody = (state = initialState, action) => {
  switch (action.type) {
    case 'CLEAR_BOARD_COLUMNS':
      return {
        ...state,
        columns: {},
        columnOrder: {},
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
    case 'CHANGE_COLOMNS_POSITION':
      return {
        ...state,
        columns: {
          [action.payload.firstColomn]: {
            ...state.columns[action.payload.firstColomn],
            position: action.payload.fPos,
          },
          [action.payload.secondColomn]: {
            ...state.columns[action.payload.secondColomn],
            position: action.payload.sPos,
          },
        },
        columnOrder: {
          [action.payload.firstColomn]: {
            ...state.columns[action.payload.firstColomn],
            position: action.payload.fPos,
          },
          [action.payload.secondColomn]: {
            ...state.columns[action.payload.secondColomn],
            position: action.payload.sPos,
          },
        },
      };
    case 'GET_RERENDER':
      return {
        ...state,
        rerender: action.payload,
      };
    default:
      return state;
  }
};

export default getBoardBody;
