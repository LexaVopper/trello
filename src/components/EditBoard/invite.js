import firebase from '../FirebaseApi/fireApi';

export const getUserIdByEmail = (correntEmail, boardId) => (dispatch) => {
  firebase.db.ref(`db/emails`).on('value', function (data) {
    let Found = false;
    for (let value in data.val()) {
      if (data.val()[value] === correntEmail.user) {
        Found = true;
        firebase.sendInvite(value, boardId);
        dispatch(checkEmail(value));
      }
    }
    if (Found === false) {
      dispatch(busyEmail());
    }
  });
};

export const checkEmail = (userId) => ({
  type: 'CHECK_EMAIL',
  payload: userId,
});

export const busyEmail = () => ({
  type: 'NOT_FOUND_EMAIL',
});
