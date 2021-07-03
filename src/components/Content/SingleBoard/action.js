import firebase from 'firebase';

export const getBoardInfo = (page, id) => ({
  type: 'GET_BOARD',
  payload: {
    page,
    id,
  },
});
export const setError = () => ({
  type: 'SET_ERROR',
});
export const setLoading = () => ({
  type: 'SET_LOADING',
});

export const getBoard = (id) => async (dispatch) => {
  dispatch(setLoading());
  const data = await firebase.database().ref(`db/boards/${id}/`).once('value');

  if (data.val()) {
    dispatch(getBoardInfo(data.val(), id));
  } else {
    dispatch(setError());
  }
};
