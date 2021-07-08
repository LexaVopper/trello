const initialState = {
  page: { task: {} },
  columns: {},
  columnOrder: {},
  id: '',
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
        page: {
          ...action.payload.page,
          columns: {
            ...action.payload.page.columns,
            ...action.payload.colomnTasks,
          },
        },
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
        columnOrder: {
          ...action.payload,
        },
      };
    case 'CHANGE_TASKS_POSITION':
      return {
        ...state,
        page: {
          ...state.page,
          columns: {
            ...state.page.columns,
            [action.payload.colomnId]: {
              ...state.page.columns[action.payload.colomnId],
              tasksId: {
                ...state.page.columns.tasksId,
                ...action.payload.tasksList,
              },
            },
          },
          task: {
            ...state.page.task,
            ...action.payload.reduxTasksList,
          },
        },
      };
    case 'CLEAR_BOARD_COLUMNS':
      return {
        ...state,
        page: { task: {} },
        columns: {},
        columnOrder: {},
        id: '',
        error: false,
        isLoading: false,
        rerender: false,
      };
    default:
      return state;
  }
};

export default getBoard;
