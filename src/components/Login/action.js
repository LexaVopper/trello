import firebase from '../FirebaseApi/fireApi';

export const getUserInfo = (user) => ({
  type: 'GET_USER',
  payload: user,
});

export const getUser = (id) => (dispatch) => {
  firebase.db.ref(`db/users/user/${id}/`).on('value', (data) => {
    dispatch(getUserInfo(data.val()));
  });
};
