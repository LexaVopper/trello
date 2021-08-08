const initialState = {
  filterTagsBy: '',
};

export const filter = (state = initialState, action) => {
  switch (action.type) {
    case 'FILTER_TAGS':
      return {
        ...state,
        filterTagsBy: action.payload,
      };

    case 'CLEAR_FILTERS':
      return {
        ...state,
        filterTagsBy: '',
      };

    default:
      return state;
  }
};
