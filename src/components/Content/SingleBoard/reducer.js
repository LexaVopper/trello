const initialState = {
  page: {
    task: {},
    columns: {},
    tags: {},
  },
  columnOrder: {},
  id: '',
  error: false,
  isLoading: false,
};

const getBoard = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_BOARD':
      return {
        ...state,
        id: action.payload.id,
        page: { ...action.payload.page },
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
    case 'CHANGE_TASKS_POSITION_BETWEEN':
      return {
        ...state,
        page: {
          ...state.page,
          columns: {
            ...state.page.columns,

            [action.payload.fColumnId]: {
              ...state.page.columns[action.payload.fColumnId],
              tasksId:
                action.payload.fromColumn[action.payload.fColumnId]?.tasksId,
            },
            [action.payload.sColumnId]: {
              ...state.page.columns[action.payload.sColumnId],
              ...action.payload.toColumn[action.payload.sColumnId],
            },
          },
          task: {
            ...state.page.task,
            ...action.payload.allTasksList,
          },
        },
      };
    case 'ADD_NEW_COLUMN':
      return {
        ...state,
        page: {
          ...state.page,
          columns: {
            ...state.page.columns,
            ...action.payload.newColumn,
          },
        },
        columnOrder: {
          ...state.columnOrder,
          ...action.payload.newColumnOrder,
        },
      };
    case 'ADD_NEW_TASK':
      return {
        ...state,
        page: {
          ...state.page,
          columns: {
            ...state.page.columns,
            [action.payload.colomnId]: {
              ...state.page.columns[action.payload.colomnId],
              tasksId: {
                ...state.page.columns[action.payload.colomnId].tasksId,
                ...action.payload.newColumnTask,
              },
            },
          },
          task: {
            ...state.page.task,
            ...action.payload.newTask,
          },
        },
      };
    case 'CHANGE_TASK':
      return {
        ...state,
        page: {
          ...state.page,
          task: {
            ...state.page.task,
            [action.payload.taskId]: {
              ...state.page.task[action.payload.taskId],
              title: action.payload.newTitle,
            },
          },
        },
      };
    case 'CREATE_TAG':
      return {
        ...state,
        page: {
          ...state.page,
          tags: {
            ...state.page.tags,
            [action.payload.tagId]: {
              id: action.payload.tagId,
              title: action.payload.titleTag,
              color: action.payload.colorTag,
            },
          },
        },
      };
    case 'ADD_DESCRIPTION':
      return {
        ...state,
        page: {
          ...state.page,
          task: {
            ...state.page.task,
            [action.payload.taskId]: {
              ...state.page.task[action.payload.taskId],
              description: action.payload.newDescription,
            },
          },
        },
      };
    case 'ADD_CHECK':
      return {
        ...state,
        page: {
          ...state.page,
          task: {
            ...state.page.task,
            [action.payload.taskId]: {
              ...state.page.task[action.payload.taskId],
              checks: {
                ...state.page.task[action.payload.taskId].checks,
                [action.payload.checkId]: {
                  id: action.payload.checkId,
                  title: action.payload.checkTitle,
                },
              },
            },
          },
        },
      };
    case 'TIE_TAG_WITH_TASK':
      return {
        ...state,
        page: {
          ...state.page,
          task: {
            ...state.page.task,
            [action.payload.taskId]: {
              ...state.page.task[action.payload.taskId],
              tags: {
                ...state.page.task[action.payload.taskId]?.tags,
                [action.payload.tagId]: { id: action.payload.tagId },
              },
            },
          },
        },
      };
    case 'CLEAR_BOARD_COLUMNS':
      return {
        ...state,
        page: { task: {}, columns: {}, tags: {} },
        columnOrder: {},
        id: '',
        error: false,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default getBoard;
