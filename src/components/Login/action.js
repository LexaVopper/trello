import firebase from '../FirebaseApi/fireApi';

export const getUser = (id) => (dispatch) => {
  firebase.db.ref(`db/users/user/${id}/`).on('value', function (data) {
    dispatch(getUserInfo(data.val()));
  });
};

export const getUserInfo = (user) => ({
  type: 'GET_USER',
  payload: user,
});

const startLoading = () => ({
  type: 'SET_LOADING',
});
