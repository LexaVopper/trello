const initialState = {
  page: {},
  columns: {},
  columnOrder: {},
  id: null,
  error: false,
  isLoading: false,
  rerender: false,
};

const getBoard = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_BOARD':
      return {
        ...state,
        id: action.payload.id,
        page: action.payload.page,
        columns: { ...action.payload.page.columns },
        columnOrder: action.payload.columnOrder,
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
    case 'GET_BOARD_COLUMNS':
      return {
        ...state,
        columns: action.payload.columns,
        columnOrder: action.payload.columnOrders,
        isLoading: false,
      };
    case 'GET_RERENDER':
      return {
        ...state,
        rerender: action.payload,
      };
    case 'CHANGE_COLOMNS_POSITION':
      return {
        ...state,
        columns: {
          ...state.columns,
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
          ...state.columnOrder,
          [action.payload.firstColomn]: {
            ...state.columnOrder[action.payload.firstColomn],
            position: action.payload.fPos,
          },
          [action.payload.secondColomn]: {
            ...state.columnOrder[action.payload.secondColomn],
            position: action.payload.sPos,
          },
        },
      };
    case 'CLEAR_BOARD_COLUMNS':
      return {
        ...state,
        columns: {
          taskIds: {},
        },
        columnOrder: {},
      };
    default:
      return state;
  }
};

export default getBoard;
