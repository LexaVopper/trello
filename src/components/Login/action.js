import firebase from 'firebase';

export const getUser = (id) => (dispatch) => {
  firebase
    .database()
    .ref(`db/users/user/${id}/`)
    .on('value', function (data) {
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
