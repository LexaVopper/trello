const initialState = {
  columns: [],
  tasks: [],
  columnOrder: [],
  error: false,
};

const getBoardBody = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_BOARD_BODY':
      return {
        ...state,
        id: action.payload,
        error: false,
      };
    case 'GET_BOARD_COLUMNS':
      return {
        ...state,

        columns: [...state.columns, action.payload],
        error: true,
      };
    default:
      return state;
  }
};

export default getBoardBody;
