const initialState = {
  columns: [],
  tasks: [],
  columnOrder: [],
  error: false,
};

const getBoardBody = (state = initialState, action) => {
  switch (action.type) {
    case 'CLEAR_BOARD_COLUMNS':
      return {
        ...state,
        columns: [],
      };
    case 'GET_BOARD_COLUMNS':
      return {
        ...state,

        columns: [...state.columns, action.payload],
      };
    default:
      return state;
  }
};

export default getBoardBody;
