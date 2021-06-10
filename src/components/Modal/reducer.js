const initialState = {
  modalId: '',
};

const checkModalOpen = (state = initialState, action) => {
  switch (action.type) {
    case 'TOGGLE_MODAL_OPEN':
      return {
        ...state,
        modalId: action.payload,
      };

    default:
      return state;
  }
};

export default checkModalOpen;
